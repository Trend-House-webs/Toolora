import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Target, CheckCircle2, AlertTriangle, HelpCircle, Sparkles, TrendingUp } from 'lucide-react';

interface GradeRow {
  id: string;
  name: string;
  grade: number; // percentage
  weight: number; // percentage
}

export function GradeCalculator() {
  const [activeTab, setActiveTab] = useState<'currentGrade' | 'finalGrade'>('currentGrade');

  // State for weighted grade calculator
  const [rows, setRows] = useState<GradeRow[]>([
    { id: '1', name: 'Homework & Assignments', grade: 92, weight: 20 },
    { id: '2', name: 'Quizzes', grade: 88, weight: 15 },
    { id: '3', name: 'Midterm Exam', grade: 84, weight: 25 },
    { id: '4', name: 'Class Project', grade: 95, weight: 15 },
  ]);

  // State for final exam target calculator
  const [currentGradeInput, setCurrentGradeInput] = useState<number>(83);
  const [targetGradeInput, setTargetGradeInput] = useState<number>(90);
  const [finalWeightInput, setFinalWeightInput] = useState<number>(25);
  const [expectedExamScore, setExpectedExamScore] = useState<number>(85);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now().toString(), name: `Assessment ${prev.length + 1}`, grade: 85, weight: 10 },
    ]);
  };

  const updateRow = (id: string, field: 'name' | 'grade' | 'weight', val: string | number) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (field === 'name') return { ...r, name: String(val) };
        const num = Number(val);
        return { ...r, [field]: isNaN(num) ? 0 : num };
      })
    );
  };

  const removeRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Calculations for current weighted grade
  const totalWeight = rows.reduce((sum, r) => sum + (r.weight || 0), 0);
  const weightedSum = rows.reduce((sum, r) => sum + (r.grade || 0) * ((r.weight || 0) / 100), 0);
  const calculatedCurrentGrade = totalWeight > 0 ? weightedSum / (totalWeight / 100) : 0;

  // Standard collegiate 4.0 grading scale used by the tool
  const getLetterGrade = (pct: number) => {
    if (pct >= 93) return { letter: 'A', gpa: '4.0', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (pct >= 90) return { letter: 'A-', gpa: '3.7', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (pct >= 87) return { letter: 'B+', gpa: '3.3', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (pct >= 83) return { letter: 'B', gpa: '3.0', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (pct >= 80) return { letter: 'B-', gpa: '2.7', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (pct >= 77) return { letter: 'C+', gpa: '2.3', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (pct >= 73) return { letter: 'C', gpa: '2.0', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (pct >= 70) return { letter: 'C-', gpa: '1.7', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (pct >= 60) return { letter: 'D', gpa: '1.0', color: 'text-orange-700 bg-orange-50 border-orange-200' };
    return { letter: 'F', gpa: '0.0', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const currentLetter = getLetterGrade(calculatedCurrentGrade);

  // Calculation for final exam target
  // NeededScore = (Target - Current * (1 - Weight)) / Weight
  const fwClamped = Math.max(1, Math.min(100, finalWeightInput));
  const currentWeightFrac = (100 - fwClamped) / 100;
  const finalWeightFrac = fwClamped / 100;
  const neededScore = (targetGradeInput - currentGradeInput * currentWeightFrac) / finalWeightFrac;

  // Calculation for predicted final grade from expected exam score
  const predictedGrade = currentGradeInput * currentWeightFrac + expectedExamScore * finalWeightFrac;
  const predictedLetter = getLetterGrade(predictedGrade);

  // What-If exam scores matrix: 50%, 60%, 70%, 80%, 90%, 100%
  const whatIfScores = [50, 60, 70, 80, 90, 100];
  const whatIfRows = whatIfScores.map((score) => {
    const finalCourseGrade = currentGradeInput * currentWeightFrac + score * finalWeightFrac;
    return {
      examScore: score,
      finalCourseGrade,
      letterObj: getLetterGrade(finalCourseGrade),
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      {/* Top Banner and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Weighted Grade & Final Exam Calculator</h2>
          <p className="text-sm text-slate-500 mt-1">
            Calculate your weighted class grade, find required final exam scores, or predict outcomes with what-if simulations.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('currentGrade')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'currentGrade' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Weighted Class Grade
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('finalGrade')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'finalGrade' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Final Exam Target & Predictor
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: WEIGHTED COURSE GRADE CALCULATOR                   */}
      {/* ========================================================= */}
      {activeTab === 'currentGrade' ? (
        <div>
          {/* Result Banner */}
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Current Weighted Grade
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-900 mt-1 font-mono">
                {calculatedCurrentGrade.toFixed(2)}%
              </div>
              <p className="text-xs text-blue-700/80 mt-1">
                Total weight entered: {totalWeight.toFixed(0)}%
                {totalWeight !== 100 && (
                  <span className="text-amber-800 ml-1 font-medium">
                    (Weights sum to {totalWeight.toFixed(0)}%, grade is automatically normalized)
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Standard Letter Grade
              </div>
              <div
                className={`text-2xl font-black px-4 py-2 rounded-xl border flex items-center gap-2 ${currentLetter.color}`}
              >
                <span>{currentLetter.letter}</span>
                <span className="text-sm font-semibold opacity-80">({currentLetter.gpa} GPA)</span>
              </div>
            </div>
          </div>

          {/* Table of assignments */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto mb-4">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Assessment / Category</th>
                  <th className="px-4 py-3 w-32">Grade (%)</th>
                  <th className="px-4 py-3 w-28">Weight (%)</th>
                  <th className="px-4 py-3 w-32">Points Contributed</th>
                  <th className="px-4 py-3 text-right w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const contributed = (row.grade * row.weight) / 100;
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="150"
                          value={row.grade || ''}
                          onChange={(e) => updateRow(row.id, 'grade', e.target.value)}
                          className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={row.weight || ''}
                          onChange={(e) => updateRow(row.id, 'weight', e.target.value)}
                          className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                        />
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-600 font-semibold">
                        {contributed.toFixed(2)} pts
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          disabled={rows.length <= 1}
                          aria-label="Remove row"
                          className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={addRow}
              className="px-4 py-2 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 text-blue-600 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Assessment Category
            </button>

            <button
              type="button"
              onClick={() => {
                // Pass current calculated grade to the final exam target calculator
                setCurrentGradeInput(parseFloat(calculatedCurrentGrade.toFixed(1)));
                setActiveTab('finalGrade');
              }}
              className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Use this {calculatedCurrentGrade.toFixed(1)}% to calculate final exam needed score →
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* TAB 2: FINAL EXAM TARGET & PREDICTOR                      */
        /* ========================================================= */
        <div className="space-y-8">
          {/* Section 1: Target Needed Score */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                Mode A: Calculate Required Final Exam Score
              </h3>
              <span className="text-2xs text-slate-500">Formula: Needed = [Target − Current × (1 − Weight)] ÷ Weight</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Current Course Grade (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={currentGradeInput}
                  onChange={(e) => setCurrentGradeInput(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                />
                <p className="text-2xs text-slate-500 mt-1">Average before the final exam</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Desired Target Grade (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={targetGradeInput}
                  onChange={(e) => setTargetGradeInput(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                />
                {/* Target Letter Grade Quick Selection */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {[
                    { letter: 'A', pct: 93 },
                    { letter: 'A-', pct: 90 },
                    { letter: 'B+', pct: 87 },
                    { letter: 'B', pct: 83 },
                    { letter: 'C', pct: 73 },
                    { letter: 'Pass (D)', pct: 60 },
                  ].map((tgt) => (
                    <button
                      key={tgt.letter}
                      type="button"
                      onClick={() => setTargetGradeInput(tgt.pct)}
                      className={`px-1.5 py-0.5 rounded text-3xs font-semibold border transition-colors cursor-pointer ${
                        targetGradeInput === tgt.pct
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {tgt.letter} ({tgt.pct}%)
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Final Exam Weight (%)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  value={finalWeightInput}
                  onChange={(e) => setFinalWeightInput(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-800 focus:outline-hidden focus:border-blue-500 bg-white"
                />
                <p className="text-2xs text-slate-500 mt-1">Syllabus percentage for final exam</p>
              </div>
            </div>

            {/* Target Result Box with Clear Warning States */}
            <div
              className={`p-6 rounded-2xl border ${
                neededScore > 100
                  ? 'bg-amber-50/70 border-amber-300'
                  : neededScore <= 0
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border-blue-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 text-slate-700">
                    <Target className="w-4 h-4 text-blue-600" /> Score Needed on Final Exam
                  </span>
                  <div
                    className={`text-4xl sm:text-5xl font-extrabold font-mono mt-1 ${
                      neededScore > 100
                        ? 'text-amber-700'
                        : neededScore <= 0
                        ? 'text-emerald-700'
                        : 'text-blue-900'
                    }`}
                  >
                    {neededScore.toFixed(1)}%
                  </div>
                </div>

                <div className="max-w-md text-xs sm:text-sm">
                  {neededScore <= 0 ? (
                    <div className="text-emerald-900 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <strong>Target Already Secured:</strong> With your {currentGradeInput}% coursework average, you have mathematically secured at least a {targetGradeInput}% in the course even if you receive a 0% on the final exam.
                      </div>
                    </div>
                  ) : neededScore <= 100 ? (
                    <div className="text-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-blue-600 mt-0.5" />
                      <div>
                        <strong>Achievable Goal:</strong> You need to score at least <strong>{neededScore.toFixed(1)}%</strong> on the final exam to finish the semester with your desired <strong>{targetGradeInput}%</strong>.
                      </div>
                    </div>
                  ) : (
                    <div className="text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <strong>Target Impossible on Standard Scale (Exceeds 100%):</strong> To achieve {targetGradeInput}%, you would need to score <strong>{neededScore.toFixed(1)}%</strong> on the final exam. Without significant extra credit, this target cannot be met mathematically. We recommend targeting a realistic threshold below (e.g. B or C).
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Predict Final Grade from Expected Exam Score */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Mode B: Predict Final Grade from Expected Exam Score
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What score do you anticipate getting on the final? (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="120"
                  value={expectedExamScore}
                  onChange={(e) => setExpectedExamScore(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-lg font-bold font-mono text-slate-900 bg-white"
                />
                <p className="text-2xs text-slate-500 mt-1">
                  Based on Current ({currentGradeInput}%) with {100 - fwClamped}% weight and Final ({expectedExamScore}%) with {fwClamped}% weight.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Predicted Final Course Grade
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono mt-1">
                  {predictedGrade.toFixed(2)}%
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${predictedLetter.color}`}>
                    Letter Grade: {predictedLetter.letter} ({predictedLetter.gpa} GPA)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: What-If Comparison Matrix */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              What-If Exam Score Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500">
              See what your overall final course grade will be depending on how well you perform on the upcoming final exam:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                  <tr>
                    <th className="px-3 py-2">If you score on Final</th>
                    <th className="px-3 py-2">Coursework Contribution</th>
                    <th className="px-3 py-2">Final Exam Contribution</th>
                    <th className="px-3 py-2">Overall Course Grade</th>
                    <th className="px-3 py-2">Letter & GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {whatIfRows.map((row) => {
                    const cwPart = currentGradeInput * currentWeightFrac;
                    const exPart = row.examScore * finalWeightFrac;
                    return (
                      <tr key={row.examScore} className="hover:bg-slate-50/60">
                        <td className="px-3 py-2 font-bold font-mono text-slate-900">
                          {row.examScore}%
                        </td>
                        <td className="px-3 py-2 font-mono text-slate-600">
                          {cwPart.toFixed(1)}%
                        </td>
                        <td className="px-3 py-2 font-mono text-slate-600">
                          {exPart.toFixed(1)}%
                        </td>
                        <td className="px-3 py-2 font-bold font-mono text-blue-700">
                          {row.finalCourseGrade.toFixed(2)}%
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-0.5 rounded text-2xs font-bold border ${row.letterObj.color}`}>
                            {row.letterObj.letter} ({row.letterObj.gpa})
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-2xs text-slate-500 italic pt-1">
              * Note: Letter grade boundaries reflect the standard US 90-80-70 collegiate grading scale (A = 93%+, A- = 90%+, B+ = 87%+, B = 83%+, C = 73%+, D = 60%+). Individual courses or universities may use curved distributions or custom syllabi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
