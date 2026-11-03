import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  FileText,
  FileUp,
  FileDown,
  Target,
  Gauge,
  Clock,
  Sliders,
  Sparkles,
  BookOpen,
  Info,
  ShieldCheck,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';
import { downloadBlob } from '../../../utils/fileHelpers';
import { Link } from '../../../context/RouterContext';

const SAMPLE_TEXT = `Technology has profoundly altered the modern landscape of education and knowledge dissemination. Through digital connectivity, students and researchers worldwide access comprehensive libraries, interactive computational models, and peer-reviewed literature in seconds. As digital tools become more refined, lightweight browser applications play an essential role in everyday productivity, facilitating calculation, document transformation, and focus without cumbersome software installations.`;

// Common English stop words for optional document frequency filtering
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't",
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't",
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have',
  "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself',
  'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into',
  'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't", 'my',
  'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's",
  'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're",
  "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't",
  'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's",
  'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't",
  'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself',
  'yourselves',
]);

/**
 * Heuristic syllable counter for standard English words.
 */
function countSyllablesInWord(rawWord: string): number {
  const word = rawWord.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;

  // Normalise common trailing letters
  const processed = word
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');

  const matches = processed.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

export function WordCounter() {
  // Task 1: Initial text area is empty by default
  const [text, setText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Task 2: Custom Word Goal Tracker
  const [wordGoal, setWordGoal] = useState<string>('');

  // Task 3: Character Limit Controls
  const [charLimit, setCharLimit] = useState<string>('');

  // Task 5: Custom Reading & Speaking Speeds (WPM)
  const [readingWpm, setReadingWpm] = useState<number>(225);
  const [speakingWpm, setSpeakingWpm] = useState<number>(130);

  // Task 6: Local Browser Autosave
  const [autosaveEnabled, setAutosaveEnabled] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [hasSavedDraft, setHasSavedDraft] = useState<boolean>(false);

  // Task 8: Word Frequency Controls
  const [excludeStopWords, setExcludeStopWords] = useState<boolean>(true);
  const [frequencySort, setFrequencySort] = useState<'freq' | 'alpha'>('freq');
  const [frequencySearch, setFrequencySearch] = useState<string>('');
  const [showAllFrequencies, setShowAllFrequencies] = useState<boolean>(false);

  // Active Tool Drawer
  const [activePanel, setActivePanel] = useState<'goals' | 'pacing' | 'frequency' | null>('goals');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize autosave preference & check for stored draft on client mount
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const savedPref = window.localStorage.getItem('toolora_wordcounter_autosave');
      const isEnabled = savedPref === 'true';
      setAutosaveEnabled(isEnabled);

      const existingDraft = window.localStorage.getItem('toolora_wordcounter_draft');
      const existingTime = window.localStorage.getItem('toolora_wordcounter_draft_time');
      if (existingDraft && existingDraft.trim().length > 0) {
        setHasSavedDraft(true);
        if (existingTime) setLastSavedTime(existingTime);
        // If user already opted in to autosave and text is empty, restore draft
        if (isEnabled) {
          setText(existingDraft);
        }
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  // Handle autosave writes when enabled
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      if (autosaveEnabled) {
        if (text.trim().length > 0) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          window.localStorage.setItem('toolora_wordcounter_draft', text);
          window.localStorage.setItem('toolora_wordcounter_draft_time', timeStr);
          setLastSavedTime(timeStr);
          setHasSavedDraft(true);
        }
      }
    } catch {
      // Quota exceeded or private browsing restricted
    }
  }, [text, autosaveEnabled]);

  // Toggle autosave preference
  const toggleAutosave = () => {
    const nextState = !autosaveEnabled;
    setAutosaveEnabled(nextState);
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('toolora_wordcounter_autosave', String(nextState));
        if (nextState && text.trim().length > 0) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          window.localStorage.setItem('toolora_wordcounter_draft', text);
          window.localStorage.setItem('toolora_wordcounter_draft_time', timeStr);
          setLastSavedTime(timeStr);
          setHasSavedDraft(true);
        }
      } catch {
        // ignore
      }
    }
  };

  // Erase saved draft from localStorage
  const handleEraseSavedDraft = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem('toolora_wordcounter_draft');
        window.localStorage.removeItem('toolora_wordcounter_draft_time');
        setHasSavedDraft(false);
        setLastSavedTime(null);
      } catch {
        // ignore
      }
    }
  };

  // Task 1: Clear text resets all content and derived stats
  const handleClear = () => {
    setText('');
    setImportError(null);
    if (autosaveEnabled && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem('toolora_wordcounter_draft');
        window.localStorage.removeItem('toolora_wordcounter_draft_time');
        setLastSavedTime(null);
        setHasSavedDraft(false);
      } catch {
        // ignore
      }
    }
  };

  // Copy text to clipboard
  const handleCopy = () => {
    if (!text) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Task 7: Import plain .txt file
  const handleImportTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setImportError('File exceeds 5MB limit. Please select a smaller plain text file.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setText(content);
        setImportError(null);
      }
    };
    reader.onerror = () => {
      setImportError('Failed to read the selected file. Please make sure it is a valid UTF-8 text file.');
    };
    reader.readAsText(file);
    // Reset file input so user can re-import same file if needed
    e.target.value = '';
  };

  // Task 7: Export text to .txt file
  const handleExportTxt = () => {
    if (!text.trim()) return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    downloadBlob(blob, 'toolora-word-counter-draft.txt');
  };

  // Primary Statistics
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed
    ? (text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || []).length || (words > 0 ? 1 : 0)
    : 0;
  const paragraphs = trimmed
    ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;

  // Task 5: Dynamic Reading & Speaking Speeds
  const readingSeconds = words > 0 ? Math.ceil((words / Math.max(50, readingWpm)) * 60) : 0;
  const readingMin = Math.floor(readingSeconds / 60);
  const readingSec = readingSeconds % 60;
  const readingDisplay = `${readingMin}m ${readingSec}s`;

  const speakingSeconds = words > 0 ? Math.ceil((words / Math.max(50, speakingWpm)) * 60) : 0;
  const speakingMin = Math.floor(speakingSeconds / 60);
  const speakingSec = speakingSeconds % 60;
  const speakingDisplay = `${speakingMin}m ${speakingSec}s`;

  // Average Sentence & Word Length
  const avgSentenceLength = sentences > 0 ? (words / sentences).toFixed(1) : '0';
  const avgWordLength = words > 0 ? (charactersWithoutSpaces / words).toFixed(1) : '0';

  // Task 4: Flesch Reading Ease Score
  const readabilityInfo = useMemo(() => {
    if (words < 10 || sentences < 1) {
      return {
        score: null,
        label: 'Requires 10+ words and 1 full sentence for an estimate',
        grade: null,
        color: 'text-slate-400 bg-slate-100',
      };
    }

    // Tokenize words for syllable estimation
    const rawTokens = trimmed.toLowerCase().match(/\b[a-z']+\b/g) || [];
    let totalSyllables = 0;
    for (const w of rawTokens) {
      totalSyllables += countSyllablesInWord(w);
    }

    const asl = words / sentences;
    const asw = totalSyllables / Math.max(1, words);
    const rawScore = 206.835 - 1.015 * asl - 84.6 * asw;
    const clampedScore = Math.max(0, Math.min(100, Math.round(rawScore * 10) / 10));

    let label = 'Standard';
    let grade = '8th–9th grade (Plain English)';
    let color = 'text-blue-700 bg-blue-50 border-blue-200';

    if (clampedScore >= 90) {
      label = 'Very Easy';
      grade = '5th grade (Conversational)';
      color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (clampedScore >= 80) {
      label = 'Easy';
      grade = '6th grade (Simple English)';
      color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (clampedScore >= 70) {
      label = 'Fairly Easy';
      grade = '7th grade (Everyday prose)';
      color = 'text-teal-700 bg-teal-50 border-teal-200';
    } else if (clampedScore >= 60) {
      label = 'Standard';
      grade = '8th–9th grade (High school)';
      color = 'text-blue-700 bg-blue-50 border-blue-200';
    } else if (clampedScore >= 50) {
      label = 'Fairly Difficult';
      grade = '10th–12th grade (Challenging)';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (clampedScore >= 30) {
      label = 'Difficult';
      grade = 'College level (Academic/Technical)';
      color = 'text-orange-700 bg-orange-50 border-orange-200';
    } else {
      label = 'Very Difficult';
      grade = 'Graduate level (Complex/Legal)';
      color = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    return { score: clampedScore, label, grade, color };
  }, [trimmed, words, sentences]);

  // Task 2: Word Goal Computations
  const parsedWordGoal = parseInt(wordGoal.replace(/[^0-9]/g, ''), 10);
  const hasValidWordGoal = !isNaN(parsedWordGoal) && parsedWordGoal > 0;
  const wordGoalProgress = hasValidWordGoal
    ? Math.min(100, Math.round((words / parsedWordGoal) * 100))
    : 0;
  const wordsRemaining = hasValidWordGoal ? Math.max(0, parsedWordGoal - words) : 0;
  const wordsOverGoal = hasValidWordGoal && words > parsedWordGoal ? words - parsedWordGoal : 0;
  const isWordGoalReached = hasValidWordGoal && words >= parsedWordGoal;

  // Task 3: Character Limit Computations
  const parsedCharLimit = parseInt(charLimit.replace(/[^0-9]/g, ''), 10);
  const hasValidCharLimit = !isNaN(parsedCharLimit) && parsedCharLimit > 0;
  const charsRemaining = hasValidCharLimit ? parsedCharLimit - charactersWithSpaces : 0;
  const isCharLimitExceeded = hasValidCharLimit && charactersWithSpaces > parsedCharLimit;
  const charProgressPct = hasValidCharLimit
    ? Math.min(100, Math.round((charactersWithSpaces / parsedCharLimit) * 100))
    : 0;

  // Task 8: Frequency List with Contraction & Unicode Support
  const { frequencyList, totalUniqueWords } = useMemo(() => {
    if (!trimmed) return { frequencyList: [], totalUniqueWords: 0 };

    // Matches letters, contractions (e.g. don't), and hyphenated terms
    const rawMatches = trimmed.toLowerCase().match(/\b[a-z0-9]+(?:'[a-z0-9]+)?\b/g) || [];
    const freqMap: Record<string, number> = {};

    for (const token of rawMatches) {
      if (token.length <= 1 && !['a', 'i'].includes(token)) continue;
      if (excludeStopWords && STOP_WORDS.has(token)) continue;
      freqMap[token] = (freqMap[token] || 0) + 1;
    }

    const uniqueCount = Object.keys(freqMap).length;
    let list = Object.entries(freqMap);

    if (frequencySearch.trim()) {
      const q = frequencySearch.trim().toLowerCase();
      list = list.filter(([term]) => term.includes(q));
    }

    if (frequencySort === 'freq') {
      list.sort((a, b) => b[1] - a[1]);
    } else {
      list.sort((a, b) => a[0].localeCompare(b[0]));
    }

    return { frequencyList: list, totalUniqueWords: uniqueCount };
  }, [trimmed, excludeStopWords, frequencySort, frequencySearch]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 shadow-xs space-y-6">
      {/* 1. Core Real-Time Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-blue-50/80 border border-blue-200/70 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">Words</span>
          <p className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 mt-1">{words}</p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Characters</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{charactersWithSpaces}</p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">No Spaces</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{charactersWithoutSpaces}</p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Sentences</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{sentences}</p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Paragraphs</span>
          <p className="text-2xl sm:text-3xl font-bold font-mono text-slate-800 mt-1">{paragraphs}</p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Read Time <span className="text-[10px] text-slate-400 font-normal">({readingWpm} wpm)</span>
          </span>
          <p className="text-base sm:text-lg font-bold font-mono text-slate-800 mt-2">{readingDisplay}</p>
        </div>
      </div>

      {/* 2. Secondary Metrics Summary Row (Speaking Time, Sentence Length, Word Length, Readability) */}
      <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Speaking Pace: <strong className="text-slate-800 font-mono font-medium">{speakingDisplay}</strong> ({speakingWpm} wpm)</span>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Avg Sentence: <strong className="text-slate-800 font-mono font-medium">{avgSentenceLength}</strong> words</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Avg Word: <strong className="text-slate-800 font-mono font-medium">{avgWordLength}</strong> chars</span>
        </div>

        {/* Readability Score Badge */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Readability:</span>
          {readabilityInfo.score !== null ? (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${readabilityInfo.color}`}
              title={`Flesch Reading Ease score: ${readabilityInfo.score}/100. ${readabilityInfo.grade}`}
            >
              <Gauge className="w-3.5 h-3.5 shrink-0" />
              <span>{readabilityInfo.score} ({readabilityInfo.label})</span>
            </span>
          ) : (
            <span className="text-slate-400 text-xs italic">
              {words === 0 ? 'Type text to evaluate' : 'Add 10+ words & 1 sentence'}
            </span>
          )}
        </div>
      </div>

      {/* 3. Main Textarea & Live Input Container */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here (or click 'Load Sample Text' below) to count words, characters, sentences, paragraphs, and reading time in real time..."
            aria-label="Text to count and analyze"
            className="w-full p-4 text-base text-slate-800 bg-slate-50/60 border border-slate-300 rounded-2xl focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 leading-relaxed font-sans transition-all placeholder:text-slate-400"
          />

          {/* Quick empty-state hint when text is empty */}
          {words === 0 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-slate-400">
              Client-side execution · Local in-browser counting
            </div>
          )}
        </div>

        {/* Active Word Goal & Character Limit Live Progress Banners */}
        {(hasValidWordGoal || hasValidCharLimit) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {hasValidWordGoal && (
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    Word Goal: {words} / {parsedWordGoal}
                  </span>
                  <span className="font-mono text-2xs text-blue-700">
                    {isWordGoalReached
                      ? wordsOverGoal > 0
                        ? `Goal reached! (+${wordsOverGoal} words)`
                        : 'Goal reached! (100%)'
                      : `${wordsRemaining} words remaining (${wordGoalProgress}%)`}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={wordGoalProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full h-2 rounded-full bg-blue-200/60 overflow-hidden"
                >
                  <div
                    style={{ width: `${wordGoalProgress}%` }}
                    className={`h-full transition-all duration-300 ${isWordGoalReached ? 'bg-emerald-600' : 'bg-blue-600'}`}
                  />
                </div>
              </div>
            )}

            {hasValidCharLimit && (
              <div className={`p-3 rounded-xl border space-y-1.5 ${isCharLimitExceeded ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold flex items-center gap-1.5 ${isCharLimitExceeded ? 'text-rose-900' : 'text-slate-800'}`}>
                    {isCharLimitExceeded ? <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> : <Gauge className="w-3.5 h-3.5 text-slate-600" />}
                    Char Limit: {charactersWithSpaces} / {parsedCharLimit}
                  </span>
                  <span className={`font-mono text-2xs ${isCharLimitExceeded ? 'text-rose-700 font-bold' : 'text-slate-500'}`}>
                    {isCharLimitExceeded
                      ? `${Math.abs(charsRemaining)} chars over limit!`
                      : `${charsRemaining} chars remaining (${charProgressPct}%)`}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={charProgressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full h-2 rounded-full bg-slate-200 overflow-hidden"
                >
                  <div
                    style={{ width: `${charProgressPct}%` }}
                    className={`h-full transition-all duration-300 ${isCharLimitExceeded ? 'bg-rose-600' : 'bg-blue-600'}`}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {importError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{importError}</span>
          </div>
        )}
      </div>

      {/* 4. Action Toolbar (Copy, Clear, Sample, TXT Import/Export, Autosave) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>

          <button
            type="button"
            onClick={() => setText(SAMPLE_TEXT)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Load Sample Text
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!text}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Text
          </button>

          {/* TXT Import Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportTxt}
            accept=".txt,text/plain"
            className="hidden"
            id="wordcounter-txt-input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <FileUp className="w-3.5 h-3.5 text-blue-600" />
            Import .txt
          </button>

          {/* TXT Export Button */}
          <button
            type="button"
            onClick={handleExportTxt}
            disabled={!text.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-600" />
            Export .txt
          </button>
        </div>

        {/* Local Autosave Control */}
        <div className="flex items-center gap-2 text-xs">
          <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-600 select-none">
            <input
              type="checkbox"
              checked={autosaveEnabled}
              onChange={toggleAutosave}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="font-medium flex items-center gap-1">
              <Save className="w-3.5 h-3.5 text-slate-500" />
              Autosave Draft
            </span>
          </label>

          {autosaveEnabled && lastSavedTime && (
            <span className="text-2xs text-emerald-600 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Saved {lastSavedTime}
            </span>
          )}

          {hasSavedDraft && (
            <button
              type="button"
              onClick={handleEraseSavedDraft}
              title="Delete draft saved in your local browser storage"
              className="text-2xs text-slate-400 hover:text-rose-600 underline transition-colors"
            >
              Erase Draft
            </button>
          )}
        </div>
      </div>

      {/* 5. Feature Drawer Navigation Tabs */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActivePanel(activePanel === 'goals' ? null : 'goals')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activePanel === 'goals'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Word Goals & Character Limits</span>
            {(hasValidWordGoal || hasValidCharLimit) && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActivePanel(activePanel === 'pacing' ? null : 'pacing')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activePanel === 'pacing'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Reading Speed & Readability</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePanel(activePanel === 'frequency' ? null : 'frequency')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activePanel === 'frequency'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Word Frequency & Density</span>
            {frequencyList.length > 0 && (
              <span className="text-2xs font-mono opacity-80">({totalUniqueWords})</span>
            )}
          </button>
        </div>

        {/* Panel Content: 1. Word Goals & Character Limits */}
        {activePanel === 'goals' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Word Goal Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="target-word-goal" className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-600" />
                    Target Word Goal
                  </label>
                  {wordGoal && (
                    <button
                      type="button"
                      onClick={() => setWordGoal('')}
                      className="text-2xs text-slate-500 hover:text-rose-600 underline"
                    >
                      Clear Target
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="target-word-goal"
                    type="number"
                    min="1"
                    max="100000"
                    placeholder="e.g. 500 words"
                    value={wordGoal}
                    onChange={(e) => setWordGoal(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-2xs">
                  <span className="text-slate-400">Presets:</span>
                  {[250, 500, 750, 1000, 2000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setWordGoal(String(preset))}
                      className={`px-2 py-1 rounded-md border transition-colors ${
                        wordGoal === String(preset)
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset}w
                    </button>
                  ))}
                </div>

                <p className="text-2xs text-slate-500 leading-relaxed">
                  Ideal for college essays, article submissions, and academic assignments with strict minimum or maximum word quotas.
                </p>
              </div>

              {/* Character Limit Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="target-char-limit" className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-blue-600" />
                    Character Limit
                  </label>
                  {charLimit && (
                    <button
                      type="button"
                      onClick={() => setCharLimit('')}
                      className="text-2xs text-slate-500 hover:text-rose-600 underline"
                    >
                      Clear Limit
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="target-char-limit"
                    type="number"
                    min="1"
                    max="100000"
                    placeholder="e.g. 280 characters"
                    value={charLimit}
                    onChange={(e) => setCharLimit(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Quick Platform Presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-2xs">
                  <span className="text-slate-400">Presets:</span>
                  {[
                    { label: '160 (SMS)', val: 160 },
                    { label: '280 (X/Twitter)', val: 280 },
                    { label: '500 (Bio)', val: 500 },
                    { label: '1000 (Meta)', val: 1000 },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setCharLimit(String(preset.val))}
                      className={`px-2 py-1 rounded-md border transition-colors ${
                        charLimit === String(preset.val)
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <p className="text-2xs text-slate-500 leading-relaxed">
                  Common platform benchmark limits for drafts and summaries. Platform segmentation rules and emoji counting can vary.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Panel Content: 2. Reading Speed & Readability */}
        {activePanel === 'pacing' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Reading Pace Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Reading Speed (WPM)
                  </span>
                  <span className="font-mono font-bold text-blue-600 text-sm">{readingWpm} WPM</span>
                </div>

                <input
                  type="range"
                  min="100"
                  max="450"
                  step="25"
                  value={readingWpm}
                  onChange={(e) => setReadingWpm(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />

                <div className="flex flex-wrap items-center justify-between text-2xs text-slate-500">
                  <button type="button" onClick={() => setReadingWpm(150)} className="hover:text-blue-600">150 (Careful)</button>
                  <button type="button" onClick={() => setReadingWpm(225)} className="hover:text-blue-600 font-semibold text-blue-600">225 (Average Adult)</button>
                  <button type="button" onClick={() => setReadingWpm(300)} className="hover:text-blue-600">300 (Skimming)</button>
                </div>
              </div>

              {/* Speaking Pace Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Speaking Speed (WPM)
                  </span>
                  <span className="font-mono font-bold text-amber-600 text-sm">{speakingWpm} WPM</span>
                </div>

                <input
                  type="range"
                  min="90"
                  max="220"
                  step="10"
                  value={speakingWpm}
                  onChange={(e) => setSpeakingWpm(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                <div className="flex flex-wrap items-center justify-between text-2xs text-slate-500">
                  <button type="button" onClick={() => setSpeakingWpm(110)} className="hover:text-amber-600">110 (Deliberate)</button>
                  <button type="button" onClick={() => setSpeakingWpm(130)} className="hover:text-amber-600 font-semibold text-amber-600">130 (Keynote Speech)</button>
                  <button type="button" onClick={() => setSpeakingWpm(160)} className="hover:text-amber-600">160 (Conversational)</button>
                </div>
              </div>
            </div>

            {/* Readability Explanation Box */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                About Flesch Reading Ease
              </div>
              <p className="text-slate-600 leading-relaxed">
                Flesch Reading Ease is a standard benchmark measuring how easily an adult reader can understand English prose. Scores between <strong>60 and 70</strong> represent plain, accessible English (equivalent to 8th–9th grade level). Scores above <strong>80</strong> are easily understood by younger readers, while scores below <strong>50</strong> generally indicate academic, technical, or legal prose.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-2xs text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg"><strong>90–100:</strong> Very Easy (5th gr)</div>
                <div className="p-2 bg-slate-50 rounded-lg"><strong>60–70:</strong> Standard (8th–9th gr)</div>
                <div className="p-2 bg-slate-50 rounded-lg"><strong>50–60:</strong> Fairly Difficult (10th–12th)</div>
                <div className="p-2 bg-slate-50 rounded-lg"><strong>0–30:</strong> Academic / Legal</div>
              </div>
            </div>
          </div>
        )}

        {/* Panel Content: 3. Word Frequency & Text Statistics */}
        {activePanel === 'frequency' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">
                  Unique Words: <span className="font-mono text-blue-600">{totalUniqueWords}</span>
                </span>
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={excludeStopWords}
                    onChange={(e) => setExcludeStopWords(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Exclude common stop words (the, is, and...)</span>
                </label>
              </div>

              {/* Search Filter & Sort Selector */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter words..."
                    value={frequencySearch}
                    onChange={(e) => setFrequencySearch(e.target.value)}
                    className="pl-8 pr-3 py-1 bg-white border border-slate-300 rounded-lg text-xs focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <select
                  value={frequencySort}
                  aria-label="Sort word frequency order"
                  onChange={(e) => setFrequencySort(e.target.value as 'freq' | 'alpha')}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-hidden"
                >
                  <option value="freq">Most Frequent</option>
                  <option value="alpha">Alphabetical (A–Z)</option>
                </select>
              </div>
            </div>

            {/* Word Frequency Table */}
            {frequencyList.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {(showAllFrequencies ? frequencyList : frequencyList.slice(0, 16)).map(([wordToken, count]) => {
                    const pct = words > 0 ? ((count / words) * 100).toFixed(1) : '0';
                    return (
                      <div
                        key={wordToken}
                        className="p-2.5 bg-white border border-slate-200/90 rounded-xl flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <span className="font-semibold text-slate-900 truncate" title={wordToken}>
                          {wordToken}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 text-2xs font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">{count}x</span>
                          <span className="text-slate-400">({pct}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {frequencyList.length > 16 && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAllFrequencies(!showAllFrequencies)}
                      className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-xl transition-colors"
                    >
                      {showAllFrequencies ? 'Show Top 16 Words Only' : `View All ${frequencyList.length} Unique Words`}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-2">
                {trimmed ? 'No matching words found for the current filter.' : 'Enter text above to view document word frequency distribution.'}
              </p>
            )}

            <p className="text-2xs text-slate-400">
              * Note: Document text statistics are calculated client-side by splitting on whitespace and word boundary punctuation. Languages that do not use whitespace (such as Chinese or Japanese) require language-specific morphological segmentation.
            </p>
          </div>
        )}
      </div>

      {/* 6. Detailed SEO Guides & Documentation (Task 9 Visible Content) */}
      <div className="pt-8 border-t border-slate-200 space-y-10">
        {/* Section 1: Free Online Word Counter for Essays and Documents */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
            Free Online Word Counter for Essays and Documents
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Toolora Word Counter is an intuitive, fast, and <strong>free online word counter</strong> engineered for writers, college students, academic researchers, and digital marketers. Whether you need a reliable <strong>essay word counter</strong> to ensure your term paper hits assignment quotas or an accurate <strong>word count checker</strong> for publishing submissions, our tool counts words, characters with spaces, characters without whitespace, sentences, and paragraphs in real time with zero server file uploads.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            For specialized editorial tasks, seamlessly pair this tool with our other text utilities: evaluate strict platform quotas with our <Link to="/tools/character-counter" className="font-semibold text-blue-600 hover:underline">Character Counter</Link>, analyze sentence readability and grade levels with our <Link to="/tools/sentence-counter" className="font-semibold text-blue-600 hover:underline">Sentence Counter</Link>, normalize redundant spaces and blank lines using <Link to="/tools/text-cleaner" className="font-semibold text-blue-600 hover:underline">Text Cleaner</Link>, or calibrate presentation delivery with our <Link to="/tools/reading-time-calculator" className="font-semibold text-blue-600 hover:underline">Reading Time Calculator</Link>.
          </p>
        </div>

        {/* Section 2: Check Word Count and Character Count */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
            Check Word Count and Character Count
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Understanding the distinction between <strong>character and word counter</strong> metrics is critical for academic formatting and platform publishing. While a <strong>word count tool</strong> tallies distinct vocabulary units separated by whitespace, character metrics measure total keystroke volume:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
            <li className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">Characters with Spaces:</strong>
              <span>Measures the absolute string length (UTF-16 code units), including letters, numbers, spaces, tabs, and newline line breaks. Essential for cellular SMS, meta descriptions, and social captions.</span>
            </li>
            <li className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">Characters without Spaces:</strong>
              <span>Strips all whitespace and calculates only visible alphanumeric glyphs and symbols. Frequently required for translation billing, academic conferences, and foreign language exams.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: How to Count Words in a Paragraph */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
            How to Count Words in a Paragraph
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            When drafting articles or structuring chapters, writers often ask <em>how to count words in a paragraph</em> or <em>how many words are in this text</em>. To <strong>count words in text</strong> or isolate a single paragraph:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li>Copy the specific paragraph or manuscript section from your word processor.</li>
            <li>Paste it directly into the Toolora browser editor above (or import a plain <code>.txt</code> file).</li>
            <li>Inspect the <strong>Words</strong> card for immediate volume verification, and check the <strong>Paragraphs</strong> card to ensure line breaks are correctly registered.</li>
            <li>Set a custom <strong>Word Goal</strong> (e.g. 150 words per paragraph) to monitor adherence with real-time percentage indicators.</li>
          </ol>
        </div>

        {/* Section 4: How Word Counting Works */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl">
            How Word Counting Works
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Our <strong>online word count</strong> algorithm trims leading and trailing whitespace and segments strings using regular expressions matching contiguous whitespace clusters (<code>/\s+/</code>). Here is how specific textual elements are handled:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Hyphenated Words</span>
              <span>Compound expressions such as <em>state-of-the-art</em> or <em>well-known</em> are evaluated as a single word unless separated by spaces.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Numbers & Digits</span>
              <span>Numerals separated by spaces (e.g. <em>2026</em> or <em>$50.00</em>) are counted as individual words, matching standard word processors.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Contractions</span>
              <span>Contractions with apostrophes such as <em>don&apos;t</em>, <em>it&apos;s</em>, or <em>student&apos;s</em> are recognized as unified single words.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
