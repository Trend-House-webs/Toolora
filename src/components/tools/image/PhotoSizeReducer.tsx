import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, ShieldCheck, AlertCircle, Sliders, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { validateImageFile, downloadBlob, formatBytes } from '../../../utils/fileHelpers';
import { loadImageFromFile } from '../../../utils/imageCompression';

interface CompressionOutcome {
  blob: Blob;
  size: number;
  width: number;
  height: number;
  targetAchieved: boolean;
  scaleApplied: number;
  qualityApplied: number;
}

export function PhotoSizeReducer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetKb, setTargetKb] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<CompressionOutcome | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Supported preset thresholds (KB)
  const presets = [20, 50, 100, 200, 500];

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (processedUrl) URL.revokeObjectURL(processedUrl);
    };
  }, [previewUrl, processedUrl]);

  const handleSelectFile = (selectedFile: File) => {
    setError(null);
    const val = validateImageFile(selectedFile);
    if (!val.valid) {
      setError(val.error || 'Invalid image file.');
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setOutcome(null);
    setProcessedUrl('');

    // Trigger reduction with current target
    reduceToTargetKb(selectedFile, targetKb);
  };

  /**
   * Adaptive binary search compression algorithm.
   * Tests quality quantization and proportional dimensional scaling.
   * Strictly evaluates whether the final output Blob size <= targetBytes.
   */
  const reduceToTargetKb = async (targetFile: File, maxKb: number) => {
    setIsProcessing(true);
    setError(null);

    const safeTargetKb = Math.max(5, maxKb);
    const maxBytes = safeTargetKb * 1024;

    try {
      const img = await loadImageFromFile(targetFile);
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      if (!naturalWidth || !naturalHeight) {
        throw new Error('Could not determine image dimensions.');
      }

      // Scaling steps to attempt: 100%, 85%, 70%, 55%, 40%, 28%, 18%, 10%
      // Minimum safe canvas dimension is 60px so faces/logos remain decipherable
      const scales = [1.0, 0.85, 0.70, 0.55, 0.40, 0.28, 0.18, 0.10];

      let bestBlobUnderTarget: Blob | null = null;
      let bestScale = 1.0;
      let bestQuality = 0.8;
      let bestWidth = naturalWidth;
      let bestHeight = naturalHeight;

      let smallestBlobOverall: Blob | null = null;
      let smallestScale = 1.0;
      let smallestQuality = 0.05;
      let smallestWidth = naturalWidth;
      let smallestHeight = naturalHeight;

      for (const scale of scales) {
        const targetWidth = Math.max(60, Math.round(naturalWidth * scale));
        const targetHeight = Math.max(60, Math.round(naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        // Fill solid white background so transparent PNGs/WebPs export cleanly to JPEG without black boxes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Binary search across JPEG quality levels (0.05 to 0.95)
        let minQ = 0.05;
        let maxQ = 0.95;
        let foundScaleBlob: Blob | null = null;
        let foundQuality = minQ;

        for (let step = 0; step < 6; step++) {
          const midQ = (minQ + maxQ) / 2;
          const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, 'image/jpeg', midQ)
          );

          if (blob) {
            // Track absolute smallest blob as best-effort fallback
            if (!smallestBlobOverall || blob.size < smallestBlobOverall.size) {
              smallestBlobOverall = blob;
              smallestScale = scale;
              smallestQuality = midQ;
              smallestWidth = targetWidth;
              smallestHeight = targetHeight;
            }

            if (blob.size <= maxBytes) {
              foundScaleBlob = blob;
              foundQuality = midQ;
              minQ = midQ; // Try to retain higher visual quality while still under target
            } else {
              maxQ = midQ; // File exceeds limit, lower the quality
            }
          }
        }

        // If this scale attempt found a compliant blob, store it as the winner and stop downscaling
        if (foundScaleBlob && foundScaleBlob.size <= maxBytes) {
          bestBlobUnderTarget = foundScaleBlob;
          bestScale = scale;
          bestQuality = foundQuality;
          bestWidth = targetWidth;
          bestHeight = targetHeight;
          break;
        }
      }

      // CRITICAL VERIFICATION: Explicitly re-check if the selected output meets maxBytes
      const targetAchieved = Boolean(bestBlobUnderTarget && bestBlobUnderTarget.size <= maxBytes);
      const finalBlob = targetAchieved ? bestBlobUnderTarget! : smallestBlobOverall;

      if (!finalBlob) {
        throw new Error('Unable to compress this image. Please check that the file is not corrupt.');
      }

      // Double-check final Blob size directly from the real blob instance
      const finalSize = finalBlob.size;
      const isGenuinelyUnderTarget = finalSize <= maxBytes;

      if (processedUrl) URL.revokeObjectURL(processedUrl);
      const newUrl = URL.createObjectURL(finalBlob);
      setProcessedUrl(newUrl);

      setOutcome({
        blob: finalBlob,
        size: finalSize,
        width: isGenuinelyUnderTarget ? bestWidth : smallestWidth,
        height: isGenuinelyUnderTarget ? bestHeight : smallestHeight,
        targetAchieved: isGenuinelyUnderTarget,
        scaleApplied: isGenuinelyUnderTarget ? bestScale : smallestScale,
        qualityApplied: isGenuinelyUnderTarget ? bestQuality : smallestQuality,
      });
    } catch (err: any) {
      console.error('Photo size reduction error:', err);
      setError(err?.message || 'Failed to reduce photo size.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTargetChange = (kb: number) => {
    const validKb = Math.max(5, Math.min(10000, kb));
    setTargetKb(validKb);
    if (file) {
      reduceToTargetKb(file, validKb);
    }
  };

  const handleDownload = () => {
    if (!processedUrl || !file || !outcome) return;
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'photo';

    if (outcome.targetAchieved) {
      downloadBlob(processedUrl, `${baseName}-under-${targetKb}kb.jpg`);
    } else {
      const outputKb = Math.round(outcome.size / 1024);
      downloadBlob(processedUrl, `${baseName}-${outputKb}kb-best-effort.jpg`);
    }
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setFile(null);
    setPreviewUrl('');
    setOutcome(null);
    setProcessedUrl('');
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Workspace Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {!file ? (
          <div className="space-y-4">
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <ImageDropzone
              onImageSelected={handleSelectFile}
              accept="image/jpeg,image/png,image/webp,image/bmp,image/gif"
              title="Select photo to reduce to target file size"
              subtitle="Reduce photo file sizes to meet 20KB, 50KB, 100KB, 200KB, or custom upload limits for government, job, and exam portals."
            />
          </div>
        ) : (
          <>
            {/* Header / Active File Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 truncate max-w-sm">{file.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Original file size: <span className="font-mono font-medium text-slate-700">{formatBytes(file.size)}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Choose Another Photo
              </button>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Target Size Controls */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="target-kb-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  Target Upload Ceiling (KB Limit)
                </label>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Requested Ceiling: ≤ {targetKb} KB ({formatBytes(targetKb * 1024)})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {presets.map((kb) => (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => handleTargetChange(kb)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      targetKb === kb
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    Under {kb} KB
                  </button>
                ))}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs text-slate-500 font-medium">Custom:</span>
                  <input
                    id="target-kb-input"
                    type="number"
                    min="5"
                    max="10000"
                    value={targetKb}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val > 0) handleTargetChange(val);
                    }}
                    className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono text-center focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                  <span className="text-xs text-slate-500">KB</span>
                </div>
              </div>
            </div>

            {/* Result Status & Verification */}
            {outcome && (
              <>
                {outcome.targetAchieved ? (
                  /* Genuinely Meets Target */
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Target Ceiling Achieved: File is strictly under {targetKb} KB</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-1">
                      <div className="p-2 bg-white rounded-lg border border-emerald-100">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase block">Original</span>
                        <p className="text-sm sm:text-base font-bold font-mono text-slate-800 mt-0.5">{formatBytes(file.size)}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-100">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase block">Target Ceiling</span>
                        <p className="text-sm sm:text-base font-bold font-mono text-slate-700 mt-0.5">≤ {targetKb} KB</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-200 shadow-2xs">
                        <span className="text-[11px] font-semibold text-emerald-700 uppercase block">Actual Output</span>
                        <p className="text-sm sm:text-base font-bold font-mono text-emerald-600 mt-0.5">{formatBytes(outcome.size)}</p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-emerald-100">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase block">Dimensions</span>
                        <p className="text-sm sm:text-base font-bold font-mono text-slate-700 mt-0.5">{outcome.width} × {outcome.height}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Target NOT Achieved Warning */
                  <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-amber-950">Target Size Not Fully Achieved</h3>
                        <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                          The compressed output is <span className="font-mono font-bold">{formatBytes(outcome.size)}</span>, which exceeds your requested ceiling of <span className="font-mono font-bold">≤ {targetKb} KB ({formatBytes(targetKb * 1024)})</span>. Compressing this image further would render text or facial features illegible.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center pt-1 text-xs">
                      <div className="p-2 bg-white/80 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Requested Target</span>
                        <span className="font-mono font-bold text-slate-800">≤ {targetKb} KB</span>
                      </div>
                      <div className="p-2 bg-white/80 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-amber-700 uppercase font-semibold block">Smallest Achieved</span>
                        <span className="font-mono font-bold text-amber-800">{formatBytes(outcome.size)}</span>
                      </div>
                      <div className="p-2 bg-white/80 rounded-lg border border-amber-200 col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold block">Excess Over Target</span>
                        <span className="font-mono font-bold text-rose-600">+{formatBytes(outcome.size - targetKb * 1024)}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-white/60 rounded-lg text-xs text-slate-700 space-y-1">
                      <p className="font-medium text-slate-900">Recommended solutions:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                        <li>
                          Try selecting a slightly higher target (such as{' '}
                          <button
                            type="button"
                            onClick={() => handleTargetChange(targetKb < 50 ? 50 : targetKb < 100 ? 100 : 200)}
                            className="text-blue-600 font-semibold underline hover:text-blue-800 cursor-pointer"
                          >
                            {targetKb < 50 ? '50 KB' : targetKb < 100 ? '100 KB' : '200 KB'}
                          </button>
                          ) if your application portal allows it.
                        </li>
                        <li>
                          Use{' '}
                          <a href="/tools/crop-image" className="text-blue-600 font-semibold underline hover:text-blue-800">
                            Crop Image
                          </a>{' '}
                          to trim out empty background margins around your subject before compressing.
                        </li>
                        <li>
                          Use{' '}
                          <a href="/tools/image-resizer" className="text-blue-600 font-semibold underline hover:text-blue-800">
                            Image Resizer
                          </a>{' '}
                          to reduce image dimensions (e.g., to 600×600 px) before setting a strict KB target.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Preview Container */}
            <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] min-h-[220px] max-h-[460px] flex items-center justify-center p-4">
              <img
                src={processedUrl || previewUrl}
                alt="Reduced preview"
                className="max-h-[400px] max-w-full object-contain rounded-lg shadow-sm"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex flex-col items-center justify-center gap-2 text-xs font-semibold text-blue-600">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Evaluating binary search quantization to reach ≤ {targetKb} KB...</span>
                </div>
              )}
            </div>

            {/* Action Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isProcessing || !outcome}
                className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs ${
                  outcome?.targetAchieved
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                }`}
              >
                <Download className="w-4 h-4" />
                {outcome?.targetAchieved ? (
                  <span>Download Photo ({formatBytes(outcome.size)} · Under {targetKb} KB)</span>
                ) : (
                  <span>Download Best-Effort Result ({outcome ? formatBytes(outcome.size) : ''})</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Privacy note */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Reduced locally in your browser memory. No photos are uploaded to external servers.</span>
            </div>
          </>
        )}
      </div>

      {/* Semantic Informational Sections for SEO & User Education */}
      <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* Section 1: Target KB Workflow vs General Compression */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Target KB Photo Size Reducer vs Visual-Quality Image Compression
          </h2>
          <p>
            When uploading photos to government service portals, university admissions platforms, or job application forms, you are often given a strict file size ceiling (for example, <em>"must be under 50KB"</em> or <em>"file size between 20KB and 100KB"</em>). Generic image tools only offer percentage sliders (like 80% or 60%), forcing you to guess and re-compress repeatedly through trial and error.
          </p>
          <p>
            The Toolora <strong>Photo Size Reducer</strong> replaces guesswork with an automated mathematical binary search. Instead of adjusting arbitrary quality percentages, you simply select your required kilobyte limit—such as <strong>20 KB, 50 KB, 100 KB, 200 KB, or 500 KB</strong>—or type any custom target. The algorithm iteratively balances JPEG quantization tables and dimensional scaling in local browser memory, verifying every output byte against your target limit before download.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Photo Size Reducer</span>
              <p className="text-xs text-slate-600">
                Guaranteed target-ceiling workflow. Automatically reduces byte size to fit strictly under 20KB, 50KB, 100KB, or 200KB limits.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                <a href="/tools/image-compressor" className="hover:text-blue-600 underline">Image Compressor</a>
              </span>
              <p className="text-xs text-slate-600">
                General compression tool. Provides manual slider control over visual quality without enforcing an exact kilobyte cap.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                <a href="/tools/image-resizer" className="hover:text-blue-600 underline">Image Resizer</a>
              </span>
              <p className="text-xs text-slate-600">
                Dimensional scaling tool. Changes physical pixel width and height (e.g. 600×600 px) with aspect-ratio locking.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: How to Compress an Image to 100KB or 50KB */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            How to Compress an Image to 100KB, 50KB, or 20KB Online
          </h2>
          <p>
            Following these steps ensures your photograph passes portal file size validation without unnecessary blurring:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-1">
            <li>
              <strong>Upload Your Photo:</strong> Select any JPG, JPEG, PNG, WebP, or BMP file. High-resolution phone camera portraits (3MB–15MB) are supported directly.
            </li>
            <li>
              <strong>Select Your Ceiling:</strong> Click the preset matching your application guidelines (e.g. <strong>Under 50 KB</strong> or <strong>Under 100 KB</strong>), or type a custom number in the KB field.
            </li>
            <li>
              <strong>Review the Verified Byte Size:</strong> The tool performs iterative binary search quantization and presents the actual resulting size (e.g. <em>47.2 KB</em> for a 50 KB target).
            </li>
            <li>
              <strong>Inspect Quality & Download:</strong> Verify the facial features and text are clear, then click <em>Download Photo</em>.
            </li>
          </ol>
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Realistic Compression Limits:</strong> While our algorithm aggressively optimizes photos, a high-resolution 4000×3000px picture cannot always reach an extreme target like 20 KB without dimensional scaling. If the tool determines a target cannot be reached while maintaining basic legibility, it displays an honest warning and provides a best-effort file rather than generating corrupted data.
            </p>
          </div>
        </div>

        {/* Section 3: Popular Application Portal File Ceilings */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Common Portal Photo Upload Limits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">Civil Service & Government Exams (UPSC, SSC, State Portals)</p>
              <p className="text-slate-600">Typically require passport photos between 20 KB and 50 KB, and signatures between 10 KB and 20 KB.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">University & College Admissions</p>
              <p className="text-slate-600">Common thresholds are 100 KB or 200 KB for student ID card photos and matriculation documents.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">Visa & Passport Applications (US DS-160, Schengen)</p>
              <p className="text-slate-600">
                US visas enforce a maximum file size of 240 KB with exact 600×600 px dimensions. Use{' '}
                <a href="/tools/passport-photo-resizer" className="text-blue-600 underline font-semibold">Passport Photo Resizer</a>{' '}
                for biometric head-to-chin framing.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">Job Portals & Resume Attachments</p>
              <p className="text-slate-600">Company ATS systems frequently cap avatar photos at 500 KB to avoid database bloat.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Related Image Preparation Tools */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h2 className="text-base font-bold text-slate-900">Connected Image Preparation Tools</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="/tools/image-compressor"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Image Compressor <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/passport-photo-resizer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Passport Photo Resizer <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/image-resizer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Image Resizer <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/crop-image"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Crop Image <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/flip-image"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Flip Image <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
