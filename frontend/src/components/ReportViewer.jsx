import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function ReportViewer({ reportData }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-slate-100">Genomic Precision Report</h3>
        </div>
        <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200">
          <Download className="w-3.5 h-3.5" /> Export PDF
        </button>
      </div>
      <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-400 leading-relaxed max-h-64 overflow-y-auto">
        <pre>{JSON.stringify(reportData || { message: "Standard clinical genomic report payload ready for compilation." }, null, 2)}</pre>
      </div>
    </div>
  );
}