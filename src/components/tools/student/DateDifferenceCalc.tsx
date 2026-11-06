import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar,
  Clock,
  Copy,
  Check,
  Briefcase,
  Plus,
  Trash2,
  ArrowRightLeft,
  RotateCcw,
  Printer,
  Share2,
  Info,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

export type DateFormat = 'US' | 'EU' | 'ISO';

interface HolidayAuditItem {
  dateStr: string;
  dayName: string;
  status: 'deducted' | 'already-off';
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORDERED_DAYS = [1, 2, 3, 4, 5, 6, 0]; // Mon through Sun

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseLocalDateParts(str: string): { year: number; month: number; day: number } | null {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return { year, month, day };
}

function formatDateDisplay(isoStr: string, format: DateFormat): string {
  const p = parseLocalDateParts(isoStr);
  if (!p) return isoStr;
  const mm = String(p.month).padStart(2, '0');
  const dd = String(p.day).padStart(2, '0');
  const yyyy = p.year;
  if (format === 'US') return `${mm}/${dd}/${yyyy}`;
  if (format === 'EU') return `${dd}/${mm}/${yyyy}`;
  return `${yyyy}-${mm}-${dd}`;
}

export function DateDifferenceCalc() {
  const now = new Date();
  const defaultToday = toLocalDateString(now);

  // States
  const [dateFormat, setDateFormat] = useState<DateFormat>('ISO');
  const [startDateStr, setStartDateStr] = useState<string>('2026-01-01');
  const [endDateStr, setEndDateStr] = useState<string>(defaultToday);
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(true);
  const [workingDays, setWorkingDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri default
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);
  const [newHolidayInput, setNewHolidayInput] = useState<string>('');
  const [showCustomHolidays, setShowCustomHolidays] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const printRef = useRef<HTMLDivElement>(null);

  // Read URL query parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const search = window.location.search;
      if (!search) return;
      const params = new URLSearchParams(search);

      const startParam = params.get('start');
      const endParam = params.get('end');
      const incParam = params.get('inc');
      const workParam = params.get('work');
      const fmtParam = params.get('fmt') as DateFormat | null;
      const holParam = params.get('hol');

      if (startParam && /^\d{4}-\d{2}-\d{2}$/.test(startParam)) {
        setStartDateStr(startParam);
      }
      if (endParam && /^\d{4}-\d{2}-\d{2}$/.test(endParam)) {
        setEndDateStr(endParam);
      }
      if (incParam !== null) {
        setIncludeEndDay(incParam === '1' || incParam === 'true');
      }
      if (workParam) {
        const days = workParam
          .split(',')
          .map((n) => parseInt(n, 10))
          .filter((n) => !isNaN(n) && n >= 0 && n <= 6);
        if (days.length > 0) {
          setWorkingDays(days);
        }
      }
      if (fmtParam && (fmtParam === 'US' || fmtParam === 'EU' || fmtParam === 'ISO')) {
        setDateFormat(fmtParam);
      }
      if (holParam) {
        const hols = holParam
          .split(',')
          .filter((h) => /^\d{4}-\d{2}-\d{2}$/.test(h));
        if (hols.length > 0) {
          setCustomHolidays(Array.from(new Set(hols)).sort());
          setShowCustomHolidays(true);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Quick Presets (all timezone-safe local calendar dates)
  const applyPreset = (type: string) => {
    const current = new Date();
    const curYear = current.getFullYear();
    const curMonth = current.getMonth();
    const curDay = current.getDate();

    let s = '';
    let e = '';

    switch (type) {
      case 'last-7':
        s = toLocalDateString(new Date(curYear, curMonth, curDay - 7));
        e = toLocalDateString(current);
        break;
      case 'last-30':
        s = toLocalDateString(new Date(curYear, curMonth, curDay - 30));
        e = toLocalDateString(current);
        break;
      case 'next-7':
        s = toLocalDateString(current);
        e = toLocalDateString(new Date(curYear, curMonth, curDay + 7));
        break;
      case 'next-30':
        s = toLocalDateString(current);
        e = toLocalDateString(new Date(curYear, curMonth, curDay + 30));
        break;
      case 'this-month':
        s = toLocalDateString(new Date(curYear, curMonth, 1));
        e = toLocalDateString(new Date(curYear, curMonth + 1, 0));
        break;
      case 'next-month':
        s = toLocalDateString(new Date(curYear, curMonth + 1, 1));
        e = toLocalDateString(new Date(curYear, curMonth + 2, 0));
        break;
      case 'ytd':
        s = toLocalDateString(new Date(curYear, 0, 1));
        e = toLocalDateString(current);
        break;
      case 'prev-year':
        s = toLocalDateString(new Date(curYear - 1, 0, 1));
        e = toLocalDateString(new Date(curYear - 1, 11, 31));
        break;
      default:
        return;
    }

    setStartDateStr(s);
    setEndDateStr(e);
  };

  // Holiday management
  const addCustomHoliday = () => {
    if (!newHolidayInput) return;
    if (!customHolidays.includes(newHolidayInput)) {
      setCustomHolidays([...customHolidays, newHolidayInput].sort());
    }
    setNewHolidayInput('');
  };

  const removeCustomHoliday = (dateStr: string) => {
    setCustomHolidays(customHolidays.filter((d) => d !== dateStr));
  };

  // Working day toggling
  const toggleWorkingDay = (dayIndex: number) => {
    if (workingDays.includes(dayIndex)) {
      if (workingDays.length <= 1) {
        // Enforce at least 1 working day
        return;
      }
      setWorkingDays(workingDays.filter((d) => d !== dayIndex));
    } else {
      setWorkingDays([...workingDays, dayIndex].sort());
    }
  };

  // Quick schedule templates
  const applySchedule = (type: 'standard' | 'six-day' | 'four-day' | 'all') => {
    if (type === 'standard') setWorkingDays([1, 2, 3, 4, 5]);
    else if (type === 'six-day') setWorkingDays([1, 2, 3, 4, 5, 6]);
    else if (type === 'four-day') setWorkingDays([1, 2, 3, 4]);
    else if (type === 'all') setWorkingDays([0, 1, 2, 3, 4, 5, 6]);
  };

  // Actions
  const handleSwap = () => {
    const temp = startDateStr;
    setStartDateStr(endDateStr);
    setEndDateStr(temp);
  };

  const handleReset = () => {
    setStartDateStr('2026-01-01');
    setEndDateStr(toLocalDateString(new Date()));
    setIncludeEndDay(true);
    setWorkingDays([1, 2, 3, 4, 5]);
    setCustomHolidays([]);
    setNewHolidayInput('');
    setDateFormat('ISO');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set('start', startDateStr);
    params.set('end', endDateStr);
    params.set('inc', includeEndDay ? '1' : '0');
    params.set('work', workingDays.join(','));
    params.set('fmt', dateFormat);
    if (customHolidays.length > 0) {
      params.set('hol', customHolidays.join(','));
    }

    const shareUrl = `${window.location.origin}/tools/date-difference-calculator?${params.toString()}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Date Difference Calculation — Toolora',
          text: `Date Difference between ${formatDateDisplay(startDateStr, dateFormat)} and ${formatDateDisplay(endDateStr, dateFormat)}:`,
          url: shareUrl,
        })
        .catch(() => {
          // Fallback to clipboard
          copyShareLink(shareUrl);
        });
    } else {
      copyShareLink(shareUrl);
    }
  };

  const copyShareLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  // Main Calculation Engine
  const calculation = useMemo(() => {
    const p1 = parseLocalDateParts(startDateStr);
    const p2 = parseLocalDateParts(endDateStr);
    if (!p1 || !p2) return null;

    const utc1 = Date.UTC(p1.year, p1.month - 1, p1.day);
    const utc2 = Date.UTC(p2.year, p2.month - 1, p2.day);

    const isReversed = utc1 > utc2;
    const startUtc = Math.min(utc1, utc2);
    const endUtc = Math.max(utc1, utc2);

    const startPart = utc1 <= utc2 ? p1 : p2;
    const endPart = utc1 <= utc2 ? p2 : p1;

    // Calendar Days
    const rawDiffDays = Math.round((endUtc - startUtc) / 86400000);
    const totalCalendarDays = includeEndDay ? rawDiffDays + 1 : rawDiffDays;

    // Y/M/D Breakdown
    let ey = endPart.year;
    let em = endPart.month;
    let ed = endPart.day;

    if (includeEndDay) {
      const nextDate = new Date(Date.UTC(ey, em - 1, ed + 1));
      ey = nextDate.getUTCFullYear();
      em = nextDate.getUTCMonth() + 1;
      ed = nextDate.getUTCDate();
    }

    let years = ey - startPart.year;
    let months = em - startPart.month;
    let days = ed - startPart.day;

    if (days < 0) {
      months -= 1;
      const prevMonthDays = new Date(Date.UTC(ey, em - 1, 0)).getUTCDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Dual Weeks representation
    const decimalWeeks = (totalCalendarDays / 7).toFixed(1);
    const wholeWeeks = Math.floor(totalCalendarDays / 7);
    const remainderDays = totalCalendarDays % 7;
    let exactWeeksText = '';
    if (wholeWeeks === 0) {
      exactWeeksText = `${remainderDays} ${remainderDays === 1 ? 'day' : 'days'}`;
    } else if (remainderDays === 0) {
      exactWeeksText = `${wholeWeeks} ${wholeWeeks === 1 ? 'week' : 'weeks'}`;
    } else {
      exactWeeksText = `${wholeWeeks} ${wholeWeeks === 1 ? 'week' : 'weeks'} and ${remainderDays} ${remainderDays === 1 ? 'day' : 'days'}`;
    }

    // Hours
    const totalHours = totalCalendarDays * 24;

    // Business Days, Weekends & Holiday Audit
    const workingSet = new Set(workingDays);
    const holidaySet = new Set(customHolidays);

    let workingDaysCount = 0;
    let weekendDaysCount = 0;
    let deductedHolidaysCount = 0;
    let alreadyOffHolidaysCount = 0;
    const holidayAudit: HolidayAuditItem[] = [];

    const limitUtc = includeEndDay ? endUtc : endUtc - 86400000;

    for (let t = startUtc; t <= limitUtc; t += 86400000) {
      const d = new Date(t);
      const dayOfWeek = d.getUTCDay();
      const dateIso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      const isWorkDay = workingSet.has(dayOfWeek);

      if (isWorkDay) {
        if (holidaySet.has(dateIso)) {
          deductedHolidaysCount++;
          holidayAudit.push({
            dateStr: dateIso,
            dayName: DAY_NAMES[dayOfWeek],
            status: 'deducted',
          });
        } else {
          workingDaysCount++;
        }
      } else {
        weekendDaysCount++;
        if (holidaySet.has(dateIso)) {
          alreadyOffHolidaysCount++;
          holidayAudit.push({
            dateStr: dateIso,
            dayName: DAY_NAMES[dayOfWeek],
            status: 'already-off',
          });
        }
      }
    }

    return {
      isReversed,
      totalCalendarDays,
      years,
      months,
      days,
      decimalWeeks,
      exactWeeksText,
      totalHours,
      workingDaysCount,
      weekendDaysCount,
      deductedHolidaysCount,
      alreadyOffHolidaysCount,
      holidayAudit,
      startDateFormatted: formatDateDisplay(startDateStr, dateFormat),
      endDateFormatted: formatDateDisplay(endDateStr, dateFormat),
    };
  }, [startDateStr, endDateStr, includeEndDay, workingDays, customHolidays, dateFormat]);

  const copyResultsReport = () => {
    if (!calculation) return;
    const report = [
      '--- TOOLORA DATE DIFFERENCE CALCULATION ---',
      `Date Range: ${calculation.startDateFormatted} to ${calculation.endDateFormatted}`,
      `Calculation Mode: ${includeEndDay ? 'Inclusive (+1 day)' : 'Exclusive'}`,
      `Working Week: ${workingDays.map((d) => DAY_SHORT_NAMES[d]).join(', ')}`,
      '',
      `Total Calendar Days: ${calculation.totalCalendarDays.toLocaleString()} days`,
      `Duration Breakdown: ${calculation.years} years, ${calculation.months} months, ${calculation.days} days`,
      `Duration in Weeks: ${calculation.decimalWeeks} weeks (${calculation.exactWeeksText})`,
      `Total Elapsed Hours: ${calculation.totalHours.toLocaleString()} hours (24 hours per calendar day)`,
      '',
      `Business Working Days: ${calculation.workingDaysCount.toLocaleString()} days`,
      `Weekend / Off Days: ${calculation.weekendDaysCount.toLocaleString()} days`,
      `Custom Holidays Deducted: ${calculation.deductedHolidaysCount}`,
      calculation.alreadyOffHolidaysCount > 0
        ? `Holidays on Scheduled Off-Days (no double-deduction): ${calculation.alreadyOffHolidaysCount}`
        : null,
      '',
      'Generated by Toolora (https://toolorahub.vercel.app/tools/date-difference-calculator)',
    ]
      .filter((line) => line !== null)
      .join('\n');

    navigator.clipboard.writeText(report);
    setCopiedKey('all');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyMetric = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      ref={printRef}
      className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-xs space-y-7 print:border-none print:shadow-none print:p-0"
    >
      {/* Top Controls: Date Format Selector & Quick Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 print:hidden">
        {/* Date Format Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date Format:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5" role="radiogroup" aria-label="Date display format">
            {(['ISO', 'US', 'EU'] as DateFormat[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setDateFormat(fmt)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  dateFormat === fmt
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-checked={dateFormat === fmt}
                role="radio"
              >
                {fmt === 'ISO' ? 'ISO (YYYY-MM-DD)' : fmt === 'US' ? 'US (MM/DD/YYYY)' : 'EU (DD/MM/YYYY)'}
              </button>
            ))}
          </div>
        </div>

        {/* Global Toolbar: Swap, Reset, Print, Share, Copy All */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            title="Swap start and end dates"
            aria-label="Swap start and end dates"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Swap</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            title="Reset calculator inputs to default"
            aria-label="Reset calculator inputs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            title="Print results report"
            aria-label="Print results"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors shadow-2xs ${
              shareSuccess
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
            title="Share calculation link with pre-filled dates"
            aria-label="Share calculation link"
          >
            {shareSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={copyResultsReport}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-2xs ${
              copiedKey === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title="Copy structured results summary to clipboard"
            aria-label="Copy all results"
          >
            {copiedKey === 'all' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied Report!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white" />
                <span>Copy All Results</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 8 Quick Timezone-Safe Range Presets */}
      <div className="space-y-2 print:hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Range Presets (Local Calendar):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Last 7 Days', key: 'last-7' },
            { label: 'Last 30 Days', key: 'last-30' },
            { label: 'Next 7 Days', key: 'next-7' },
            { label: 'Next 30 Days', key: 'next-30' },
            { label: 'This Month', key: 'this-month' },
            { label: 'Next Month', key: 'next-month' },
            { label: 'Year to Date', key: 'ytd' },
            { label: 'Previous Year', key: 'prev-year' },
          ].map((preset) => (
            <button
              key={preset.key}
              type="button"
              onClick={() => applyPreset(preset.key)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/80 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Date Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:grid-cols-2">
        {/* Start Date Input */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <label htmlFor="date-calc-start" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Start Date
          </label>
          <div className="relative">
            <input
              id="date-calc-start"
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="w-full pl-3 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
            <span>Formatted: <strong className="text-slate-700">{formatDateDisplay(startDateStr, dateFormat)}</strong></span>
            {parseLocalDateParts(startDateStr) && (
              <span className="text-slate-400">
                {DAY_NAMES[new Date(startDateStr + 'T00:00:00').getDay()]}
              </span>
            )}
          </div>
        </div>

        {/* End Date Input */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <label htmlFor="date-calc-end" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            End Date
          </label>
          <div className="relative">
            <input
              id="date-calc-end"
              type="date"
              value={endDateStr}
              onChange={(e) => setEndDateStr(e.target.value)}
              className="w-full pl-3 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
            <span>Formatted: <strong className="text-slate-700">{formatDateDisplay(endDateStr, dateFormat)}</strong></span>
            {parseLocalDateParts(endDateStr) && (
              <span className="text-slate-400">
                {DAY_NAMES[new Date(endDateStr + 'T00:00:00').getDay()]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reversible Range Warning if Start > End */}
      {calculation?.isReversed && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Reversed Date Order:</strong> Start date is later than end date. The calculator automatically computes the absolute difference between both dates. Click <button type="button" onClick={handleSwap} className="underline font-bold text-amber-900">Swap</button> to invert them.
          </div>
        </div>
      )}

      {/* Inclusivity Option Checkbox */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-200/70 print:border-none print:p-0">
        <input
          id="include-end-date"
          type="checkbox"
          checked={includeEndDay}
          onChange={(e) => setIncludeEndDay(e.target.checked)}
          className="mt-0.5 w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="include-end-date" className="text-xs sm:text-sm text-slate-800 cursor-pointer select-none leading-relaxed">
          <strong className="text-slate-900">Include end date in calculation (+1 day)</strong>
          <span className="block text-xs text-slate-500 mt-0.5">
            Recommended for hotel stays, equipment rentals, and project durations where both the starting and concluding dates count as full days (e.g. May 1 to May 2 = 2 days). Uncheck for strict day subtraction (May 1 to May 2 = 1 day gap).
          </span>
        </label>
      </div>

      {/* Customizable Working Weekdays Selector */}
      <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Working Weekdays Schedule ({workingDays.length} days/week active):</span>
          </label>
          <div className="flex flex-wrap gap-1 text-2xs font-semibold">
            <button
              type="button"
              onClick={() => applySchedule('standard')}
              className="px-2 py-0.5 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300"
            >
              Standard (Mon–Fri)
            </button>
            <button
              type="button"
              onClick={() => applySchedule('six-day')}
              className="px-2 py-0.5 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300"
            >
              6-Day (Mon–Sat)
            </button>
            <button
              type="button"
              onClick={() => applySchedule('four-day')}
              className="px-2 py-0.5 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300"
            >
              4-Day (Mon–Thu)
            </button>
            <button
              type="button"
              onClick={() => applySchedule('all')}
              className="px-2 py-0.5 rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-blue-700 hover:border-blue-300"
            >
              All 7 Days
            </button>
          </div>
        </div>

        {/* 7-Day Toggle Buttons */}
        <div className="grid grid-cols-7 gap-1.5">
          {ORDERED_DAYS.map((dayIdx) => {
            const isWorking = workingDays.includes(dayIdx);
            return (
              <button
                key={dayIdx}
                type="button"
                onClick={() => toggleWorkingDay(dayIdx)}
                className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center border ${
                  isWorking
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                }`}
                title={`Toggle ${DAY_NAMES[dayIdx]} as working day`}
                aria-pressed={isWorking}
              >
                <div>{DAY_SHORT_NAMES[dayIdx]}</div>
                <div className="text-2xs font-normal opacity-85 mt-0.5 hidden sm:block">
                  {isWorking ? 'Work' : 'Off'}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-2xs text-slate-500">
          Selected working days count toward "Business Days". Unselected days are automatically categorized as "Weekend / Off Days".
        </p>
      </div>

      {/* User-Supplied Custom Holidays Section */}
      <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 print:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowCustomHolidays(!showCustomHolidays)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider hover:text-blue-600 transition-colors"
          >
            <CalendarDays className="w-3.5 h-3.5 text-blue-600" />
            <span>Custom Public Holidays & Off-Days ({customHolidays.length} configured)</span>
            <span className="text-2xs font-normal normal-case text-blue-600 underline">
              {showCustomHolidays ? 'Hide Section' : 'Configure Holidays'}
            </span>
          </button>
        </div>

        {showCustomHolidays && (
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-600 leading-relaxed">
              Statutory public and bank holidays vary across jurisdictions, countries, and employers. Toolora does not assume public holidays automatically. Add your specific jurisdiction holidays below; our engine audits each date and ensures off-days falling on scheduled weekends are <strong>not double-deducted</strong>.
            </p>

            {/* Input to Add Holiday */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={newHolidayInput}
                onChange={(e) => setNewHolidayInput(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="YYYY-MM-DD"
              />
              <button
                type="button"
                onClick={addCustomHoliday}
                disabled={!newHolidayInput}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Holiday</span>
              </button>
            </div>

            {/* Holiday Badges List */}
            {customHolidays.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                  Configured Custom Holidays:
                </span>
                <div className="flex flex-wrap gap-2">
                  {customHolidays.map((hol) => (
                    <span
                      key={hol}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      <span>{formatDateDisplay(hol, dateFormat)}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomHoliday(hol)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title={`Remove holiday ${hol}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PRIMARY RESULT PRESENTATION */}
      {calculation && (
        <div className="space-y-6 pt-2">
          {/* Main Top Cards: Total Calendar Days vs Business Working Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total Calendar Days Card */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Total Calendar Days
                </span>
                <button
                  type="button"
                  onClick={() => copyMetric(`${calculation.totalCalendarDays} days`, 'total-days')}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded-md transition-colors print:hidden"
                  title="Copy total days"
                >
                  {copiedKey === 'total-days' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
                  {calculation.totalCalendarDays.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-blue-700">calendar days</span>
              </div>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Continuous 24-hour days ({calculation.startDateFormatted} to {calculation.endDateFormatted})
                {includeEndDay ? ' with end date included.' : ' without end date.'}
              </p>
            </div>

            {/* Business Working Days Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  Business Working Days
                </span>
                <button
                  type="button"
                  onClick={() => copyMetric(`${calculation.workingDaysCount} business days`, 'biz-days')}
                  className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md transition-colors print:hidden"
                  title="Copy business days"
                >
                  {copiedKey === 'biz-days' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
                  {calculation.workingDaysCount.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-emerald-800">working days</span>
              </div>
              <p className="text-xs text-emerald-800/80 leading-relaxed">
                {workingDays.length}-day schedule ({workingDays.map((d) => DAY_SHORT_NAMES[d]).join(', ')})
                {calculation.deductedHolidaysCount > 0 && ` with ${calculation.deductedHolidaysCount} holiday(s) deducted.`}
              </p>
            </div>
          </div>

          {/* Secondary Metric Grid: Dual Weeks, Calendar Breakdown, Hours, Weekends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Dual Weeks Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                Duration in Weeks
              </span>
              <div className="text-xl font-bold text-slate-900">
                {calculation.decimalWeeks} weeks
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {calculation.exactWeeksText}
              </p>
            </div>

            {/* Calendar Breakdown: Years, Months, Days */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                Calendar Breakdown
              </span>
              <div className="text-base font-bold text-slate-900">
                {calculation.years > 0 && `${calculation.years} yr${calculation.years > 1 ? 's' : ''}, `}
                {calculation.months} mo{calculation.months !== 1 ? 's' : ''}, {calculation.days} day{calculation.days !== 1 ? 's' : ''}
              </div>
              <p className="text-xs text-slate-500">
                Based on actual Gregorian month lengths
              </p>
            </div>

            {/* Total Hours: Labeled 24 hours per calendar day */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Elapsed Hours
              </span>
              <div className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{calculation.totalHours.toLocaleString()} hrs</span>
              </div>
              <p className="text-xs text-slate-500">
                24 hours per calendar day
              </p>
            </div>

            {/* Weekend / Off Days Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                Weekend / Off Days
              </span>
              <div className="text-xl font-bold text-slate-900">
                {calculation.weekendDaysCount.toLocaleString()} days
              </div>
              <p className="text-xs text-slate-500">
                {7 - workingDays.length} non-working days per week
              </p>
            </div>
          </div>

          {/* Holiday Audit Breakdown: Deducted vs Already-Off */}
          {calculation.holidayAudit.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Custom Holiday Audit Breakdown:
                </span>
                <span className="text-xs text-slate-500">
                  {calculation.deductedHolidaysCount} deducted · {calculation.alreadyOffHolidaysCount} on scheduled off-days
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {calculation.holidayAudit.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200/90"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">
                        {formatDateDisplay(item.dateStr, dateFormat)}
                      </span>
                      <span className="text-slate-400">({item.dayName})</span>
                    </div>
                    {item.status === 'deducted' ? (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        Deducted -1 day
                      </span>
                    ) : (
                      <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600" title="Already a scheduled weekend/off-day; not double-deducted">
                        Already Off (No double-deduct)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
