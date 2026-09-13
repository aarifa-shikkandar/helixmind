import React from 'react';
import { HeartPulse, ShieldAlert, Zap } from 'lucide-react';

export default function HealthSummary({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <HeartPulse className="w-8 h-8 text-rose-400" />
        <div>
          <div className="text-xs text-slate-400">Cardio Predisposition</div>
          <div className="text-sm font-semibold text-slate-200">{summary?.cardio || 'Low Risk'}</div>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <ShieldAlert className="w-8 h-8 text-amber-400" />
        <div>
          <div className="text-xs text-slate-400">Metabolic Stability</div>
          <div className="text-sm font-semibold text-slate-200">{summary?.metabolic || 'Normal'}</div>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
        <Zap className="w-8 h-8 text-cyan-400" />
        <div>
          <div className="text-xs text-slate-400">Variant Markers</div>
          <div className="text-sm font-semibold text-slate-200">{summary?.markers || '12 Detected'}</div>
        </div>
      </div>
    </div>
  );
}