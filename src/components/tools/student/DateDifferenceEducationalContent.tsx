import React from 'react';
import {
  Calendar,
  Clock,
  Briefcase,
  HelpCircle,
  CalendarDays,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Scale,
  Sparkles,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';
import { Link } from '../../../context/RouterContext';

export function DateDifferenceEducationalContent() {
  return (
    <div className="space-y-12 text-slate-800">
      {/* ------------------------------------------------------------- */}
      {/* H2: How to Calculate the Difference Between Two Dates */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-how-to-calculate" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-how-to-calculate" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>How to Calculate the Difference Between Two Dates</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Calculating the interval between two calendar points requires determining the total elapsed days, identifying non-working weekends, and accounting for the varying lengths of Gregorian calendar months. Follow this step-by-step procedure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* H3: Select Your Start Date */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <h3 className="text-base font-bold text-slate-900">Select Your Start Date</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use the interactive calendar picker to enter the beginning date of your interval, or pick a rapid range preset such as <em>Last 7 Days</em>, <em>This Month</em>, or <em>Year to Date</em>. You can input dates across any Gregorian year.
            </p>
          </div>

          {/* H3: Select Your End Date */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <h3 className="text-base font-bold text-slate-900">Select Your End Date</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enter your target completion or concluding date. If your start date is later than your end date, the calculator automatically evaluates the absolute duration and provides a convenient <em>Swap</em> button to invert them.
            </p>
          </div>

          {/* H3: Choose Inclusive or Exclusive Calculation */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <h3 className="text-base font-bold text-slate-900">Choose Inclusive or Exclusive Calculation</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Check <strong>Include end date in calculation (+1 day)</strong> if you are measuring tenancy agreements, equipment rentals, or hotel stays where both endpoints count as active days. Uncheck it for strict date subtraction or gap analysis.
            </p>
          </div>

          {/* H3: View Your Date Difference Results */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <h3 className="text-base font-bold text-slate-900">View Your Date Difference Results</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Review your output metrics in real time: total calendar days, exact year/month/day breakdown, duration in weeks (both decimal and whole weeks plus remaining days), total elapsed hours, and Monday–Friday business days.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Calendar Days vs. Business Days */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-calendar-vs-business" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-calendar-vs-business" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>Calendar Days vs. Business Days</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Understanding the distinction between calendar days and business days is critical for legal contracts, billing cycles, project roadmaps, and statutory deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* H3: What Are Calendar Days? */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/50 border border-blue-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-800">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">What Are Calendar Days?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Calendar days measure every consecutive 24-hour day on the Gregorian calendar without interruption. They include Mondays through Sundays, official statutory holidays, and leap days. Continuous services, warranty expirations, and residential leases typically rely on calendar days.
            </p>
          </div>

          {/* H3: What Are Business Days? */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/70 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-800">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">What Are Business Days?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Business days (also known as working days) count only the days when financial institutions, commercial enterprises, and government offices operate. By default, our calculator treats Monday through Friday as standard working days. Banking settlements, courier shipping windows, and court filings measure business days.
            </p>
          </div>

          {/* H3: How Are Weekend Days Counted? */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-700">
              <CalendarDays className="w-4 h-4 text-slate-500" />
              <h3 className="text-base font-bold text-slate-900">How Are Weekend Days Counted?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every day not designated as an active working day is classified as a weekend or scheduled off-day. In a standard 5-day week, Saturdays and Sundays are categorized as weekend days and separated from working days, allowing you to quickly isolate net production capacity.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: How to Calculate Business Days and Exclude Holidays */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-exclude-holidays" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-exclude-holidays" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>How to Calculate Business Days and Exclude Holidays</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Standard business-day calculations exclude weekends, but official public, state, and bank holidays must also be considered for precise scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* H3: Excluding Custom Public Holidays */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Excluding Custom Public Holidays</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Because statutory holidays differ by country, state, and company policy, Toolora does not automatically guess your local holidays. Instead, expand the <em>Custom Public Holidays & Off-Days</em> panel to add your specific jurisdiction dates.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong>Double-Deduction Prevention:</strong> If a custom holiday falls on a Saturday or Sunday, Toolora audits it as <em>Already Off</em> so that weekend off-days are never deducted twice from your net business-day total.
            </div>
          </div>

          {/* H3: Choosing Your Working Week */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Choosing Your Working Week</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Not every industry operates on a Monday–Friday rhythm. Use the 7-day schedule selector to customize your operating days:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>Standard (Mon–Fri):</strong> Typical 5-day corporate and financial schedule.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>6-Day Workweek (Mon–Sat):</strong> Standard for retail, hospitality, and construction.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>4-Day Workweek (Mon–Thu):</strong> Modern compressed working schedules.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>All 7 Days:</strong> Healthcare, emergency services, and continuous utility monitoring.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Supported Date Formats */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-supported-formats" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-supported-formats" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>Supported Date Formats</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            To accommodate international standards, Toolora synchronizes input date interpretation and output reporting across three prominent regional conventions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* H3: US Date Format */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xs font-mono font-bold text-blue-700 uppercase tracking-wider block">MM/DD/YYYY</span>
            <h3 className="text-base font-bold text-slate-900">US Date Format</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Commonly used across the United States. For example, May 1, 2026 is rendered as <code>05/01/2026</code>. Month precedes day, followed by the four-digit year.
            </p>
          </div>

          {/* H3: European Date Format */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">DD/MM/YYYY</span>
            <h3 className="text-base font-bold text-slate-900">European Date Format</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard throughout the United Kingdom, Europe, Latin America, and most Commonwealth nations. For example, May 1, 2026 is formatted as <code>01/05/2026</code>.
            </p>
          </div>

          {/* H3: ISO Date Format */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xs font-mono font-bold text-purple-700 uppercase tracking-wider block">YYYY-MM-DD</span>
            <h3 className="text-base font-bold text-slate-900">ISO Date Format</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The international ISO 8601 standard used in databases, programming interfaces, and file naming. For example, May 1, 2026 is formatted as <code>2026-05-01</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Inclusive vs. Exclusive Date Calculation */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-inclusive-vs-exclusive" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-inclusive-vs-exclusive" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>Inclusive vs. Exclusive Date Calculation</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            The single most common reason date difference calculations differ between contracts and spreadsheets is whether the ending date is included (+1 day) or excluded (0 days).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* H3: Inclusive Date Example */}
          <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-blue-950">Inclusive Date Example</h3>
              <span className="text-2xs font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">Include End Date Checked</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If an employee takes leave from <strong>Friday, May 1, 2026</strong> through <strong>Saturday, May 2, 2026</strong>:
            </p>
            <div className="bg-white p-3 rounded-lg border border-blue-100 font-mono text-xs text-slate-800 space-y-1">
              <div>• Calendar Days: <strong>2 days</strong> (both May 1 and May 2 count)</div>
              <div>• Business Days: <strong>1 day</strong> (Friday May 1)</div>
              <div>• Weekend Days: <strong>1 day</strong> (Saturday May 2)</div>
            </div>
            <p className="text-xs text-slate-600">
              Use inclusive mode for hotel stays, car rentals, event passes, and employee leave requests where both boundary days involve active utilization.
            </p>
          </div>

          {/* H3: Exclusive Date Example */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Exclusive Date Example</h3>
              <span className="text-2xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">Include End Date Unchecked</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Using the same range from <strong>Friday, May 1, 2026</strong> to <strong>Saturday, May 2, 2026</strong>:
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div>• Calendar Days: <strong>1 day</strong> (May 2 − May 1 = 1 day elapsed)</div>
              <div>• Business Days: <strong>1 day</strong> (Friday May 1)</div>
              <div>• Weekend Days: <strong>0 days</strong> (Saturday May 2 is excluded)</div>
            </div>
            <p className="text-xs text-slate-600">
              Use exclusive mode for elapsed age, interest calculation periods, and strict mathematical date subtraction where only the gap between points matters.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Date Difference Calculation Examples */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-calculation-examples" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-calculation-examples" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
            <span>Date Difference Calculation Examples</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Below are verified practical calculations evaluated with the exact same Gregorian date engine as our live calculator, comparing calendar days, Monday–Friday business days, and weekend counts across key boundary scenarios.
          </p>
        </div>

        {/* Four Named Heading Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* H3: Example 1 — One Day Between Dates */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Example 1 — One Day Between Dates</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Range:</strong> May 1, 2026 to May 2, 2026.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
              <div>• <strong>Inclusive (+1 day):</strong> 2 calendar days (1 business day, 1 weekend day).</div>
              <div>• <strong>Exclusive:</strong> 1 calendar day (1 business day, 0 weekend days).</div>
            </div>
            <p className="text-xs text-slate-500">
              Demonstrates how the inclusive checkbox adds the concluding Saturday (May 2) to the tally.
            </p>
          </div>

          {/* H3: Example 2 — Days Between Two Months */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Example 2 — Days Between Two Months</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Range:</strong> June 1, 2026 to July 1, 2026.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
              <div>• <strong>Inclusive (+1 day):</strong> 31 calendar days (23 business days, 8 weekend days).</div>
              <div>• <strong>Exclusive:</strong> 30 calendar days (22 business days, 8 weekend days).</div>
            </div>
            <p className="text-xs text-slate-500">
              June has 30 days. In exclusive mode, it represents exactly the 30 days of June; in inclusive mode, Wednesday July 1 is counted as day 31.
            </p>
          </div>

          {/* H3: Example 3 — Leap Year Calculation */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Example 3 — Leap Year Calculation</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Range:</strong> February 27, 2028 to March 2, 2028 (2028 is a leap year).
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
              <div>• <strong>Inclusive (+1 day):</strong> 5 calendar days (4 business days, 1 weekend day).</div>
              <div>• <strong>Exclusive:</strong> 4 calendar days (3 business days, 1 weekend day).</div>
            </div>
            <p className="text-xs text-slate-500">
              February 2028 includes Tuesday, February 29th. The inclusive span counts Sun Feb 27, Mon Feb 28, Tue Feb 29, Wed Mar 1, and Thu Mar 2.
            </p>
          </div>

          {/* H3: Example 4 — Business Days Before a Deadline */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Example 4 — Business Days Before a Deadline</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Range:</strong> March 1, 2026 to March 15, 2026.
            </p>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
              <div>• <strong>Inclusive (+1 day):</strong> 15 calendar days (10 business days, 5 weekend days).</div>
              <div>• <strong>Exclusive:</strong> 14 calendar days (10 business days, 4 weekend days).</div>
            </div>
            <p className="text-xs text-slate-500">
              Spans exactly two full 5-day Monday–Friday workweeks (Mar 2–6 and Mar 9–13), isolating 10 net productive working days.
            </p>
          </div>
        </div>

        {/* Complete Comparative Verification Table */}
        <div className="space-y-3 pt-3">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Verified Range Benchmark Matrix (Mon–Fri Default Schedule)
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200/90 text-slate-700 font-semibold">
                <tr>
                  <th scope="col" className="p-3 sm:p-3.5">Date Range</th>
                  <th scope="col" className="p-3 sm:p-3.5">Calculation Mode</th>
                  <th scope="col" className="p-3 sm:p-3.5 text-center">Calendar Days</th>
                  <th scope="col" className="p-3 sm:p-3.5 text-center">Business Days</th>
                  <th scope="col" className="p-3 sm:p-3.5 text-center">Weekend Days</th>
                  <th scope="col" className="p-3 sm:p-3.5">Key Boundary Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-600">
                {/* 1. May 1, 2026 to May 10, 2026 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-medium text-slate-800 font-mono" rowSpan={2}>
                    2026-05-01 to 2026-05-10
                  </td>
                  <td className="p-3 sm:p-3.5 font-semibold text-blue-700">Inclusive (+1 day)</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">10</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">6</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">4</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">May 1 is Fri; May 10 is Sun. Includes 2 weekends.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-semibold text-slate-600">Exclusive</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">9</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">6</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">3</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Excludes Sunday May 10; business days remain 6.</td>
                </tr>

                {/* 2. June 1, 2026 to July 1, 2026 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-medium text-slate-800 font-mono" rowSpan={2}>
                    2026-06-01 to 2026-07-01
                  </td>
                  <td className="p-3 sm:p-3.5 font-semibold text-blue-700">Inclusive (+1 day)</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">31</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">23</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">8</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Includes all 30 June days + Wednesday July 1.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-semibold text-slate-600">Exclusive</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">30</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">22</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">8</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Exactly 1 calendar month (June 1–30).</td>
                </tr>

                {/* 3. February 27, 2028 to March 2, 2028 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-medium text-slate-800 font-mono" rowSpan={2}>
                    2028-02-27 to 2028-03-02
                  </td>
                  <td className="p-3 sm:p-3.5 font-semibold text-blue-700">Inclusive (+1 day)</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">5</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">4</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">1</td>
                  <td className="p-3 sm:p-3.5 text-xs text-purple-700 font-medium">Leap year 2028 accurately tallies February 29th.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-semibold text-slate-600">Exclusive</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">4</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">3</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">1</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Excludes Thursday March 2; includes leap day Feb 29.</td>
                </tr>

                {/* 4. March 1, 2026 to March 15, 2026 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-medium text-slate-800 font-mono" rowSpan={2}>
                    2026-03-01 to 2026-03-15
                  </td>
                  <td className="p-3 sm:p-3.5 font-semibold text-blue-700">Inclusive (+1 day)</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">15</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">10</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">5</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">March 1 & 15 are Sundays. Exactly 2 workweeks.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-semibold text-slate-600">Exclusive</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">14</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">10</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">4</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Excludes Sunday Mar 15; business days remain 10.</td>
                </tr>

                {/* 5. January 1, 2025 to January 1, 2026 */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-medium text-slate-800 font-mono" rowSpan={2}>
                    2025-01-01 to 2026-01-01
                  </td>
                  <td className="p-3 sm:p-3.5 font-semibold text-blue-700">Inclusive (+1 day)</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">366</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">262</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">104</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Full 365-day year 2025 plus Thursday Jan 1, 2026.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 sm:p-3.5 font-semibold text-slate-600">Exclusive</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-900 font-mono">365</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-emerald-700 font-mono">261</td>
                  <td className="p-3 sm:p-3.5 text-center font-bold text-slate-600 font-mono">104</td>
                  <td className="p-3 sm:p-3.5 text-xs text-slate-500">Exact mathematical length of standard common year 2025.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Common Uses of a Date Difference Calculator */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-common-uses" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-common-uses" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Common Uses of a Date Difference Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Professionals, students, and property managers use date duration calculators across diverse operational workflows:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* H3: Project and Deadline Planning */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Project and Deadline Planning</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Software engineering teams, construction managers, and consultants schedule sprints by calculating available Monday–Friday business days rather than raw calendar time. To schedule focused revision intervals during intense study or project sprints, you can also use our <Link to="/tools/study-timer" className="font-semibold text-blue-600 hover:underline">Study Timer</Link> or structure work sessions with <Link to="/tools/pomodoro-timer" className="font-semibold text-blue-600 hover:underline">Pomodoro Timer</Link>.
            </p>
          </div>

          {/* H3: Employment and Payroll */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Employment and Payroll</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Human resource departments and contractors compute billable workdays between invoice commencement and cutoff dates. Factoring out scheduled weekends and custom statutory holidays ensures timesheet accuracy without manual calendar tallying.
            </p>
          </div>

          {/* H3: Rental and Contract Periods */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Rental and Contract Periods</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Commercial lease agreements, vacation rentals, and equipment leasing contracts charge on an inclusive basis. Using the inclusive mode (+1 day) guarantees both the pickup day and drop-off day are accounted for in total billing days.
            </p>
          </div>

          {/* H3: Travel and Event Planning */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Travel and Event Planning</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Determine visa validity windows (such as 90-day tourist allowances), vacation durations, and countdown intervals to international conferences. For chronological birthdate milestones, upcoming birthday countdowns, and exact age metrics, open our dedicated <Link to="/tools/age-calculator" className="font-semibold text-blue-600 hover:underline">Age Calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Frequently Asked Questions */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-faq" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-faq" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Direct, verified answers to common inquiries regarding date calculations, calendar math, business days, and holiday handling.
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              How do I calculate the number of days between two dates?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Select your start date and end date using the date pickers or pick a quick preset (such as <em>Last 30 Days</em> or <em>This Month</em>). The calculator immediately subtracts the dates using Gregorian calendar arithmetic, giving you total elapsed calendar days, a breakdown in years, months, and days, the span in weeks, total elapsed hours (at 24 hours per calendar day), and the number of business working days.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              What is the difference between calendar days and business days?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Calendar days count every consecutive 24-hour day on the calendar, including Saturdays and Sundays. Business days (or working days) isolate only the days of the week when commercial offices and institutions typically operate—by default, Monday through Friday—excluding weekends and any custom holidays you choose to exclude.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Should I include the start and end dates?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It depends on your use case. In inclusive mode (checked by default, adding +1 day), both the start date and the end date are counted as full days. This is standard for hotel reservations, vehicle rentals, and project milestones (for example, May 1 to May 2 counts as 2 full days). If you uncheck the box for exclusive mode, the calculator measures the mathematical difference or gap between dates (May 1 to May 2 equals a 1-day difference).
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Are public holidays automatically excluded?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              No. Statutory, government, and bank holidays vary significantly across countries, states, provinces, and individual corporate policies. Toolora does not make assumptions about your local jurisdiction. Instead, you can expand the <em>Custom Public Holidays & Off-Days</em> section and add your specific holiday dates. The calculator audits each holiday and deducts it from working days only if it falls on an active working weekday, preventing double-deduction on weekends.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Can I count Saturday as a business day?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Yes. In the <em>Working Weekdays Schedule</em> section, you can customize which days of the week are considered working days. You can select Saturday for a 6-day workweek (Monday through Saturday), choose a 4-day workweek (Monday through Thursday), or select all 7 days for continuous operations. At least one working day must remain selected.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Does the calculator account for leap years?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Yes. Toolora strictly follows Gregorian calendar rules. Leap years (such as 2024, 2028, and 2032) accurately include February 29th as a 29th day. For example, calculating the span between February 27, 2028 and March 2, 2028 evaluates exactly 5 calendar days inclusively (including Tuesday, February 29) rather than 4 days.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Can I calculate the difference between dates in different years?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Yes. You can select any start and end dates across multiple years, decades, or centuries. The calculator provides both the total elapsed calendar days and an exact breakdown in elapsed years, full calendar months, and remaining days. For example, January 1, 2025 to January 1, 2026 computes exactly 365 calendar days exclusively (or 366 days inclusively).
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              How do I calculate working days excluding weekends?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Leave the default Monday through Friday schedule active. The calculator automatically inspects each consecutive date in your range, classifies Saturdays and Sundays as weekend/off-days, and tallies only Monday through Friday as business days.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Can I calculate days between dates in Excel?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Yes. In Microsoft Excel and Google Sheets, you can calculate calendar days by simple subtraction (<code>=B2 - A2</code> for exclusive, or <code>=B2 - A2 + 1</code> for inclusive). To calculate business days excluding weekends, use the formula <code>=NETWORKDAYS(A2, B2)</code> or <code>=NETWORKDAYS.INTL(A2, B2, 1, holiday_range)</code> to exclude custom holidays. Toolora gives you the same verified results instantly in your browser without writing spreadsheet formulas.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Does the calculator work for past and future dates?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Yes. You can compute historical intervals (such as historical war dates or past lease agreements) or future projections (such as upcoming project deadlines or countdowns to retirement). If you enter a start date that is later than your end date, the calculator automatically evaluates the absolute duration and displays a notice with a 1-click <em>Swap</em> button.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* H2: Related Date and Time Calculators */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="heading-related-calculators" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 id="heading-related-calculators" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
            <span>Related Date and Time Calculators</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Explore related online utilities engineered for date transformations, chronological birthdate metrics, and time management:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Timestamp Converter */}
          <Link
            to="/tools/timestamp-converter"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Timestamp Converter
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Convert Unix epoch timestamps in seconds or milliseconds into human-readable calendar dates and UTC times.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              Open Converter <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Age Calculator */}
          <Link
            to="/tools/age-calculator"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Age Calculator
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Determine exact chronological age from a date of birth with upcoming birthday countdowns and milestones.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              Open Calculator <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Study Timer */}
          <Link
            to="/tools/study-timer"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Study Timer
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Track focused revision intervals, study sessions, and exam preparation countdowns in your browser.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              Open Timer <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Pomodoro Timer */}
          <Link
            to="/tools/pomodoro-timer"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Pomodoro Timer
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Maintain high focus with structured 25-minute work intervals and 5-minute recovery intervals.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              Open Timer <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Student & Academic Tools */}
          <Link
            to="/category/student-tools"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Student & Academic Tools
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Browse our complete suite of GPA calculators, grade projection tools, and student utilities.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              Browse Category <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Online Tool Guides */}
          <Link
            to="/guides"
            className="group p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Online Tool Guides
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Step-by-step tutorials on using browser-based utilities, image tools, and productivity calculators.
              </p>
            </div>
            <span className="text-2xs font-semibold text-blue-600 flex items-center gap-1">
              View All Guides <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
