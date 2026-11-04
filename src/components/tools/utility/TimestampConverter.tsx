import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Calendar, RefreshCw, Info, Sparkles } from 'lucide-react';

export function TimestampConverter() {
  const [currentSec, setCurrentSec] = useState<number>(() => Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState<string>(() => Math.floor(Date.now() / 1000).toString());
  const [inputDate, setInputDate] = useState<string>(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse input timestamp
  const tsNum = parseFloat(inputTimestamp) || 0;
  // If timestamp has > 11 digits, parse as milliseconds
  const isMs = tsNum > 99999999999;
  const parsedDate = new Date(isMs ? tsNum : tsNum * 1000);
  const isValidDate = !isNaN(parsedDate.getTime()) && tsNum > 0;

  // Convert Date picker to timestamp
  const dateObj = new Date(inputDate);
  const calculatedSec = !isNaN(dateObj.getTime()) ? Math.floor(dateObj.getTime() / 1000) : 0;
  const calculatedMs = !isNaN(dateObj.getTime()) ? dateObj.getTime() : 0;

  // Relative time helper
  const getRelativeTime = (d: Date) => {
    const diffSec = Math.round((d.getTime() - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
    const diffMin = Math.round(diffSec / 60);
    if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
    const diffHr = Math.round(diffMin / 60);
    if (Math.abs(diffHr) < 24) return rtf.format(diffHr, 'hour');
    const diffDays = Math.round(diffHr / 24);
    return rtf.format(diffDays, 'day');
  };

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Unix Timestamp Converter</h2>
          <p className="text-sm text-slate-500 mt-1">
            Convert Unix epoch timestamps (seconds & milliseconds) to human-readable dates and vice-versa.
          </p>
        </div>
      </div>

      {/* Current Live Epoch Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Current Unix Epoch Time
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mt-1">
            {currentSec}
          </div>
          <p className="text-2xs text-slate-400 mt-0.5">Elapsed seconds since Jan 01 1970 00:00:00 (UTC)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => copyVal(currentSec.toString(), 'live')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedKey === 'live' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey === 'live' ? 'Copied' : 'Copy Epoch Seconds'}
          </button>
          <button
            type="button"
            onClick={() => copyVal(Date.now().toString(), 'live-ms')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedKey === 'live-ms' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedKey === 'live-ms' ? 'Copied' : 'Copy Milliseconds'}
          </button>
        </div>
      </div>

      {/* Two-Way Converter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Timestamp to Human Date */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" /> Convert Timestamp to Date
            </h3>
            {isValidDate && (
              <span className={`px-2 py-0.5 rounded text-3xs font-bold uppercase tracking-wider ${
                isMs ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {isMs ? '13-Digit (Milliseconds)' : '10-Digit (Seconds)'}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Enter Unix Timestamp (Seconds or Milliseconds)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="e.g. 1700000000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
              />
              <button
                type="button"
                onClick={() => setInputTimestamp(currentSec.toString())}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 cursor-pointer"
              >
                Now
              </button>
            </div>
            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: 'Now (Seconds)', val: currentSec.toString() },
                { label: 'Now (Milliseconds)', val: Date.now().toString() },
                { label: '1,700,000,000 (Nov 2023)', val: '1700000000' },
                { label: 'Year 2030 (1893456000)', val: '1893456000' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setInputTimestamp(p.val)}
                  className="px-2 py-0.5 rounded text-3xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {isValidDate ? (
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium block text-2xs">Coordinated Universal Time</span>
                  <span className="font-mono text-slate-900 font-bold">{parsedDate.toUTCString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toUTCString(), 'utc')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'utc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'utc' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-white flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium block text-2xs">Local Browser Time</span>
                  <span className="font-mono text-slate-900 font-bold">{parsedDate.toString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toString(), 'local')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'local' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium block text-2xs">ISO 8601 Extended Format</span>
                  <span className="font-mono text-slate-800">{parsedDate.toISOString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyVal(parsedDate.toISOString(), 'iso')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'iso' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'iso' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-white flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium block text-2xs">Relative Elapsed Time</span>
                  <span className="font-semibold text-blue-700">{getRelativeTime(parsedDate)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-red-500">Please enter a valid numeric Unix timestamp.</p>
          )}
        </div>

        {/* Right: Date to Timestamp */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" /> Convert Date to Timestamp
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Local Calendar Date & Time
            </label>
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
            />
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="p-4 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-slate-500 font-medium block text-2xs">Seconds (Standard Unix Epoch)</span>
                <span className="font-mono text-blue-900 font-extrabold text-lg sm:text-xl">{calculatedSec}</span>
                <p className="text-3xs text-slate-400 mt-0.5">Used in Python, Linux, PHP, MySQL, and Nginx</p>
              </div>
              <button
                type="button"
                onClick={() => copyVal(calculatedSec.toString(), 'sec')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
              >
                {copiedKey === 'sec' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'sec' ? 'Copied' : 'Copy Seconds'}
              </button>
            </div>

            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <span className="text-slate-500 font-medium block text-2xs">Milliseconds (JavaScript Date.now())</span>
                <span className="font-mono text-slate-800 font-bold text-base sm:text-lg">{calculatedMs}</span>
                <p className="text-3xs text-slate-400 mt-0.5">Used in JavaScript, Node.js, and Java System.currentTimeMillis()</p>
              </div>
              <button
                type="button"
                onClick={() => copyVal(calculatedMs.toString(), 'ms')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
              >
                {copiedKey === 'ms' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'ms' ? 'Copied' : 'Copy Milliseconds'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reference Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-2xs text-slate-600 space-y-1">
        <div className="font-semibold text-slate-800 flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>Seconds vs. Milliseconds in Software Development</span>
        </div>
        <p>
          Standard Unix systems, Linux kernel calls, and backend languages (Python, PHP, Go, C) store timestamps in 10-digit <strong>seconds</strong>. Web browsers, JavaScript (<code className="font-mono">Date.now()</code>), and Java use 13-digit <strong>milliseconds</strong>. If your timestamp has 10 digits, multiply by 1,000 for JavaScript; if it has 13 digits, divide by 1,000 for Unix APIs.
        </p>
      </div>
    </div>
  );
}
