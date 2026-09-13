import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ConfidenceScore({ confidence = 0.9 }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Model Confidence</h4>
        <div className="text-4xl font-extrabold text-slate-100 mt-2">{(confidence * 100).toFixed(1)}%</div>
      </div>
      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full">
        <CheckCircle2 className="w-8 h-8" />
      </div>
    </div>
  );
}