import React from 'react';
import { formatRiskLevel } from '../utils/formatters';

export default function RiskScore({ score = 0.5 }) {
  const risk = formatRiskLevel(score);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Disease Risk Score</h4>
        <div className="text-4xl font-extrabold text-slate-100 mt-2">{(score * 100).toFixed(1)}%</div>
      </div>
      <div className={`px-4 py-2 rounded-full font-bold text-sm ${risk.color}`}>
        {risk.label} Risk
      </div>
    </div>
  );
}