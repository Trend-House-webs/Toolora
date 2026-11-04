import React, { useState } from 'react';
import { Copy, Check, TrendingUp, RefreshCw, AlertCircle, Sparkles, DollarSign, Tag, ArrowRight } from 'lucide-react';

export function PercentageIncreaseCalc() {
  const [initialVal, setInitialVal] = useState<string>('80');
  const [finalVal, setFinalVal] = useState<string>('120');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const v1 = parseFloat(initialVal);
  const v2 = parseFloat(finalVal);

  const isValid = !isNaN(v1) && !isNaN(v2);
  const isZeroInitial = isValid && v1 === 0;
  const difference = isValid ? v2 - v1 : 0;
  const percentIncrease = isValid && v1 !== 0 ? (difference / Math.abs(v1)) * 100 : 0;
  const multiplier = isValid && v1 !== 0 ? (v2 / v1).toFixed(3) : '0';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReset = () => {
    setInitialVal('');
    setFinalVal('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Quick Scenario Presets */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Common Scenarios:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Numeric Growth (80 → 120)', v1: '80', v2: '120' },
              { label: 'Salary Raise ($65k → $74.75k)', v1: '65000', v2: '74750' },
              { label: 'Price Increase ($40 → $58)', v1: '40', v2: '58' },
              { label: 'Doubling (50 → 100 = 100%)', v1: '50', v2: '100' },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setInitialVal(p.v1);
                  setFinalVal(p.v2);
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
            <label htmlFor="init-val" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Initial / Starting Value (V₁)
            </label>
            <input
              id="init-val"
              type="number"
              step="any"
              value={initialVal}
              onChange={(e) => setInitialVal(e.target.value)}
              placeholder="e.g. 80 or 65000"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
            <p className="text-2xs text-slate-500 mt-1">Starting baseline, original price, or current salary</p>
          </div>

          <div>
            <label htmlFor="final-val" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Final / New Value (V₂)
            </label>
            <input
              id="final-val"
              type="number"
              step="any"
              value={finalVal}
              onChange={(e) => setFinalVal(e.target.value)}
              placeholder="e.g. 120 or 74750"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono focus:bg-white focus:outline-hidden focus:border-blue-500"
            />
            <p className="text-2xs text-slate-500 mt-1">Increased figure, new price, or revised salary</p>
          </div>
        </div>

        {/* Zero Initial Warning */}
        {isZeroInitial && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Division by Zero:</strong> When the initial value is 0, calculating percentage increase is mathematically undefined because dividing by zero has no finite solution.
            </span>
          </div>
        )}

        {/* Result Card */}
        {isValid && !isZeroInitial && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              {percentIncrease >= 0 ? 'Calculated Percentage Increase' : 'Percentage Change (Decrease)'}
            </span>

            <div
              className={`text-4xl sm:text-5xl font-extrabold font-mono ${
                percentIncrease >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {percentIncrease >= 0 ? '+' : ''}
              {percentIncrease.toFixed(2)}%
            </div>

            <p className="text-xs text-slate-600 pt-1">
              Net absolute change:{' '}
              <strong className="font-mono text-slate-800">
                {difference >= 0 ? `+${difference.toLocaleString()}` : difference.toLocaleString()}
              </strong>{' '}
              · Growth factor:{' '}
              <strong className="font-mono text-slate-800">{multiplier}×</strong>
            </p>

            {percentIncrease < 0 && (
              <p className="text-2xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                Notice: The new value is lower than the starting value, representing a decrease of {Math.abs(percentIncrease).toFixed(2)}%. For discounts and markdowns, see our companion Percentage Decrease Calculator.
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `Initial: ${v1}, Final: ${v2} -> Increase: ${percentIncrease >= 0 ? '+' : ''}${percentIncrease.toFixed(2)}% (Diff: ${difference >= 0 ? '+' : ''}${difference})`,
                    'res'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer"
              >
                {copiedKey === 'res' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === 'res' ? 'Copied' : 'Copy Result'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Step-by-Step Mathematical Explanation */}
        {isValid && !isZeroInitial && (
          <div className="p-5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <p className="font-bold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Step-by-Step Calculation Breakdown:
            </p>
            <div className="font-mono text-xs bg-white p-3.5 rounded-lg border border-blue-200 space-y-1 text-slate-800">
              <p>
                1. Find absolute difference: V₂ − V₁ = {v2} − {v1} = <strong>{difference >= 0 ? `+${difference}` : difference}</strong>
              </p>
              <p>
                2. Divide difference by initial: ({difference}) ÷ |{v1}| = <strong>{(difference / Math.abs(v1)).toFixed(4)}</strong>
              </p>
              <p>
                3. Multiply by 100: {(difference / Math.abs(v1)).toFixed(4)} × 100 ={' '}
                <strong className="text-blue-700">{percentIncrease.toFixed(2)}%</strong>
              </p>
              <p>
                4. Growth multiplier: V₂ ÷ V₁ = {v2} ÷ {v1} = <strong>{multiplier}×</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
