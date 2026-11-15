import React, { useState, useEffect, useRef } from 'react';
import {
  FlipHorizontal,
  FlipVertical,
  Download,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Plus,
  Archive,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { validateImageFile, downloadBlob, formatBytes } from '../../../utils/fileHelpers';
import { loadImageFromFile } from '../../../utils/imageCompression';

interface FlipItem {
  id: string;
  file: File;
  previewUrl: string;
  flipH: boolean;
  flipV: boolean;
  isProcessing: boolean;
  error: string | null;
}

export function FlipTool() {
  const [items, setItems] = useState<FlipItem[]>([]);
  const [globalFlipH, setGlobalFlipH] = useState<boolean>(false);
  const [globalFlipV, setGlobalFlipV] = useState<boolean>(false);
  const [isBatchProcessing, setIsBatchProcessing] = useState<boolean>(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number } | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [items]);

  const addFiles = (selectedFiles: File[]) => {
    setGeneralError(null);
    const newItems: FlipItem[] = [];

    for (const file of selectedFiles) {
      const val = validateImageFile(file);
      if (!val.valid) {
        setGeneralError(`Skipped "${file.name}": ${val.error}`);
        continue;
      }

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        flipH: globalFlipH,
        flipV: globalFlipV,
        isProcessing: false,
        error: null,
      });
    }

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
    }
  };

  const handleSingleSelect = (file: File) => {
    addFiles([file]);
  };

  const handleMultipleSelect = (files: File[]) => {
    addFiles(files);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    setItems([]);
    setGlobalFlipH(false);
    setGlobalFlipV(false);
    setGeneralError(null);
    setBatchProgress(null);
  };

  // Toggle Global Flip and sync to all items
  const toggleGlobalH = () => {
    const nextH = !globalFlipH;
    setGlobalFlipH(nextH);
    setItems((prev) => prev.map((item) => ({ ...item, flipH: nextH })));
  };

  const toggleGlobalV = () => {
    const nextV = !globalFlipV;
    setGlobalFlipV(nextV);
    setItems((prev) => prev.map((item) => ({ ...item, flipV: nextV })));
  };

  // Toggle Flip for individual item
  const toggleItemH = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, flipH: !item.flipH } : item))
    );
  };

  const toggleItemV = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, flipV: !item.flipV } : item))
    );
  };

  /**
   * Renders a flipped image on an HTML5 canvas and exports as Blob.
   */
  const renderFlippedBlob = async (item: FlipItem): Promise<{ blob: Blob; ext: string }> => {
    const img = await loadImageFromFile(item.file);
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not initialize canvas context.');

    ctx.save();
    ctx.scale(item.flipH ? -1 : 1, item.flipV ? -1 : 1);
    ctx.drawImage(
      img,
      item.flipH ? -img.naturalWidth : 0,
      item.flipV ? -img.naturalHeight : 0,
      img.naturalWidth,
      img.naturalHeight
    );
    ctx.restore();

    const isPng = item.file.type === 'image/png' || item.file.name.toLowerCase().endsWith('.png');
    const mime = isPng ? 'image/png' : 'image/jpeg';
    const ext = isPng ? 'png' : 'jpg';

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, mime, 0.92));
    if (!blob) throw new Error(`Failed to export image for ${item.file.name}`);

    return { blob, ext };
  };

  /**
   * Download a single flipped image.
   */
  const downloadSingleItem = async (item: FlipItem) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, isProcessing: true, error: null } : it))
    );

    try {
      const { blob, ext } = await renderFlippedBlob(item);
      const baseName = item.file.name.substring(0, item.file.name.lastIndexOf('.')) || 'image';
      const url = URL.createObjectURL(blob);
      downloadBlob(url, `${baseName}-flipped.${ext}`);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, isProcessing: false } : it))
      );
    } catch (err: any) {
      console.error(err);
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, isProcessing: false, error: err?.message || 'Processing failed' } : it
        )
      );
    }
  };

  /**
   * Process all images and package them into a single ZIP archive.
   * Prevents filename collisions and handles individual errors gracefully.
   */
  const downloadAllAsZip = async () => {
    if (items.length === 0) return;
    setIsBatchProcessing(true);
    setBatchProgress({ current: 0, total: items.length });
    setGeneralError(null);

    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    const usedNames = new Set<string>();
    let successCount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      setBatchProgress({ current: i + 1, total: items.length });

      try {
        const { blob, ext } = await renderFlippedBlob(item);
        const baseName = item.file.name.substring(0, item.file.name.lastIndexOf('.')) || 'image';

        // Collision-safe filename resolution
        let candidateName = `${baseName}-flipped.${ext}`;
        let counter = 2;
        while (usedNames.has(candidateName.toLowerCase())) {
          candidateName = `${baseName}-flipped-${counter}.${ext}`;
          counter++;
        }
        usedNames.add(candidateName.toLowerCase());

        zip.file(candidateName, blob);
        successCount++;
      } catch (err: any) {
        console.error(`Failed to process ${item.file.name}:`, err);
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, error: err?.message || 'Failed in batch processing' } : it
          )
        );
      }
    }

    if (successCount === 0) {
      setGeneralError('No images could be processed into the ZIP.');
      setIsBatchProcessing(false);
      setBatchProgress(null);
      return;
    }

    try {
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      downloadBlob(zipUrl, `toolora-flipped-images-${items.length}-files.zip`);
      setTimeout(() => URL.revokeObjectURL(zipUrl), 15000);
    } catch (zipErr: any) {
      console.error('ZIP generation error:', zipErr);
      setGeneralError('Failed to generate ZIP archive.');
    } finally {
      setIsBatchProcessing(false);
      setBatchProgress(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Workspace Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        {items.length === 0 ? (
          <div className="space-y-4">
            {generalError && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}
            <ImageDropzone
              multiple={true}
              onImageSelected={handleSingleSelect}
              onMultipleImagesSelected={handleMultipleSelect}
              accept="image/jpeg,image/png,image/webp,image/bmp"
              title="Select one or multiple images to flip or mirror"
              subtitle="Mirror single photos or bulk flip multiple images horizontally or vertically in your browser."
            />
          </div>
        ) : (
          <>
            {/* Batch Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <span>Selected Images:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                    {items.length} {items.length === 1 ? 'file' : 'files'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Apply horizontal or vertical mirroring to individual images or to all files simultaneously.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  ref={addInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/bmp"
                  onChange={(e) => {
                    if (e.target.files) addFiles(Array.from(e.target.files));
                    e.target.value = '';
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => addInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add More Images
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>
            </div>

            {generalError && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Global Transform Buttons */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Batch Transformations (Apply to All {items.length} Images)
                </span>
                <span className="text-xs text-slate-500">
                  {globalFlipH && globalFlipV ? 'Horizontal + Vertical' : globalFlipH ? 'Horizontal Only' : globalFlipV ? 'Vertical Only' : 'Original Orientation'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleGlobalH}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    globalFlipH
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FlipHorizontal className="w-4 h-4" />
                  Flip All Horizontally (Mirror Selfie)
                </button>

                <button
                  type="button"
                  onClick={toggleGlobalV}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    globalFlipV
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <FlipVertical className="w-4 h-4" />
                  Flip All Vertically (Upside Down)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGlobalFlipH(false);
                    setGlobalFlipV(false);
                    setItems((prev) => prev.map((item) => ({ ...item, flipH: false, flipV: false })));
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer ml-auto"
                >
                  Reset All to Original
                </button>
              </div>
            </div>

            {/* Batch Progress Banner */}
            {isBatchProcessing && batchProgress && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                    Rendering and compressing flipped images...
                  </span>
                  <span>
                    {batchProgress.current} / {batchProgress.total} ({Math.round((batchProgress.current / batchProgress.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-blue-200/70 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Single Image Focused Workflow View (if exactly 1 item) */}
            {items.length === 1 && (
              <div className="space-y-4">
                <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] min-h-[260px] max-h-[460px] flex items-center justify-center p-6">
                  <img
                    src={items[0].previewUrl}
                    alt="Flipped preview"
                    style={{
                      transform: `scaleX(${items[0].flipH ? -1 : 1}) scaleY(${items[0].flipV ? -1 : 1})`,
                      transition: 'transform 0.2s ease-in-out',
                    }}
                    className="max-h-[400px] max-w-full object-contain rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => downloadSingleItem(items[0])}
                    disabled={items[0].isProcessing}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    {items[0].isProcessing ? 'Processing locally...' : 'Download Flipped Image'}
                  </button>
                </div>
              </div>
            )}

            {/* Multiple Images Grid View (if > 1 item) */}
            {items.length > 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-slate-50/60 rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 relative group"
                    >
                      {/* Top bar with file name & delete button */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate" title={item.file.name}>
                            {index + 1}. {item.file.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{formatBytes(item.file.size)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.file.name}`}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Preview Thumbnail with Transform applied */}
                      <div className="relative rounded-lg border border-slate-200 overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px] h-40 flex items-center justify-center p-2">
                        <img
                          src={item.previewUrl}
                          alt={item.file.name}
                          style={{
                            transform: `scaleX(${item.flipH ? -1 : 1}) scaleY(${item.flipV ? -1 : 1})`,
                            transition: 'transform 0.2s ease-in-out',
                          }}
                          className="max-h-full max-w-full object-contain rounded shadow-2xs"
                        />
                        {item.error && (
                          <div className="absolute inset-0 bg-rose-50/90 p-2 flex flex-col items-center justify-center text-center text-rose-700 text-xs">
                            <AlertCircle className="w-5 h-5 mb-1" />
                            <span>{item.error}</span>
                          </div>
                        )}
                      </div>

                      {/* Per-Item Flip Controls */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleItemH(item.id)}
                          className={`flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            item.flipH
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <FlipHorizontal className="w-3.5 h-3.5" />
                          <span>H</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleItemV(item.id)}
                          className={`flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            item.flipV
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <FlipVertical className="w-3.5 h-3.5" />
                          <span>V</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadSingleItem(item)}
                          disabled={item.isProcessing}
                          title="Download this flipped image"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Batch Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={downloadAllAsZip}
                    disabled={isBatchProcessing || items.length === 0}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
                  >
                    <Archive className="w-4 h-4" />
                    <span>
                      {isBatchProcessing
                        ? `Processing ${batchProgress?.current || 0}/${batchProgress?.total || items.length}...`
                        : `Download All as ZIP (${items.length} Images)`}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Guarantee */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All flipping and transformations run locally in your browser memory. No images are uploaded to external servers.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
