import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, ShieldCheck, CheckCircle2, AlertCircle, Sliders, Info, ArrowRight } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { formatBytes, validateImageFile, downloadBlob } from '../../../utils/fileHelpers';
import { compressImageClientSide, CompressionResult } from '../../../utils/imageCompression';

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string>('');
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [quality, setQuality] = useState<number>(75);
  const [exportAsWebp, setExportAsWebp] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'compressed' | 'original'>('compressed');

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, []);

  const handleSelectFile = (selectedFile: File) => {
    setError(null);
    const val = validateImageFile(selectedFile);
    if (!val.valid) {
      setError(val.error || 'Invalid image file.');
      return;
    }

    if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    setFile(selectedFile);
    const objUrl = URL.createObjectURL(selectedFile);
    setOriginalPreviewUrl(objUrl);
    setCompressedUrl('');
    setResult(null);

    // Run initial compression
    runCompression(selectedFile, quality, exportAsWebp);
  };

  const runCompression = async (targetFile: File, q: number, toWebp: boolean) => {
    setIsProcessing(true);
    setError(null);

    try {
      let desiredFormat: 'image/jpeg' | 'image/png' | 'image/webp' | undefined = undefined;
      if (toWebp) {
        desiredFormat = 'image/webp';
      }

      const res = await compressImageClientSide(targetFile, q, desiredFormat);
      setResult(res);

      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
      const newUrl = URL.createObjectURL(res.blob);
      setCompressedUrl(newUrl);
    } catch (err: any) {
      console.error('Compression error:', err);
      setError(err?.message || 'Failed to compress image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (file) {
      runCompression(file, newQuality, exportAsWebp);
    }
  };

  const handleWebpToggle = (checked: boolean) => {
    setExportAsWebp(checked);
    if (file) {
      runCompression(file, quality, checked);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl || !file) return;

    let extension = 'jpg';
    if (result) {
      extension = result.outputFormat === 'image/png' ? 'png' : result.outputFormat === 'image/webp' ? 'webp' : 'jpg';
    } else {
      extension = file.name.substring(file.name.lastIndexOf('.') + 1) || 'jpg';
    }

    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
    downloadBlob(compressedUrl, `${baseName}-compressed.${extension}`);
  };

  const handleReset = () => {
    if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setFile(null);
    setOriginalPreviewUrl('');
    setCompressedUrl('');
    setResult(null);
    setError(null);
    setQuality(75);
    setExportAsWebp(false);
  };

  const isPng = file ? file.type === 'image/png' || file.name.toLowerCase().endsWith('.png') : false;

  return (
    <div className="space-y-8">
      {/* Interactive Tool Card */}
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
              accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp"
              title="Select JPG, PNG, WebP or BMP image to compress"
              subtitle="Drag & drop your file here, or click to browse. Processing runs locally in browser memory without server uploads."
            />
          </div>
        ) : (
          <>
            {/* Top File Summary & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 truncate max-w-sm">
                  {file.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {result ? `${result.width} × ${result.height} px` : ''} · Original format: {file.type.replace('image/', '').toUpperCase() || 'IMAGE'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Choose Another Image
              </button>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Compression Result Banner */}
            {result && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
                <div className="text-center p-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Original File Size
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-slate-800">
                    {formatBytes(result.originalSize)}
                  </span>
                </div>

                <div className="text-center p-2 border-y sm:border-y-0 sm:border-x border-slate-200">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Compressed Output
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-blue-600">
                    {formatBytes(result.outputSize)}
                  </span>
                </div>

                <div className="text-center p-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Storage Saved
                  </span>
                  <span
                    className={`text-lg sm:text-xl font-bold font-mono ${
                      result.savingsPercent > 0 ? 'text-emerald-600' : 'text-slate-600'
                    }`}
                  >
                    {result.savingsPercent > 0 ? `-${result.savingsPercent}%` : '0%'}
                  </span>
                </div>
              </div>
            )}

            {/* Explanatory notice if already optimized */}
            {result?.isAlreadyOptimized && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm rounded-xl flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-950 mb-0.5">Image Already Highly Optimized</p>
                  <p>
                    Re-compressing this file with current settings would increase its byte size rather than decrease it. The original file has been preserved to avoid unnecessary quality degradation.
                  </p>
                </div>
              </div>
            )}

            {/* Controls: Quality Slider & Options */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="quality-slider" className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-slate-500" />
                  Compression Quality: <span className="text-blue-600">{quality}%</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  {quality >= 85 ? 'High Clarity' : quality >= 65 ? 'Recommended Balance' : 'Maximum Compression'}
                </span>
              </div>

              <input
                id="quality-slider"
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden"
              />

              {/* Quality presets */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  type="button"
                  onClick={() => handleQualityChange(50)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    quality === 50 ? 'bg-blue-100 text-blue-800 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  Max Compression (50%)
                </button>
                <button
                  type="button"
                  onClick={() => handleQualityChange(75)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    quality === 75 ? 'bg-blue-100 text-blue-800 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  Balanced (75%)
                </button>
                <button
                  type="button"
                  onClick={() => handleQualityChange(90)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    quality === 90 ? 'bg-blue-100 text-blue-800 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  High Clarity (90%)
                </button>
              </div>

              {/* PNG specific controls */}
              {isPng && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">PNG Color Quantization Active</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Preserves Alpha Transparency
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    PNG files are compressed using 8-bit adaptive palette quantization with DEFLATE encoding. Transparent layers and sharp graphic edges remain intact.
                  </p>
                  <label className="flex items-center gap-2 pt-1 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportAsWebp}
                      onChange={(e) => handleWebpToggle(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Convert PNG to modern WebP format for even smaller web files</span>
                  </label>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('compressed')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'compressed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Compressed Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('original')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'original' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Original View
                  </button>
                </div>

                {isProcessing && (
                  <span className="text-xs text-blue-600 font-medium animate-pulse flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Processing locally...
                  </span>
                )}
              </div>

              <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] min-h-[220px] max-h-[460px] flex items-center justify-center p-4">
                <img
                  src={activeTab === 'compressed' && compressedUrl ? compressedUrl : originalPreviewUrl}
                  alt="Compression Preview"
                  className="max-h-[420px] max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Action Buttons: Compress & Download */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isProcessing || !compressedUrl}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                Download Compressed Image
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
              <span>Processed locally in your browser memory. No images are uploaded to external servers.</span>
            </div>
          </>
        )}
      </div>

      {/* Semantic Informational Sections for SEO & User Education */}
      <section className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-700 text-sm leading-relaxed">
        {/* Section 1: Clear tool distinction */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Image Compression vs Target KB vs Pixel Resizing
          </h2>
          <p>
            Understanding the distinction between image optimization tools helps you choose the right workflow for your project:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-2xs space-y-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Image Compressor (This Tool)</span>
              <p className="text-xs text-slate-600">
                General lossy & lossless compression. Adjusts the quality slider (10%–100%) to optimize encoding bitrate while keeping original pixel width and height unchanged.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                <a href="/tools/photo-size-reducer" className="hover:text-blue-600 underline">Photo Size Reducer</a>
              </span>
              <p className="text-xs text-slate-600">
                Target upload-size workflow. Specifically designed to compress photos under hard kilobyte limits (such as 20KB, 50KB, 100KB, or 200KB) for government and school portals.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                <a href="/tools/image-resizer" className="hover:text-blue-600 underline">Image Resizer</a>
              </span>
              <p className="text-xs text-slate-600">
                Pixel dimension scaling. Changes the actual raster width and height in pixels or percentages (e.g. downscaling 4000×3000 to 1200×900 px).
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Supported Formats */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Supported Image Formats: JPG, PNG, WebP, and BMP
          </h2>
          <p>
            Different image formats use fundamentally different compression strategies:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-1">
            <li>
              <strong>JPEG / JPG:</strong> Uses lossy discrete cosine transform (DCT) quantization. Highly effective for photographs, gradients, and natural scenes. Setting quality to 75%–85% typically reduces file weight by 50%–75% with virtually imperceptible visual difference.
            </li>
            <li>
              <strong>PNG:</strong> Lossless raster format with support for alpha channel transparency. Our compressor applies 8-bit adaptive color quantization (up to 256 optimal palette colors) combined with DEFLATE encoding. This dramatically reduces PNG file size while keeping transparent backgrounds crisp.
            </li>
            <li>
              <strong>WebP:</strong> Modern web image standard offering superior predictive intra-frame compression. Check the <em>Convert to WebP</em> toggle to convert bulky JPEGs or PNGs to lightweight WebP assets for faster website delivery.
            </li>
            <li>
              <strong>BMP:</strong> Uncompressed bitmap raster format. Uncompressed BMP bitmaps are decoded directly in browser memory and efficiently compressed into optimized JPEG or modern WebP format, drastically slashing file weight.
            </li>
          </ul>
        </div>

        {/* Section 3: Balancing Quality and File Size */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Balancing Image Quality and File Size Savings
          </h2>
          <p>
            Compressing an image is always a trade-off between visual sharpness and network payload:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">90% Quality (High Clarity)</p>
              <p className="text-slate-600">Minimal compression artifacts. Best for portfolio photography, art prints, and high-DPI hero banners.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">75% Quality (Recommended Balance)</p>
              <p className="text-slate-600">The industry standard for blog posts, social media, and eCommerce product pages. Delivers substantial byte savings with clean edges.</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <p className="font-semibold text-slate-900">50% Quality (Maximum Compression)</p>
              <p className="text-slate-600">Deep file size reduction for thumbnails, preview grids, or low-bandwidth mobile connections.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Connected tools */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <h2 className="text-base font-bold text-slate-900">Connected Image Editing Tools</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="/tools/photo-size-reducer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Photo Size Reducer (KB Limits) <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/image-resizer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Image Resizer (Pixel Dimensions) <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="/tools/passport-photo-resizer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 font-medium transition-colors"
            >
              Passport Photo Resizer <ArrowRight className="w-3 h-3 text-slate-400" />
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
