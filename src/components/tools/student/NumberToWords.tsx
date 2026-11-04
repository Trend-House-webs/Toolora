import React, { useState } from 'react';
import { Copy, Check, Hash, DollarSign, Globe2, Info, ArrowRightLeft } from 'lucide-react';

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const SCALES_WESTERN = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'];

function convertUnderThousand(num: number): string {
  if (num === 0) return '';
  if (num < 20) return ONES[num];
  if (num < 100) {
    const rem = num % 10;
    return TENS[Math.floor(num / 10)] + (rem ? '-' + ONES[rem] : '');
  }
  const rem = num % 100;
  return ONES[Math.floor(num / 100)] + ' hundred' + (rem ? ' and ' + convertUnderThousand(rem) : '');
}

function numberToWesternWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'negative ' + numberToWesternWords(-num);

  const parts: string[] = [];
  let scaleIndex = 0;
  let remaining = Math.floor(num);

  while (remaining > 0 && scaleIndex < SCALES_WESTERN.length) {
    const chunk = remaining % 1000;
    if (chunk !== 0) {
      const chunkStr = convertUnderThousand(chunk);
      const scaleStr = SCALES_WESTERN[scaleIndex];
      parts.unshift(scaleStr ? `${chunkStr} ${scaleStr}` : chunkStr);
    }
    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  return parts.join(' ').trim() || 'zero';
}

function convertDecimalToWords(decStr: string): string {
  if (!decStr) return '';
  const digits = decStr.split('').map((d) => ONES[parseInt(d, 10)] || 'zero');
  return 'point ' + digits.join(' ');
}

// Indian numbering (Lakhs and Crores)
function numberToIndianWords(num: number): string {
  if (num === 0) return 'zero';
  if (num < 0) return 'negative ' + numberToIndianWords(-num);

  let n = Math.floor(num);
  const parts: string[] = [];

  const hundred = n % 1000;
  if (hundred !== 0) {
    parts.unshift(convertUnderThousand(hundred));
  }
  n = Math.floor(n / 1000);

  const thousand = n % 100;
  if (thousand !== 0) {
    parts.unshift(`${convertUnderThousand(thousand)} thousand`);
  }
  n = Math.floor(n / 100);

  const lakh = n % 100;
  if (lakh !== 0) {
    parts.unshift(`${convertUnderThousand(lakh)} lakh`);
  }
  n = Math.floor(n / 100);

  const crore = n;
  if (crore !== 0) {
    parts.unshift(`${numberToWesternWords(crore)} crore`);
  }

  return parts.join(' ').trim() || 'zero';
}

type CurrencyType = 'USD' | 'INR' | 'EUR' | 'GBP' | 'GENERIC';

export function NumberToWords() {
  const [inputVal, setInputVal] = useState<string>('2450.50');
  const [caseFormat, setCaseFormat] = useState<'title' | 'upper' | 'lower'>('title');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>('USD');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const numVal = parseFloat(inputVal) || 0;
  const parts = inputVal.split('.');
  const integerPart = Math.abs(parseInt(parts[0] || '0', 10));
  const decimalDigits = parts[1] || '';

  // 1. Standard Western Words
  const westernBase = numberToWesternWords(integerPart);
  const westernDecimal = decimalDigits ? ' ' + convertDecimalToWords(decimalDigits) : '';
  const standardResult = (numVal < 0 ? 'negative ' : '') + westernBase + westernDecimal;

  // 2. Indian Lakh / Crore Format
  const indianBase = numberToIndianWords(integerPart);
  const indianResult = (numVal < 0 ? 'negative ' : '') + indianBase + westernDecimal;

  // 3. Currency / Amount in Words formatting
  const cents = decimalDigits ? parseInt(decimalDigits.slice(0, 2).padEnd(2, '0'), 10) : 0;
  let currencyResult = '';

  if (selectedCurrency === 'USD') {
    currencyResult = `${westernBase} dollars and ${cents}/100 cents`;
  } else if (selectedCurrency === 'INR') {
    // Rupee formatting uses Indian lakh/crore grouping
    const paiseText = cents > 0 ? ` and ${convertUnderThousand(cents)} paise` : '';
    currencyResult = `${indianBase} rupees${paiseText} only`;
  } else if (selectedCurrency === 'EUR') {
    currencyResult = `${westernBase} euros and ${cents}/100 cents`;
  } else if (selectedCurrency === 'GBP') {
    const penceText = cents > 0 ? ` and ${convertUnderThousand(cents)} pence` : '';
    currencyResult = `${westernBase} pounds${penceText}`;
  } else {
    currencyResult = `${westernBase} units and ${cents}/100`;
  }

  const applyCase = (str: string) => {
    if (caseFormat === 'upper') return str.toUpperCase();
    if (caseFormat === 'lower') return str.toLowerCase();
    // Title Case
    return str.replace(/\b[a-z]/g, (c) => c.toUpperCase());
  };

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Number to Words Converter</h2>
          <p className="text-sm text-slate-500 mt-1">
            Convert numbers into words for international documents, bank checks, and Indian lakhs/crores.
          </p>
        </div>

        {/* Case Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
          {(['title', 'upper', 'lower'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setCaseFormat(fmt)}
              className={`px-2.5 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                caseFormat === fmt ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              {fmt} Case
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
          Enter Any Numeric Figure
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.replace(/[^0-9.-]/g, ''))}
            placeholder="e.g. 1500000 or 2450.50"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg font-mono font-bold text-slate-900 focus:outline-hidden focus:border-blue-500 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {[
            { label: '1,000 (Thousand)', val: '1000' },
            { label: '100,000 (1 Lakh)', val: '100000' },
            { label: '1,500,000 (1.5M / 15 Lakh)', val: '1500000' },
            { label: '10,000,000 (10M / 1 Crore)', val: '10000000' },
            { label: '2,450.50 (Check Amount)', val: '2450.50' },
          ].map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => setInputVal(preset.val)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium border border-slate-200 cursor-pointer transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Outputs */}
      <div className="space-y-4">
        {/* Output 1: Standard Western International Words */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wide flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              Standard Western International (Thousands, Millions, Billions)
            </span>
            <button
              type="button"
              onClick={() => copyVal(applyCase(standardResult), 'standard')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs"
            >
              {copiedKey === 'standard' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'standard' ? 'Copied' : 'Copy Words'}
            </button>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
            {applyCase(standardResult)}
          </p>
          <span className="text-2xs text-blue-600/80 block mt-1">
            Groups by 10³: thousands, millions, billions, trillions
          </span>
        </div>

        {/* Output 2: South Asian / Indian System (Lakhs & Crores) */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-600" />
              Indian Numbering System (Lakhs & Crores)
            </span>
            <button
              type="button"
              onClick={() => copyVal(applyCase(indianResult), 'indian')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
            >
              {copiedKey === 'indian' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'indian' ? 'Copied' : 'Copy Indian Words'}
            </button>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
            {applyCase(indianResult)}
          </p>
          <span className="text-2xs text-slate-500 block mt-1">
            Groups by thousands (10³), lakhs (10⁵), and crores (10⁷)
          </span>
        </div>

        {/* Output 3: Currency & Bank Check Writing Format */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Amount in Words & Check Writing Currency Format
            </span>

            {/* Currency selector */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-200/80 rounded-lg text-2xs font-semibold">
              {[
                { code: 'USD', label: 'USD ($)' },
                { code: 'INR', label: 'INR (₹ Rupees)' },
                { code: 'EUR', label: 'EUR (€)' },
                { code: 'GBP', label: 'GBP (£)' },
                { code: 'GENERIC', label: 'Generic' },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedCurrency(c.code as CurrencyType)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    selectedCurrency === c.code
                      ? 'bg-white text-emerald-700 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed font-sans">
            {applyCase(currencyResult)}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
            <span className="text-2xs text-slate-500">
              {selectedCurrency === 'INR'
                ? 'Formatted using Indian numbering (Rupees & Paise) for cheques and vouchers.'
                : 'Formatted for paper checks, invoices, and legal payment lines.'}
            </span>
            <button
              type="button"
              onClick={() => copyVal(applyCase(currencyResult), 'currency')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
            >
              {copiedKey === 'currency' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'currency' ? 'Copied' : 'Copy Amount in Words'}
            </button>
          </div>
        </div>
      </div>

      {/* Western vs Indian Numbering System Comparison Guide */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
        <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" /> Western vs. Indian Numbering System Reference
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-2xs">
            <thead className="border-b border-slate-200 text-slate-500 uppercase">
              <tr>
                <th className="py-1 px-2">Numeric Digits</th>
                <th className="py-1 px-2">Western Notation</th>
                <th className="py-1 px-2">Indian Notation</th>
                <th className="py-1 px-2">Scientific Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-1.5 px-2 font-bold text-slate-900">100,000</td>
                <td className="py-1.5 px-2">One Hundred Thousand</td>
                <td className="py-1.5 px-2 text-indigo-700 font-semibold">One Lakh</td>
                <td className="py-1.5 px-2">10⁵</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-slate-900">1,000,000</td>
                <td className="py-1.5 px-2">One Million</td>
                <td className="py-1.5 px-2 text-indigo-700 font-semibold">Ten Lakh</td>
                <td className="py-1.5 px-2">10⁶</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-slate-900">10,000,000</td>
                <td className="py-1.5 px-2">Ten Million</td>
                <td className="py-1.5 px-2 text-indigo-700 font-semibold">One Crore</td>
                <td className="py-1.5 px-2">10⁷</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-slate-900">1,000,000,000</td>
                <td className="py-1.5 px-2">One Billion</td>
                <td className="py-1.5 px-2 text-indigo-700 font-semibold">One Hundred Crore (Arab)</td>
                <td className="py-1.5 px-2">10⁹</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
