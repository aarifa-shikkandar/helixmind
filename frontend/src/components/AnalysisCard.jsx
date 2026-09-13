import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnalysisCard({ id, patientCode, date, riskLevel }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
      <div>
        <h4 className="text-slate-200 font-semibold">{patientCode}</h4>
        <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
          <Calendar className="w-3 h-3" /> {date}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
          {riskLevel}
        </span>
        <Link to={`/prediction`} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400">
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}