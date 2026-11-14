import React, { useState } from 'react';
import { Copy, Check, AlertCircle, CheckCircle2, BookOpen, Percent, ArrowUpRight, ArrowDownRight, Scale } from 'lucide-react';
import { Link } from '../../../context/RouterContext';

export function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<'mode1' | 'mode2' | 'mode3'>('mode1');
  const [copied, setCopied] = useState<boolean>(false);

  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState<string>('20');
  const [v1, setV1] = useState<string>('150');

  // Mode 2: X is what % of Y?
  const [p2, setP2] = useState<string>('45');
  const [v2, setV2] = useState<string>('180');

  // Mode 3: Percentage increase / decrease from X to Y
  const [p3, setP3] = useState<string>('120');
  const [v3, setV3] = useState<string>('150');

  // Calculation 1
  const numP1 = parseFloat(p1) || 0;
  const numV1 = parseFloat(v1) || 0;
  const result1 = (numP1 / 100) * numV1;

  // Calculation 2
  const numP2 = parseFloat(p2) || 0;
  const numV2 = parseFloat(v2) || 0;
  const result2 = numV2 !== 0 ? (numP2 / numV2) * 100 : 0;

  // Calculation 3
  const numP3 = parseFloat(p3) || 0;
  const numV3 = parseFloat(v3) || 0;
  const diff3 = numV3 - numP3;
  const result3 = numP3 !== 0 ? (diff3 / numP3) * 100 : 0;
  const isIncrease = diff3 >= 0;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-10">
      <div>
        {/* Mode selection tabs */}
        <div className="flex border-b border-slate-200 gap-2 pb-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('mode1')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'mode1'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            What is X% of Y?
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mode2')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'mode2'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            X is what % of Y?
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mode3')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'mode3'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            % Increase / Decrease
          </button>
        </div>

        <div className="mt-8 max-w-xl mx-auto">
          {/* MODE 1 */}
          {activeTab === 'mode1' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Percentage (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      value={p1}
                      onChange={(e) => setP1(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                      placeholder="e.g. 20"
                    />
                    <span className="absolute right-3 top-3.5 text-slate-400 font-mono text-sm">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Of Value (Y)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={v1}
                    onChange={(e) => setV1(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 150"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Result</span>
                <div className="text-4xl font-bold font-mono text-blue-600 mt-2">
                  {Number.isInteger(result1) ? result1 : result1.toFixed(4).replace(/\.?0+$/, '')}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {p1}% of {v1} = <span className="font-semibold text-slate-800">{result1}</span>
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(result1.toString())}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Result'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setP1('0'); setV1('0'); }}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2 */}
          {activeTab === 'mode2' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Part Value (X)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={p2}
                    onChange={(e) => setP2(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 45"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Total / Whole (Y)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={v2}
                    onChange={(e) => setV2(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 180"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Percentage</span>
                <div className="text-4xl font-bold font-mono text-blue-600 mt-2">
                  {result2.toFixed(2).replace(/\.?0+$/, '')}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {p2} is <span className="font-semibold text-slate-800">{result2.toFixed(2)}%</span> of {v2}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(`${result2.toFixed(2)}%`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Result'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setP2('0'); setV2('0'); }}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3 */}
          {activeTab === 'mode3' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Initial Value (From)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={p3}
                    onChange={(e) => setP3(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 120"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Final Value (To)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={v3}
                    onChange={(e) => setV3(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 150"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {isIncrease ? 'Percentage Increase' : 'Percentage Decrease'}
                </span>
                <div
                  className={`text-4xl font-bold font-mono mt-2 ${
                    isIncrease ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isIncrease ? '+' : ''}
                  {result3.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Difference of {diff3 > 0 ? `+${diff3}` : diff3} from {p3} to {v3}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(`${result3.toFixed(2)}%`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Result'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setP3('0'); setV3('0'); }}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Documentation, Visual Infographics & Worked Examples */}
      <div className="pt-8 border-t border-slate-200 space-y-12">
        {/* Section 1: What Is a Percentage? + Number-Line / Grid Illustration */}
        <section className="space-y-5" aria-labelledby="what-is-a-percentage">
          <div className="space-y-2">
            <h2 id="what-is-a-percentage" className="text-xl font-bold text-[#1E293B] tracking-tight sm:text-2xl">
              What Is a Percentage?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A percentage expresses a number as a part of 100. The word percentage means &quot;per hundred,&quot; and the symbol <code>%</code> represents one hundredth. For example, <strong>25% of 200 is 50</strong> because 25 out of every 100 parts of 200 equals 50.
            </p>
          </div>

          {/* Visual Percentage Scale & Equivalence Grid */}
          <div className="p-5 rounded-2xl bg-[#F5F8FF] border border-blue-200/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#1E293B]">
              <span>Percentage-to-Fraction &amp; Decimal Reference Scale (0% to 100%)</span>
              <span className="font-mono text-[#2563EB]">25% of 200 = 50</span>
            </div>

            {/* Segmented 100-part bar */}
            <div className="space-y-1.5">
              <div className="h-4 w-full rounded-lg bg-white border border-blue-200 overflow-hidden grid grid-cols-4">
                <div className="bg-[#2563EB] flex items-center justify-center text-[10px] font-mono font-bold text-white">25% (50)</div>
                <div className="bg-blue-200/70 border-l border-white flex items-center justify-center text-[10px] font-mono font-semibold text-blue-900">50% (100)</div>
                <div className="bg-blue-100/70 border-l border-white flex items-center justify-center text-[10px] font-mono text-slate-600">75% (150)</div>
                <div className="bg-slate-50 border-l border-slate-200 flex items-center justify-center text-[10px] font-mono text-slate-600">100% (200)</div>
              </div>
            </div>

            {/* 5 Equivalence Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              {[
                { pct: '1%', frac: '1/100', dec: '0.01' },
                { pct: '10%', frac: '10/100', dec: '0.10' },
                { pct: '25%', frac: '25/100', dec: '0.25' },
                { pct: '50%', frac: '50/100', dec: '0.50' },
                { pct: '100%', frac: '100/100', dec: '1' },
              ].map((item) => (
                <div key={item.pct} className="p-3 rounded-xl bg-white border border-slate-200/90 space-y-1">
                  <div className="text-sm font-extrabold font-mono text-[#2563EB] tabular-nums">{item.pct}</div>
                  <div className="text-xs font-mono text-[#1E293B] tabular-nums">{item.frac} = {item.dec}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: What Can You Calculate With This Percentage Calculator? + Visual 1 */}
        <section className="space-y-6" aria-labelledby="what-can-you-calculate">
          <div className="space-y-2">
            <h2 id="what-can-you-calculate" className="text-xl font-bold text-[#1E293B] tracking-tight sm:text-2xl">
              What Can You Calculate With This Percentage Calculator?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              This online percentage calculator is organized into three tabs so you can calculate a percentage of a number, compare a part with a whole, or find the percentage change between two values:
            </p>
          </div>

          {/* Visual 1 — Three Percentage Calculation Modes */}
          <figure className="rounded-2xl border border-blue-200/80 bg-[#F5F8FF] p-3 sm:p-4 space-y-2.5">
            <img
              src="/images/percentage-calculator/percentage-calculator-modes.svg"
              alt="Three percentage calculation methods: percentage of a number, part as a percentage of a whole, and percentage change."
              width={960}
              height={320}
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl bg-white"
            />
            <figcaption className="text-xs text-slate-600 text-center">
              Overview of the three percentage calculation modes, formulas, and default examples in Toolora Percentage Calculator.
            </figcaption>
          </figure>

          {/* Three Mode Subsections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* H3: 1. What Is X% of Y? */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                  <Percent className="w-4 h-4 shrink-0" />
                  <span>Mode 1</span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B]">
                  1. What Is X% of Y?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Use this mode when you know the percentage and the original number, and want to calculate the portion.
                </p>

                <div className="p-3 rounded-xl bg-[#F5F8FF] border border-blue-200/80 font-mono text-xs space-y-1">
                  <div className="text-slate-500 font-sans text-[11px] font-semibold">Formula &amp; Example:</div>
                  <div className="font-bold text-[#2563EB]">Result = (X ÷ 100) × Y</div>
                  <div className="text-[#1E293B]">What is 20% of 150? → (20 ÷ 100) × 150 = <strong>30</strong></div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Calculate a restaurant tip amount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Find a sales-tax amount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Work out a retail discount amount</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Calculate a commission portion</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <strong className="block font-bold">Important — Discount Amount vs. Final Price:</strong>
                <p className="leading-relaxed">
                  Mode 1 returns the percentage amount, not an automatically adjusted final price. For a $120 item with a 30% discount, Discount amount = <strong>$36</strong> and Final price before other charges = $120 − $36 = <strong>$84</strong>. The calculator returns 36, not 84.
                </p>
              </div>
            </div>

            {/* H3: 2. X Is What Percentage of Y? */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                  <Scale className="w-4 h-4 shrink-0" />
                  <span>Mode 2</span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B]">
                  2. X Is What Percentage of Y?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Use this mode when you know a part and a whole and want to find the percentage represented by the part.
                </p>

                <div className="p-3 rounded-xl bg-[#F5F8FF] border border-blue-200/80 font-mono text-xs space-y-1">
                  <div className="text-slate-500 font-sans text-[11px] font-semibold">Formula &amp; Example:</div>
                  <div className="font-bold text-[#2563EB]">Percentage = (X ÷ Y) × 100</div>
                  <div className="text-[#1E293B]">45 is what % of 180? → (45 ÷ 180) × 100 = <strong>25%</strong></div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Exam score compared with maximum marks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>Completed tasks compared with total tasks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>One budget expense compared with the overall budget</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>A portion of a collection or quantity</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#F5F8FF] border border-blue-200/80 text-xs text-slate-700 space-y-1">
                <strong className="block font-bold text-[#1E293B]">When Part X Exceeds Whole Y:</strong>
                <p className="leading-relaxed">
                  The part X can be greater than the whole Y. For example, achieving <strong>1,250</strong> out of a target of <strong>1,000</strong> represents <strong>125%</strong>.
                </p>
              </div>
            </div>

            {/* H3: 3. Percentage Increase or Decrease */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                  <span>Mode 3</span>
                </div>
                <h3 className="text-base font-bold text-[#1E293B]">
                  3. Percentage Increase or Decrease
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Use this mode when comparing an initial starting value with a final ending value.
                </p>

                <div className="p-3 rounded-xl bg-[#F5F8FF] border border-blue-200/80 font-mono text-xs space-y-1.5">
                  <div className="text-slate-500 font-sans text-[11px] font-semibold">Formula &amp; Examples:</div>
                  <div className="font-bold text-[#2563EB]">((Final − Initial) ÷ Initial) × 100</div>
                  <div className="text-emerald-700">Increase (120 → 150): ((150 − 120) ÷ 120) × 100 = <strong>+25%</strong></div>
                  <div className="text-rose-700">Decrease (500 → 425): ((425 − 500) ÷ 500) × 100 = <strong>−15%</strong></div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                    <span>Positive results (+%) indicate an increase</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                    <span>Negative results (−%) indicate a decrease</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
                    <span>The initial value is the baseline divisor</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <strong className="block font-bold">Why Reversing Values Changes the Result:</strong>
                <p className="leading-relaxed">
                  Going from <strong>100 to 125</strong> is a <strong>25% increase</strong>, while going from <strong>125 back to 100</strong> is a <strong>20% decrease</strong> because each calculation divides by a different starting value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Percentage Formulas at a Glance */}
        <section className="space-y-4" aria-labelledby="percentage-formulas-table">
          <div className="space-y-1.5">
            <h2 id="percentage-formulas-table" className="text-xl font-bold text-[#1E293B] tracking-tight sm:text-2xl">
              Percentage Formulas at a Glance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quick reference for all three percentage formulas used by the calculator:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F5F8FF] border-b border-slate-200/90 text-[#1E293B] font-bold">
                <tr>
                  <th scope="col" className="py-3.5 px-4">Calculation</th>
                  <th scope="col" className="py-3.5 px-4">Formula</th>
                  <th scope="col" className="py-3.5 px-4">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1E293B]">Percentage of a number</td>
                  <td className="py-3 px-4 font-mono text-[#2563EB] font-bold">(X ÷ 100) × Y</td>
                  <td className="py-3 px-4 font-mono tabular-nums">20% of 150 = 30</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1E293B]">Part as a percentage of whole</td>
                  <td className="py-3 px-4 font-mono text-[#2563EB] font-bold">(X ÷ Y) × 100</td>
                  <td className="py-3 px-4 font-mono tabular-nums">45 of 180 = 25%</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1E293B]">Percentage change</td>
                  <td className="py-3 px-4 font-mono text-[#2563EB] font-bold">((Final − Initial) ÷ Initial) × 100</td>
                  <td className="py-3 px-4 font-mono tabular-nums">120 to 150 = +25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Worked Practical Examples + Visual 2 */}
        <section className="space-y-6" aria-labelledby="worked-percentage-examples">
          <div className="space-y-2">
            <h2 id="worked-percentage-examples" className="text-xl font-bold text-[#1E293B] tracking-tight sm:text-2xl">
              Worked Percentage Examples
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Step-by-step calculations showing how percentages apply to shopping discounts, exam scores, value changes, and household budgets:
            </p>
          </div>

          {/* Visual 2 — How Percentage Calculations Work in Real Life */}
          <figure className="rounded-2xl border border-blue-200/80 bg-[#F5F8FF] p-3 sm:p-4 space-y-2.5">
            <img
              src="/images/percentage-calculator/percentage-calculator-real-life-examples.svg"
              alt="Percentage calculator examples for shopping discounts, exam marks, increases and budget comparisons."
              width={960}
              height={360}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-auto rounded-xl bg-white"
            />
            <figcaption className="text-xs text-slate-600 text-center">
              Real-life percentage calculations across shopping discounts, exam results, percentage increases, and budget shares.
            </figcaption>
          </figure>

          {/* Three Worked Example Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-[#F5F8FF] border border-blue-200/80 space-y-2.5">
              <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Example 1: Shopping Discount</div>
              <div className="text-[#1E293B] space-y-1">
                <div>Original price: <strong className="font-mono">$80</strong></div>
                <div>Discount rate: <strong className="font-mono">25%</strong></div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 font-mono text-xs text-[#2563EB] font-bold">
                (25 ÷ 100) × 80 = 20
              </div>
              <p className="text-slate-700 leading-relaxed">
                Discount amount: <strong>$20</strong>. Final price: <strong>$60</strong> before other charges ($80 − $20).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F8FF] border border-blue-200/80 space-y-2.5">
              <div className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Example 2: Exam Result</div>
              <div className="text-[#1E293B] space-y-1">
                <div>Marks earned: <strong className="font-mono">68</strong></div>
                <div>Maximum marks: <strong className="font-mono">80</strong></div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 font-mono text-xs text-[#2563EB] font-bold">
                (68 ÷ 80) × 100 = 85%
              </div>
              <p className="text-slate-700 leading-relaxed">
                Result: <strong>85%</strong>. Mode 2 compares the earned score directly against the total possible marks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Example 3: Percentage Increase</div>
              <div className="text-[#1E293B] space-y-1">
                <div>Initial value: <strong className="font-mono">120</strong></div>
                <div>Final value: <strong className="font-mono">150</strong></div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 font-mono text-xs text-emerald-700 font-bold">
                ((150 − 120) ÷ 120) × 100 = 25%
              </div>
              <p className="text-slate-700 leading-relaxed">
                Result: <strong>25% increase</strong> (+30 net difference relative to the starting value of 120).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Everyday Uses of Percentage Calculations */}
        <section className="space-y-4" aria-labelledby="everyday-uses-of-percentages">
          <h2 id="everyday-uses-of-percentages" className="text-xl font-bold text-[#1E293B] tracking-tight sm:text-2xl">
            Everyday Uses of Percentage Calculations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
              <h3 className="font-bold text-[#1E293B] text-sm">Shopping and Discounts</h3>
              <p className="text-slate-600 leading-relaxed">
                Calculate the amount saved on an item in Mode 1. Remember that Mode 1 calculates the discount amount, not the final checkout price; for dedicated markdown and remaining-price percentages, see <Link to="/tools/percentage-decrease-calculator" className="font-semibold text-[#2563EB] hover:underline">Percentage Decrease Calculator</Link>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
              <h3 className="font-bold text-[#1E293B] text-sm">Tips and Sales Tax</h3>
              <p className="text-slate-600 leading-relaxed">
                Find the tip or sales-tax amount from a bill total using Mode 1. Add the calculated tax or tip amount to your subtotal yourself to determine the final bill.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
              <h3 className="font-bold text-[#1E293B] text-sm">Exam Scores</h3>
              <p className="text-slate-600 leading-relaxed">
                Use Mode 2 to find what percentage your marks represent out of the maximum marks. For multi-subject grading and grade classifications, use <Link to="/tools/marks-percentage-calculator" className="font-semibold text-[#2563EB] hover:underline">Marks Percentage Calculator</Link>, or use <Link to="/tools/gpa-calculator" className="font-semibold text-[#2563EB] hover:underline">GPA Calculator</Link> for credit-weighted college courses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5">
              <h3 className="font-bold text-[#1E293B] text-sm">Budget Comparisons</h3>
              <p className="text-slate-600 leading-relaxed">
                Calculate what percentage of a total monthly or project budget is spent on one category (for example, $300 out of $1,200 equals 25%).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 space-y-1.5 sm:col-span-2 lg:col-span-2">
              <h3 className="font-bold text-[#1E293B] text-sm">Comparing Two Values</h3>
              <p className="text-slate-600 leading-relaxed">
                Use Mode 3 to measure the percentage increase or decrease between an initial and final value. For dedicated positive growth, salary raises, and growth multipliers, you can also use <Link to="/tools/percentage-increase-calculator" className="font-semibold text-[#2563EB] hover:underline">Percentage Increase Calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 & 7: Percentage, Percentage Change and Percentage Points + Important Calculation Limitations */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Percentage points distinction and mathematical limitations">
          {/* Percentage vs Percentage Change vs Percentage Points */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F8FF] border border-blue-200/80 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] tracking-tight">
              Percentage, Percentage Change and Percentage Points
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These three terms describe different relationships:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span><strong>Percentage:</strong> Expresses a value out of 100 (Mode 1 and Mode 2).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span><strong>Percentage change:</strong> Compares a final value against an initial baseline value (Mode 3).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                <span><strong>Percentage points:</strong> Describes the simple arithmetic difference between two percentages.</span>
              </li>
            </ul>
            <div className="p-3.5 rounded-xl bg-white border border-blue-200/90 text-xs text-[#1E293B] space-y-1">
              <strong className="block font-bold text-[#2563EB]">Example — A rate changes from 10% to 15%:</strong>
              <div>• Arithmetic difference: <strong>5 percentage points</strong> (15 − 10).</div>
              <div>• Relative percentage increase: <code>((15 − 10) ÷ 10) × 100</code> = <strong>50%</strong>.</div>
              <div className="text-slate-500 pt-0.5">Mode 3 calculates relative percentage change (50%), not a separate percentage-point difference.</div>
            </div>
          </div>

          {/* Important Calculation Limitations */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] tracking-tight flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#F59E0B] shrink-0" />
              <span>Important Calculation Limitations</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                <span><strong>Division by zero UI fallback:</strong> Dividing by zero is mathematically undefined. In Mode 2 (whole value Y) and Mode 3 (Initial Value), the component prevents <code>NaN</code> or <code>Infinity</code> from appearing by displaying <code>0%</code> when the divisor is zero. This is a UI fallback, not a mathematically valid zero percentage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                <span><strong>Signed initial value in Mode 3:</strong> Mode 3 uses the signed initial value directly in its denominator (<code>(Final − Initial) ÷ Initial</code>). Negative starting values therefore behave differently from positive-baseline increase/decrease conventions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                <span><strong>Display rounding &amp; currency symbols:</strong> Results are formatted for display (up to 4 decimals in Mode 1; 2 decimals in Modes 2 and 3), so a rounded display value may differ slightly from the full internal floating-point calculation. Currency symbols are not independently interpreted; the tool performs purely numeric calculations.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
