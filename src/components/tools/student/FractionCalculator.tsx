import React, { useState } from 'react';
import {
  Plus,
  Minus,
  X,
  Divide,
  RotateCcw,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Scale,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Info,
  Calculator,
} from 'lucide-react';
import { Link } from '../../../context/RouterContext';

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function FractionCalculator() {
  const [activeTab, setActiveTab] = useState<'arithmetic' | 'simplify' | 'compare'>('arithmetic');

  // Mode 1: Arithmetic (+, -, *, /)
  const [num1, setNum1] = useState<number>(3);
  const [den1, setDen1] = useState<number>(4);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [num2, setNum2] = useState<number>(2);
  const [den2, setDen2] = useState<number>(5);

  // Mode 2: Simplify single fraction
  const [simpInputN, setSimpInputN] = useState<number>(24);
  const [simpInputD, setSimpInputD] = useState<number>(36);

  // Mode 3: Compare two fractions
  const [compN1, setCompN1] = useState<number>(3);
  const [compD1, setCompD1] = useState<number>(4);
  const [compN2, setCompN2] = useState<number>(2);
  const [compD2, setCompD2] = useState<number>(5);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // -------------------------------------------------------------
  // Mode 1: Arithmetic Calculation Logic
  // -------------------------------------------------------------
  const isArithZeroDen = den1 === 0 || den2 === 0;
  const isDivideByZero = op === '/' && num2 === 0;

  let rawNum = 0;
  let rawDen = 1;
  let stepText = '';
  let cd = 1;

  if (!isArithZeroDen && !isDivideByZero) {
    if (op === '+') {
      cd = den1 * den2;
      const term1 = num1 * den2;
      const term2 = num2 * den1;
      rawNum = term1 + term2;
      rawDen = cd;
      stepText = `Find common denominator: ${den1} × ${den2} = ${cd}. Convert numerators: (${num1} × ${den2}) + (${num2} × ${den1}) = ${term1} + ${term2} = ${rawNum}. Unsimplified: ${rawNum}/${rawDen}.`;
    } else if (op === '-') {
      cd = den1 * den2;
      const term1 = num1 * den2;
      const term2 = num2 * den1;
      rawNum = term1 - term2;
      rawDen = cd;
      stepText = `Find common denominator: ${den1} × ${den2} = ${cd}. Convert numerators: (${num1} × ${den2}) - (${num2} × ${den1}) = ${term1} - ${term2} = ${rawNum}. Unsimplified: ${rawNum}/${rawDen}.`;
    } else if (op === '*') {
      rawNum = num1 * num2;
      rawDen = den1 * den2;
      stepText = `Multiply numerators: ${num1} × ${num2} = ${rawNum}. Multiply denominators: ${den1} × ${den2} = ${rawDen}. Unsimplified: ${rawNum}/${rawDen}.`;
    } else {
      // Division by reciprocal
      rawNum = num1 * den2;
      rawDen = den1 * num2;
      stepText = `Multiply by reciprocal of second fraction: (${num1}/${den1}) × (${den2}/${num2}) = (${num1} × ${den2}) / (${den1} × ${num2}) = ${rawNum}/${rawDen}.`;
    }

    // Normalize negative signs
    if (rawDen < 0) {
      rawNum = -rawNum;
      rawDen = -rawDen;
    }
  }

  // Prevent -0 in JavaScript display
  if (rawNum === 0) rawNum = 0;

  const arithDivisor = gcd(rawNum, rawDen);
  const simpNum = rawNum / arithDivisor;
  const simpDen = rawDen / arithDivisor;

  const isArithInteger = simpDen === 1;
  const isArithNegative = simpNum < 0;
  const safeArithDen = simpDen || 1;
  const arithWholePart = Math.floor(Math.abs(simpNum) / safeArithDen);
  const arithRemNum = Math.abs(simpNum) % safeArithDen;

  const arithDecimal =
    !isArithZeroDen && !isDivideByZero && simpDen !== 0
      ? (simpNum / simpDen).toFixed(4).replace(/\.?0+$/, '')
      : 'Undefined';

  // -------------------------------------------------------------
  // Mode 2: Simplify Single Fraction Logic
  // -------------------------------------------------------------
  const isSimpZeroDen = simpInputD === 0;
  let singleNum = simpInputN;
  let singleDen = simpInputD;

  if (singleDen < 0) {
    singleNum = -singleNum;
    singleDen = -singleDen;
  }
  if (singleNum === 0) singleNum = 0;

  const singleGcd = !isSimpZeroDen ? gcd(singleNum, singleDen) : 1;
  const reducedSingleNum = !isSimpZeroDen ? singleNum / singleGcd : singleNum;
  const reducedSingleDen = !isSimpZeroDen ? singleDen / singleGcd : 1;

  const isSingleInteger = reducedSingleDen === 1;
  const isSingleNegative = reducedSingleNum < 0;
  const safeReducedDen = reducedSingleDen || 1;
  const singleWholePart = Math.floor(Math.abs(reducedSingleNum) / safeReducedDen);
  const singleRemNum = Math.abs(reducedSingleNum) % safeReducedDen;

  const singleDecimal =
    !isSimpZeroDen && reducedSingleDen !== 0
      ? (reducedSingleNum / reducedSingleDen).toFixed(4).replace(/\.?0+$/, '')
      : 'Undefined';

  // -------------------------------------------------------------
  // Mode 3: Compare Two Fractions Logic
  // -------------------------------------------------------------
  const isCompZeroDen = compD1 === 0 || compD2 === 0;
  let compResult: '>' | '<' | '=' = '=';
  let crossVal1 = 0;
  let crossVal2 = 0;
  let compDec1 = '0';
  let compDec2 = '0';
  let compDiffNum = 0;
  let compDiffDen = 1;
  const compCommonDen = !isCompZeroDen ? Math.abs(compD1 * compD2) : 1;

  if (!isCompZeroDen) {
    // Cross multiplication: compN1 * compD2 vs compN2 * compD1 (accounting for signs)
    const normD1 = compD1 < 0 ? -compD1 : compD1;
    const normN1 = compD1 < 0 ? -compN1 : compN1;
    const normD2 = compD2 < 0 ? -compD2 : compD2;
    const normN2 = compD2 < 0 ? -compN2 : compN2;

    crossVal1 = normN1 * normD2;
    crossVal2 = normN2 * normD1;

    if (crossVal1 > crossVal2) compResult = '>';
    else if (crossVal1 < crossVal2) compResult = '<';
    else compResult = '=';

    compDec1 = (normN1 / normD1).toFixed(4).replace(/\.?0+$/, '');
    compDec2 = (normN2 / normD2).toFixed(4).replace(/\.?0+$/, '');

    // Difference = |F1 - F2|
    const rawDiffN = Math.abs(crossVal1 - crossVal2);
    const rawDiffD = normD1 * normD2;
    const diffDivisor = gcd(rawDiffN, rawDiffD);
    compDiffNum = rawDiffN / diffDivisor;
    compDiffDen = rawDiffD / diffDivisor;
  }

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Header and Mode Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Fraction Calculator with Steps</h2>
          <p className="text-sm text-slate-500 mt-1">
            Add, subtract, multiply, divide, simplify, and compare fractions with step-by-step solutions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('arithmetic')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'arithmetic' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Arithmetic (+, −, ×, ÷)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('simplify')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'simplify' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Simplify Fraction
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'compare' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Compare Fractions
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ARITHMETIC OPERATIONS                              */}
      {/* ========================================================= */}
      {activeTab === 'arithmetic' && (
        <div className="space-y-6">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quick Examples:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '3/4 + 2/5 (Textbook Example)', n1: 3, d1: 4, o: '+', n2: 2, d2: 5 },
                { label: '1/2 + 1/4', n1: 1, d1: 2, o: '+', n2: 1, d2: 4 },
                { label: '5/6 - 1/3', n1: 5, d1: 6, o: '-', n2: 1, d2: 3 },
                { label: '2/3 × 3/4', n1: 2, d1: 3, o: '*', n2: 3, d2: 4 },
                { label: '7/8 ÷ 1/2', n1: 7, d1: 8, o: '/', n2: 1, d2: 2 },
              ].map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => {
                    setNum1(ex.n1);
                    setDen1(ex.d1);
                    setOp(ex.o as any);
                    setNum2(ex.n2);
                    setDen2(ex.d2);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {ex.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setNum1(3);
                  setDen1(4);
                  setOp('+');
                  setNum2(2);
                  setDen2(5);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer ml-1"
                title="Reset to default"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Interactive Fraction Inputs & Operator */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center w-24">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Fraction 1</span>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value) || 0)}
                aria-label="Fraction 1 Numerator"
                className="w-full text-center px-2 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg focus:border-blue-500 focus:outline-hidden bg-white"
              />
              <div className="w-full h-0.5 bg-slate-400 my-2" />
              <input
                type="number"
                value={den1}
                onChange={(e) => setDen1(Number(e.target.value))}
                aria-label="Fraction 1 Denominator"
                className={`w-full text-center px-2 py-2 rounded-xl border font-bold text-lg focus:outline-hidden bg-white ${
                  den1 === 0 ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Operators */}
            <div className="flex flex-col gap-1.5 items-center">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Operator</span>
              <div className="flex gap-1.5">
                {[
                  { sign: '+', icon: Plus, label: 'Add Fractions (+)' },
                  { sign: '-', icon: Minus, label: 'Subtract Fractions (−)' },
                  { sign: '*', icon: X, label: 'Multiply Fractions (×)' },
                  { sign: '/', icon: Divide, label: 'Divide Fractions (÷)' },
                ].map(({ sign, icon: Icon, label }) => (
                  <button
                    key={sign}
                    type="button"
                    onClick={() => setOp(sign as any)}
                    aria-label={label}
                    title={label}
                    className={`p-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                      op === sign
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Fraction 2 */}
            <div className="flex flex-col items-center w-24">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Fraction 2</span>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value) || 0)}
                aria-label="Fraction 2 Numerator"
                className="w-full text-center px-2 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg focus:border-blue-500 focus:outline-hidden bg-white"
              />
              <div className="w-full h-0.5 bg-slate-400 my-2" />
              <input
                type="number"
                value={den2}
                onChange={(e) => setDen2(Number(e.target.value))}
                aria-label="Fraction 2 Denominator"
                className={`w-full text-center px-2 py-2 rounded-xl border font-bold text-lg focus:outline-hidden bg-white ${
                  den2 === 0 ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            <span className="text-2xl font-bold text-slate-400">=</span>

            {/* Result Visual Representation */}
            {!isArithZeroDen && !isDivideByZero ? (
              <div className="flex flex-col items-center min-w-20 p-2 bg-blue-50/50 rounded-xl border border-blue-200">
                <span className="text-2xs font-bold text-blue-700 uppercase">Result</span>
                {isArithInteger ? (
                  <div className="font-extrabold text-blue-900 text-3xl py-2">{simpNum}</div>
                ) : (
                  <>
                    <div className="font-extrabold text-blue-900 text-2xl px-2">{simpNum}</div>
                    <div className="w-full h-1 bg-blue-600 my-1 rounded-full" />
                    <div className="font-extrabold text-blue-900 text-2xl px-2">{simpDen}</div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold">
                {isDivideByZero ? 'Division by Zero (Undefined)' : 'Invalid Denominator (0)'}
              </div>
            )}
          </div>

          {/* Validation Warnings */}
          {isArithZeroDen && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span><strong>Division by Zero Error:</strong> A denominator cannot equal 0. Please enter non-zero denominators.</span>
            </div>
          )}
          {isDivideByZero && !isArithZeroDen && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span><strong>Division by Zero Error:</strong> Dividing by a fraction equal to 0 (0/{den2} = 0) is mathematically undefined because the inverted divisor would have a denominator of zero.</span>
            </div>
          )}

          {/* Solution Overview Card */}
          {!isArithZeroDen && !isDivideByZero && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Simplest Fraction
                    </span>
                    <div className="text-3xl font-extrabold text-blue-900 mt-1 font-mono">
                      {isArithInteger ? simpNum : `${simpNum} / ${simpDen}`}
                    </div>
                    <p className="text-2xs text-blue-700/80 mt-1">
                      {arithDivisor > 1
                        ? `Reduced by factor of ${arithDivisor} (GCD)`
                        : 'Already in lowest terms (GCD = 1)'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Mixed Number
                    </span>
                    <div className="text-3xl font-extrabold text-slate-800 mt-1 font-mono">
                      {isArithInteger
                        ? `${simpNum}`
                        : arithWholePart > 0 && arithRemNum > 0
                        ? `${isArithNegative ? '-' : ''}${arithWholePart} ${arithRemNum}/${simpDen}`
                        : `${simpNum}/${simpDen}`}
                    </div>
                    <p className="text-2xs text-slate-500 mt-1">
                      {arithWholePart > 0 && arithRemNum > 0 ? 'Integer and proper fraction' : 'Standard fraction format'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Decimal Approximation
                    </span>
                    <div className="text-3xl font-extrabold text-slate-800 mt-1 font-mono">
                      {arithDecimal}
                    </div>
                    <p className="text-2xs text-slate-500 mt-1">
                      {isArithInteger || (simpNum / simpDen).toFixed(4).endsWith('0000') || (simpNum / simpDen).toString().length <= 6
                        ? 'Exact decimal value'
                        : 'Rounded to 4 decimal places'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-xs text-slate-700 font-mono font-medium">
                    {num1}/{den1} {op} {num2}/{den2} = {isArithInteger ? simpNum : `${simpNum}/${simpDen}`}
                    {arithWholePart > 0 && arithRemNum > 0 && !isArithInteger
                      ? ` = ${isArithNegative ? '-' : ''}${arithWholePart} ${arithRemNum}/${simpDen}`
                      : ''}{' '}
                    (≈ {arithDecimal})
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `${num1}/${den1} ${op} ${num2}/${den2} = ${isArithInteger ? simpNum : `${simpNum}/${simpDen}`}${arithWholePart > 0 && arithRemNum > 0 && !isArithInteger ? ` = ${isArithNegative ? '-' : ''}${arithWholePart} ${arithRemNum}/${simpDen}` : ''} (≈ ${arithDecimal})`,
                        'arith'
                      )
                    }
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs"
                  >
                    {copiedKey === 'arith' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'arith' ? 'Copied Equation' : 'Copy Solution'}
                  </button>
                </div>
              </div>

              {/* Step by Step Explanation */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Step-by-Step Mathematical Working
                </h4>
                <p className="text-slate-700 leading-relaxed font-mono bg-white p-3 rounded-lg border border-slate-200">
                  {stepText}
                </p>
                <p className="text-slate-600 text-xs">
                  Unsimplified fraction is <span className="font-mono font-bold text-slate-800">{rawNum} / {rawDen}</span>.
                  Dividing numerator and denominator by the Greatest Common Divisor (GCD = {arithDivisor}) produces the simplest form{' '}
                  <span className="font-mono font-bold text-blue-700">{isArithInteger ? simpNum : `${simpNum} / ${simpDen}`}</span>.
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SIMPLIFY SINGLE FRACTION                           */}
      {/* ========================================================= */}
      {activeTab === 'simplify' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quick Examples:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '24 / 36 (Common Test Question)', n: 24, d: 36 },
                { label: '18 / 4 (Mixed Number)', n: 18, d: 4 },
                { label: '75 / 100 (Percents)', n: 75, d: 100 },
                { label: '12 / 6 (Integer Result)', n: 12, d: 6 },
                { label: '60 / 144 (Large GCD)', n: 60, d: 144 },
              ].map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => {
                    setSimpInputN(ex.n);
                    setSimpInputD(ex.d);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-center gap-6">
            <div className="flex flex-col items-center w-28">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Numerator</span>
              <input
                type="number"
                value={simpInputN}
                onChange={(e) => setSimpInputN(Number(e.target.value) || 0)}
                aria-label="Numerator to simplify"
                className="w-full text-center px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 text-xl focus:border-blue-500 focus:outline-hidden bg-white"
              />
              <div className="w-full h-1 bg-slate-400 my-2.5 rounded-full" />
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Denominator</span>
              <input
                type="number"
                value={simpInputD}
                onChange={(e) => setSimpInputD(Number(e.target.value))}
                aria-label="Denominator to simplify"
                className={`w-full text-center px-3 py-2.5 rounded-xl border font-bold text-xl focus:outline-hidden bg-white ${
                  simpInputD === 0 ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            <span className="text-3xl font-bold text-slate-400">=</span>

            {!isSimpZeroDen ? (
              <div className="flex flex-col items-center min-w-28 p-4 bg-blue-50/70 rounded-2xl border border-blue-200">
                <span className="text-xs font-bold text-blue-700 uppercase mb-1">Reduced Form</span>
                {isSingleInteger ? (
                  <div className="font-extrabold text-blue-900 text-4xl py-2">{reducedSingleNum}</div>
                ) : (
                  <>
                    <div className="font-extrabold text-blue-900 text-3xl px-3">{reducedSingleNum}</div>
                    <div className="w-full h-1 bg-blue-600 my-1.5 rounded-full" />
                    <div className="font-extrabold text-blue-900 text-3xl px-3">{reducedSingleDen}</div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-semibold">
                Denominator cannot be 0
              </div>
            )}
          </div>

          {!isSimpZeroDen && (
            <>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                  <div>
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                      Simplest Fraction
                    </span>
                    <div className="text-3xl font-extrabold text-blue-900 mt-1 font-mono">
                      {isSingleInteger ? reducedSingleNum : `${reducedSingleNum} / ${reducedSingleDen}`}
                    </div>
                    <p className="text-2xs text-blue-700/80 mt-1">
                      Greatest Common Divisor (GCD) = {singleGcd}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Mixed Number
                    </span>
                    <div className="text-3xl font-extrabold text-slate-800 mt-1 font-mono">
                      {isSingleInteger
                        ? `${reducedSingleNum}`
                        : singleWholePart > 0 && singleRemNum > 0
                        ? `${isSingleNegative ? '-' : ''}${singleWholePart} ${singleRemNum}/${reducedSingleDen}`
                        : `${reducedSingleNum}/${reducedSingleDen}`}
                    </div>
                    <p className="text-2xs text-slate-500 mt-1">
                      {singleWholePart > 0 && singleRemNum > 0 ? 'Whole and fractional remainder' : 'Proper fraction'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Decimal Approximation
                    </span>
                    <div className="text-3xl font-extrabold text-slate-800 mt-1 font-mono">
                      {singleDecimal}
                    </div>
                    <p className="text-2xs text-slate-500 mt-1">
                      {isSingleInteger || (reducedSingleNum / reducedSingleDen).toFixed(4).endsWith('0000') || (reducedSingleNum / reducedSingleDen).toString().length <= 6
                        ? 'Exact decimal value'
                        : 'Rounded to 4 decimal places'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200/60 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-xs text-slate-700 font-mono">
                    {simpInputN}/{simpInputD} simplifies to {isSingleInteger ? reducedSingleNum : `${reducedSingleNum}/${reducedSingleDen}`}
                    {singleWholePart > 0 && singleRemNum > 0 && !isSingleInteger
                      ? ` = ${isSingleNegative ? '-' : ''}${singleWholePart} ${singleRemNum}/${reducedSingleDen}`
                      : ''}{' '}
                    (≈ {singleDecimal})
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `${simpInputN}/${simpInputD} = ${isSingleInteger ? reducedSingleNum : `${reducedSingleNum}/${reducedSingleDen}`}${singleWholePart > 0 && singleRemNum > 0 && !isSingleInteger ? ` = ${isSingleNegative ? '-' : ''}${singleWholePart} ${singleRemNum}/${reducedSingleDen}` : ''} (≈ ${singleDecimal})`,
                        'simp'
                      )
                    }
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs"
                  >
                    {copiedKey === 'simp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'simp' ? 'Copied' : 'Copy Simplified Fraction'}
                  </button>
                </div>
              </div>

              {/* Step by step reduction */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">
                  How This Fraction Was Simplified Step-by-Step
                </h4>
                <div className="font-mono text-xs bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-slate-800">
                  <p>1. Find GCD: The Greatest Common Divisor of {Math.abs(singleNum)} and {Math.abs(singleDen)} is <strong>{singleGcd}</strong>.</p>
                  <p>2. Divide numerator: {singleNum} ÷ {singleGcd} = <strong>{reducedSingleNum}</strong>.</p>
                  <p>3. Divide denominator: {singleDen} ÷ {singleGcd} = <strong>{reducedSingleDen}</strong>.</p>
                  <p>4. Result: <strong>{isSingleInteger ? reducedSingleNum : `${reducedSingleNum} / ${reducedSingleDen}`}</strong>.</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: COMPARE TWO FRACTIONS                              */}
      {/* ========================================================= */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quick Comparisons:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '3/4 vs 2/5 (Textbook Example)', n1: 3, d1: 4, n2: 2, d2: 5 },
                { label: '5/8 vs 7/12', n1: 5, d1: 8, n2: 7, d2: 12 },
                { label: '2/3 vs 4/6 (Equivalent =)', n1: 2, d1: 3, n2: 4, d2: 6 },
                { label: '7/9 vs 8/10', n1: 7, d1: 9, n2: 8, d2: 10 },
              ].map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => {
                    setCompN1(ex.n1);
                    setCompD1(ex.d1);
                    setCompN2(ex.n2);
                    setCompD2(ex.d2);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200 cursor-pointer transition-colors"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Comparison Controls */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-center gap-6">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center w-24">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Fraction 1</span>
              <input
                type="number"
                value={compN1}
                onChange={(e) => setCompN1(Number(e.target.value) || 0)}
                aria-label="Fraction 1 Numerator"
                className="w-full text-center px-2 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg bg-white"
              />
              <div className="w-full h-0.5 bg-slate-400 my-2" />
              <input
                type="number"
                value={compD1}
                onChange={(e) => setCompD1(Number(e.target.value))}
                aria-label="Fraction 1 Denominator"
                className={`w-full text-center px-2 py-2 rounded-xl border font-bold text-lg bg-white ${
                  compD1 === 0 ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800'
                }`}
              />
            </div>

            {/* Comparison Operator Display */}
            {!isCompZeroDen ? (
              <div className="flex flex-col items-center px-4 py-2 bg-blue-100/70 border border-blue-200 rounded-2xl">
                <span className="text-3xs font-bold text-blue-700 uppercase tracking-widest">Comparison</span>
                <span className="text-3xl font-black text-blue-900 font-mono my-1">{compResult}</span>
                <span className="text-2xs font-semibold text-blue-700">
                  {compResult === '>' ? 'Greater Than' : compResult === '<' ? 'Less Than' : 'Equal'}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-slate-400">vs</span>
            )}

            {/* Fraction 2 */}
            <div className="flex flex-col items-center w-24">
              <span className="text-2xs font-semibold text-slate-400 uppercase mb-1">Fraction 2</span>
              <input
                type="number"
                value={compN2}
                onChange={(e) => setCompN2(Number(e.target.value) || 0)}
                aria-label="Fraction 2 Numerator"
                className="w-full text-center px-2 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-lg bg-white"
              />
              <div className="w-full h-0.5 bg-slate-400 my-2" />
              <input
                type="number"
                value={compD2}
                onChange={(e) => setCompD2(Number(e.target.value))}
                aria-label="Fraction 2 Denominator"
                className={`w-full text-center px-2 py-2 rounded-xl border font-bold text-lg bg-white ${
                  compD2 === 0 ? 'border-red-500 text-red-600' : 'border-slate-300 text-slate-800'
                }`}
              />
            </div>
          </div>

          {!isCompZeroDen && (
            <div className="space-y-4">
              {/* Comparison Verdict Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Comparison Conclusion
                  </span>
                  <div className="text-3xl font-extrabold text-blue-900 mt-1">
                    {compN1}/{compD1} {compResult} {compN2}/{compD2}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Fraction 1 ({compDec1}) is{' '}
                    <strong>
                      {compResult === '>' ? 'greater than' : compResult === '<' ? 'less than' : 'equal to'}
                    </strong>{' '}
                    Fraction 2 ({compDec2}).
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Absolute Difference
                  </span>
                  <div className="text-2xl font-bold font-mono text-slate-800 mt-1">
                    {compDiffNum}/{compDiffDen}
                  </div>
                  <p className="text-2xs text-slate-500">
                    Decimal gap: ≈ {Math.abs(parseFloat(compDec1) - parseFloat(compDec2)).toFixed(4).replace(/\.?0+$/, '')}
                  </p>
                </div>
              </div>

              {/* Comparison Step Breakdown */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs">
                  Two Ways to Verify This Comparison
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Method 1: Cross Multiplication */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-blue-900 text-xs block">Method 1: Cross-Multiplication</span>
                    <p className="text-slate-600 text-xs">
                      Multiply the numerator of each fraction by the denominator of the other:
                    </p>
                    <p className="font-mono text-xs bg-slate-50 p-2 rounded border border-slate-200 text-slate-800">
                      • {compN1} × {compD2} = <strong>{crossVal1}</strong> (Fraction 1 value)
                      <br />
                      • {compN2} × {compD1} = <strong>{crossVal2}</strong> (Fraction 2 value)
                    </p>
                    <p className="text-slate-600 text-xs">
                      Since {crossVal1} {compResult} {crossVal2}, {compN1}/{compD1} {compResult} {compN2}/{compD2}.
                    </p>
                  </div>

                  {/* Method 2: Common Denominators */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="font-bold text-blue-900 text-xs block">Method 2: Common Denominator</span>
                    <p className="text-slate-600 text-xs">
                      Convert both fractions to common denominator ({compCommonDen}):
                    </p>
                    <p className="font-mono text-xs bg-slate-50 p-2 rounded border border-slate-200 text-slate-800">
                      • {compN1}/{compD1} = <strong>{crossVal1}/{compCommonDen}</strong>
                      <br />
                      • {compN2}/{compD2} = <strong>{crossVal2}/{compCommonDen}</strong>
                    </p>
                    <p className="text-slate-600 text-xs">
                      Comparing numerators {crossVal1} vs {crossVal2} confirms {compN1}/{compD1} {compResult} {compN2}/{compD2}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/* SECTION 1: HOW TO CALCULATE FRACTIONS: STEP-BY-STEP MATHEMATICAL GUIDE */}
      <section aria-labelledby="fraction-guide-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 id="fraction-guide-heading" className="text-lg font-bold text-slate-900">
              How to Calculate Fractions: Step-by-Step Mathematical Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Clear formulas, procedural breakdowns, and verified solutions for everyday fraction operations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example 1: Addition */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">1. Adding Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">1/2 + 1/3 = 5/6</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              To add fractions with different denominators, first convert them to equivalent fractions with a common denominator (LCM), add the numerators, and reduce.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Formula:</strong> (a/b) + (c/d) = (a·d + b·c) / (b·d)</div>
              <div>• Denominators: LCM(2, 3) = 6</div>
              <div>• Equivalents: 1/2 = 3/6 and 1/3 = 2/6</div>
              <div>• Add numerators: (3 + 2) / 6 = <strong>5/6</strong></div>
              <div>• Simplest form: 5/6 (GCD = 1, Decimal ≈ 0.8333)</div>
            </div>
          </div>

          {/* Example 2: Subtraction */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">2. Subtracting Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">3/4 − 1/2 = 1/4</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find a common denominator, convert both terms, subtract the second numerator from the first, and simplify the difference.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Formula:</strong> (a/b) − (c/d) = (a·d − b·c) / (b·d)</div>
              <div>• Denominators: LCM(4, 2) = 4</div>
              <div>• Equivalents: 3/4 = 3/4 and 1/2 = 2/4</div>
              <div>• Subtract numerators: (3 − 2) / 4 = <strong>1/4</strong></div>
              <div>• Simplest form: 1/4 (GCD = 1, Decimal = 0.25)</div>
            </div>
          </div>

          {/* Example 3: Multiplication */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">3. Multiplying Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">2/3 × 3/4 = 1/2</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiplying fractions is straightforward: multiply the numerators straight across, multiply denominators straight across, then reduce the resulting fraction.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Formula:</strong> (a/b) × (c/d) = (a·c) / (b·d)</div>
              <div>• Multiply numerators: 2 × 3 = 6</div>
              <div>• Multiply denominators: 3 × 4 = 12</div>
              <div>• Raw product: 6/12</div>
              <div>• Reduce by GCD(6, 12) = 6: (6÷6)/(12÷6) = <strong>1/2</strong></div>
            </div>
          </div>

          {/* Example 4: Division */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">4. Dividing Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">3/4 ÷ 2/3 = 1 1/8</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Divide by multiplying the dividend by the reciprocal (flipped version) of the divisor fraction.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Formula:</strong> (a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) / (b·c)</div>
              <div>• Invert divisor: 2/3 becomes 3/2</div>
              <div>• Multiply straight across: (3 × 3) / (4 × 2) = 9/8</div>
              <div>• Improper fraction to mixed number: 9 ÷ 8 = <strong>1 1/8</strong></div>
              <div>• Decimal approximation: 1.125</div>
            </div>
          </div>

          {/* Example 5: Simplification */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">5. Simplifying Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">18/24 = 3/4</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A fraction is in simplest form when its numerator and denominator share no common factors other than 1. Find the Greatest Common Divisor (GCD) and divide both terms.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Formula:</strong> (a ÷ GCD(a, b)) / (b ÷ GCD(a, b))</div>
              <div>• Divisors of 18: 1, 2, 3, 6, 9, 18</div>
              <div>• Divisors of 24: 1, 2, 3, 4, 6, 8, 12, 24</div>
              <div>• Greatest Common Divisor: GCD(18, 24) = 6</div>
              <div>• Divide both terms: (18÷6) / (24÷6) = <strong>3/4</strong></div>
            </div>
          </div>

          {/* Example 6: Comparison */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">6. Comparing Fractions</span>
              <span className="text-2xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">3/4 &gt; 2/5</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare fractions quickly using cross-multiplication or by converting both fractions to a common denominator.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
              <div><strong>Method 1 (Cross-Multiply):</strong> 3 × 5 = 15 vs 2 × 4 = 8</div>
              <div>• Since 15 &gt; 8, <strong>3/4 &gt; 2/5</strong></div>
              <div><strong>Method 2 (Common Denominator):</strong> LCD = 20</div>
              <div>• 3/4 = 15/20 and 2/5 = 8/20 (15 &gt; 8)</div>
              <div>• Absolute difference: 7/20 (Decimal gap: 0.35)</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: UNDERSTANDING THE THREE CALCULATOR MODES */}
      <section aria-labelledby="modes-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Calculator className="w-5 h-5 text-indigo-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 id="modes-heading" className="text-lg font-bold text-slate-900">
              Understanding the Three Calculator Modes
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Switch between dedicated modes tailored to specific homework, recipe scaling, or carpentry problems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Arithmetic Mode (+, −, ×, ÷)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perform two-fraction arithmetic with addition, subtraction, multiplication, and division. Generates the raw unreduced fraction, Greatest Common Divisor, reduced proper fraction, clean mixed number (when numerator exceeds denominator), and decimal approximation with one-click copy.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Simplify Fraction Mode</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reduce any single fraction to its simplest lowest terms using Euclid&apos;s GCD algorithm. Handles positive and negative numbers, separates integer factors, flags already simplified fractions, and converts improper fractions to mixed numbers automatically.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Compare Fractions Mode</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Determine which fraction is larger, smaller, or if both are equal. Displays both the cross-multiplication method and common-denominator method side-by-side, along with the exact fractional difference and decimal gap.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: INPUT RULES, DECIMAL ACCURACY & BOUNDARIES */}
      <section aria-labelledby="rules-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Info className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 id="rules-heading" className="text-lg font-bold text-slate-900">
              Supported Input Formats, Decimal Accuracy & Boundaries
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Input requirements, sign conventions, precision guarantees, and edge case handling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Separate Integer Fields</span>
            <p className="text-slate-600 leading-relaxed">
              Enter whole integers into dedicated numerator and denominator boxes. Avoid typing slashes (&quot;/&quot;) or decimal points directly into the integer inputs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Negative Sign Normalization</span>
            <p className="text-slate-600 leading-relaxed">
              Negative integers are fully supported. Entering a negative denominator (such as 3 / -4) is automatically normalized to -3 / 4 to maintain standard mathematical formatting.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Zero Denominator Prevention</span>
            <p className="text-slate-600 leading-relaxed">
              A denominator of zero is mathematically undefined. The calculator disables evaluation, highlights zero denominator inputs in red, and presents an informative warning alert.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Division by Zero Detection</span>
            <p className="text-slate-600 leading-relaxed">
              Dividing by a zero fraction (such as a/b ÷ 0/d) is undefined because inverting the divisor yields a zero denominator. The calculator detects this and alerts the user.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Exact Fractions vs. Decimals</span>
            <p className="text-slate-600 leading-relaxed">
              Repeating decimals (e.g., 1/3 ≈ 0.3333) lose infinite precision when converted. Toolora preserves the exact integer fraction while providing a 4-decimal place approximation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
            <span className="font-bold text-slate-800 block">Safe Integer Precision</span>
            <p className="text-slate-600 leading-relaxed">
              Calculations are executed within JavaScript&apos;s safe integer limits (up to 9,007,199,254,740,991), preventing floating-point inaccuracies for academic and vocational tasks.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONNECTED MATH & STUDENT TOOLS */}
      <section aria-labelledby="connected-tools-heading" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 id="connected-tools-heading" className="text-lg font-bold text-slate-900">
              Connected Math & Student Tools
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore complementary calculators for proportions, statistics, percentages, and scientific formulas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/tools/ratio-calculator"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all group"
          >
            <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 block">
              Ratio Calculator
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Solve proportions (A : B = C : D) and simplify screen, gear, and aspect ratios.
            </p>
          </Link>

          <Link
            to="/tools/scientific-calculator"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all group"
          >
            <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 block">
              Scientific Calculator
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Evaluate trigonometry, logarithms, roots, exponents, and multi-step expressions.
            </p>
          </Link>

          <Link
            to="/tools/percentage-calculator"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all group"
          >
            <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 block">
              Percentage Calculator
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Calculate percentage change, discounts, markups, and fraction-to-percent conversions.
            </p>
          </Link>

          <Link
            to="/tools/average-calculator"
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all group"
          >
            <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 block">
              Average Calculator
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Compute arithmetic mean, median, mode, and range for homework and research data.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
