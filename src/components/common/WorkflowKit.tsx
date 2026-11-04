import React from 'react';
import { WorkflowKit as WorkflowKitType } from '../../data/workflows';
import { Link } from '../../context/RouterContext';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Info,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface WorkflowKitProps {
  workflow: WorkflowKitType;
  currentToolSlug?: string;
  className?: string;
}

export function WorkflowKit({
  workflow,
  currentToolSlug,
  className = '',
}: WorkflowKitProps) {
  const currentStepIndex = workflow.steps.findIndex(
    (s) => s.slug === currentToolSlug
  );
  const currentStep = currentStepIndex !== -1 ? workflow.steps[currentStepIndex] : null;
  const prevStep = currentStepIndex > 0 ? workflow.steps[currentStepIndex - 1] : null;
  const nextStep =
    currentStepIndex !== -1 && currentStepIndex < workflow.steps.length - 1
      ? workflow.steps[currentStepIndex + 1]
      : null;

  return (
    <section
      aria-label={`${workflow.title} Pipeline`}
      className={`bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 ${className}`}
    >
      {/* Header with kit badge and title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{workflow.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {workflow.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {workflow.tagline}
          </p>
        </div>

        {currentStep && (
          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
            <span>Current Step:</span>
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xs font-bold">
              {currentStep.stepNumber}
            </span>
            <span>of {workflow.steps.length}</span>
          </div>
        )}
      </div>

      {/* Explanatory description */}
      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
        {workflow.description}
      </p>

      {/* Process Architecture Note */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-blue-950">Independent In-Browser Tools: </strong>
          Each tool in this workflow processes files and calculations locally within your web browser. Download your output from one step to your device, then open the next tool to complete your task.
        </p>
      </div>

      {/* Sequential Steps Grid / List */}
      <div className="space-y-4 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Workflow Pipeline Sequence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflow.steps.map((step) => {
            const isCurrent = step.slug === currentToolSlug;

            return (
              <div
                key={step.stepNumber}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-50/50 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    {isCurrent ? (
                      <span className="text-2xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                        You Are Here
                      </span>
                    ) : (
                      <span className="text-2xs font-medium text-slate-500">
                        {step.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {step.name}
                  </h4>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {step.description}
                  </p>

                  <p className="text-2xs text-slate-500 mt-2 p-2 rounded-lg bg-white/80 border border-slate-100 leading-relaxed">
                    {step.guidance}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  {isCurrent ? (
                    <div className="text-xs font-semibold text-blue-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Active Workspace</span>
                    </div>
                  ) : (
                    <Link
                      to={step.path}
                      className="inline-flex items-center justify-between w-full text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous / Next Step Context Navigation */}
      {(prevStep || nextStep) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {prevStep ? (
            <Link
              to={prevStep.path}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 w-full sm:w-auto justify-center sm:justify-start"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                Previous Step: <strong>{prevStep.name}</strong>
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextStep ? (
            <Link
              to={nextStep.path}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-xl shadow-xs w-full sm:w-auto justify-center sm:justify-end"
            >
              <span>
                Next Step: <strong>{nextStep.name}</strong>
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Final step in this workflow pipeline</span>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer Notice */}
      {workflow.disclaimer && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>{workflow.disclaimer}</div>
        </div>
      )}
    </section>
  );
}
