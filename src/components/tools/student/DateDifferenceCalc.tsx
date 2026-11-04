import React, { useState } from 'react';
import { Calendar, Clock, Copy, Check, Briefcase, Plus, Trash2, HelpCircle, AlertCircle, Info } from 'lucide-react';

export function DateDifferenceCalc() {
  const today = new Date().toISOString().split('T')[0];
  const [startDateStr, setStartDateStr] = useState<string>('2026-01-01');
  const [endDateStr, setEndDateStr] = useState<string>(today);
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Optional custom excluded dates (holidays/off-days)
  const [showCustomHolidays, setShowCustomHolidays] = useState<boolean>(false);
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);
  const [newHolidayInput, setNewHolidayInput] = useState<string>('');

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

  const calculateDifference = () => {
    if (!startDateStr || !endDateStr) return null;

    const d1 = new Date(startDateStr + 'T00:00:00');
    const d2 = new Date(endDateStr + 'T00:00:00');

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const start = d1 <= d2 ? d1 : d2;
    const end = d1 <= d2 ? d2 : d1;
    const isReversed = d1 > d2;

    const timeDiff = end.getTime() - start.getTime();
    let totalDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Calculate years, months, days
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (includeEndDay) {
      days += 1;
    }

    // Business days (weekdays vs weekends) & custom holidays check
    let standardBusinessDays = 0;
    let weekendDays = 0;
    let deductedHolidaysCount = 0;

    const cur = new Date(start);
    const limit = new Date(end);
    if (!includeEndDay) {
      limit.setDate(limit.getDate() - 1);
    }

    const holidaySet = new Set(customHolidays);

    while (cur <= limit) {
      const dayOfWeek = cur.getDay();
      const curIso = cur.toISOString().split('T')[0];

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        // Monday through Friday
        if (holidaySet.has(curIso)) {
          deductedHolidaysCount++;
        } else {
          standardBusinessDays++;
        }
      }
      cur.setDate(cur.getDate() + 1);
    }

    const netBusinessDays = standardBusinessDays;
    const totalWeekdays = standardBusinessDays + deductedHolidaysCount;
    const totalWeeks = (totalDays / 7).toFixed(1);
    const totalHours = totalDays * 24;

    return {
      totalDays,
      years,
      months,
      days,
      totalWeeks,
      totalHours,
      totalWeekdays,
      deductedHolidaysCount,
      netBusinessDays,
      weekendDays,
      isReversed,
    };
  };

  const diff = calculateDifference();

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Quick Date Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Common Date Spans:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              {
                label: 'Current Year to Today',
                start: `${new Date().getFullYear()}-01-01`,
                end: today,
              },
              {
                label: 'Next 30 Days',
                start: today,
                end: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
              },
              {
                label: 'Next 90 Days (Quarter)',
                start: today,
                end: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
              },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setStartDateStr(p.start);
                  setEndDateStr(p.end);
                }}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="diff-start-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Start Date
            </label>
            <input
              id="diff-start-date"
              type="date"
              value={startDateStr}
              onChange={(e) => setStartDateStr(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="diff-end-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
              End Date
            </label>
            <input
              id="diff-end-date"
              type="date"
              value={endDateStr}
              onChange={(e) => setEndDateStr(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* Inclusivity Option */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeEndDay}
              onChange={(e) => setIncludeEndDay(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Include end date in calculation (+1 day)</span>
          </label>
          <span className="text-2xs text-slate-500">
            {includeEndDay ? 'Inclusive: counts both start and end dates' : 'Exclusive: standard date subtraction'}
          </span>
        </div>

        {/* Optional Custom Holiday Exclusion */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowCustomHolidays(!showCustomHolidays)}
            className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Optional: Exclude Custom Public Holidays / Off-Days ({customHolidays.length} set)
            </span>
            <span className="text-blue-600 font-bold">{showCustomHolidays ? 'Hide' : 'Configure'}</span>
          </button>

          {showCustomHolidays && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed text-2xs">
                Public holidays vary by country, state, and organization. Add any specific holiday dates falling between your start and end dates to deduct them from business days:
              </p>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={newHolidayInput}
                  onChange={(e) => setNewHolidayInput(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={addCustomHoliday}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Off-Day
                </button>
              </div>

              {customHolidays.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {customHolidays.map((hDate) => (
                    <span
                      key={hDate}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-mono text-2xs border border-slate-200"
                    >
                      {hDate}
                      <button
                        type="button"
                        onClick={() => removeCustomHoliday(hDate)}
                        className="text-slate-400 hover:text-red-600 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {diff && (
          <div className="space-y-6">
            {/* Dual Primary Results: Calendar Days vs Business Days */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Calendar Days */}
              <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200 text-center space-y-2">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Total Calendar Days
                </span>
                <div className="text-4xl font-extrabold font-mono text-blue-600">
                  {diff.totalDays.toLocaleString()} <span className="text-lg font-sans font-medium text-slate-600">days</span>
                </div>
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-900">{diff.years} years, {diff.months} months, {diff.days} days</strong>
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        `${diff.totalDays} calendar days (${diff.years}y ${diff.months}m ${diff.days}d)`,
                        'cal'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-2xs font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer shadow-2xs"
                  >
                    {copiedKey === 'cal' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'cal' ? 'Copied' : 'Copy Calendar Days'}
                  </button>
                </div>
              </div>

              {/* Card 2: Business Days */}
              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-center space-y-2">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Working Business Days
                </span>
                <div className="text-4xl font-extrabold font-mono text-emerald-700">
                  {diff.netBusinessDays.toLocaleString()}{' '}
                  <span className="text-lg font-sans font-medium text-slate-600">days</span>
                </div>
                <p className="text-xs text-slate-600">
                  {diff.deductedHolidaysCount > 0
                    ? `${diff.totalWeekdays} weekdays − ${diff.deductedHolidaysCount} custom off-days`
                    : 'Monday through Friday (weekends excluded)'}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(
                        `${diff.netBusinessDays} business days (${diff.totalDays} total calendar days)`,
                        'biz'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-2xs font-semibold text-emerald-700 hover:bg-emerald-50 cursor-pointer shadow-2xs"
                  >
                    {copiedKey === 'biz' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === 'biz' ? 'Copied' : 'Copy Business Days'}
                  </button>
                </div>
              </div>
            </div>

            {/* Granular Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium">Monday–Friday</span>
                <p className="text-lg font-bold font-mono text-slate-900 mt-1">{diff.totalWeekdays}</p>
                <span className="text-3xs text-slate-400">Total Weekdays</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium">Saturday–Sunday</span>
                <p className="text-lg font-bold font-mono text-slate-900 mt-1">{diff.weekendDays}</p>
                <span className="text-3xs text-slate-400">Weekend Days</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium">Total Weeks</span>
                <p className="text-lg font-bold font-mono text-slate-900 mt-1">{diff.totalWeeks}</p>
                <span className="text-3xs text-slate-400">Elapsed Weeks</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium">Total Hours</span>
                <p className="text-lg font-bold font-mono text-slate-900 mt-1">{diff.totalHours.toLocaleString()}</p>
                <span className="text-3xs text-slate-400">24h per day</span>
              </div>
            </div>

            {/* Explanatory Policy Disclosure */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-2xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Calendar Days vs. Business Days Calculation Logic</span>
              </div>
              <p>
                <strong>Calendar Days ({diff.totalDays})</strong> measures every elapsed day including weekends.
                <strong> Business Days ({diff.netBusinessDays})</strong> excludes Saturdays and Sundays. Because statutory public holidays vary widely by country, state, and employer, they are not automatically excluded unless added to the optional custom off-day list above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
