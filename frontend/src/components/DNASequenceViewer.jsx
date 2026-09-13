import React from 'react';

export default function DNASequenceViewer({ sequence = '' }) {
  const getBaseColor = (base) => {
    switch (base) {
      case 'A': return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
      case 'T': return 'text-rose-400 bg-rose-950/40 border-rose-800';
      case 'C': return 'text-cyan-400 bg-cyan-950/40 border-cyan-800';
      case 'G': return 'text-amber-400 bg-amber-950/40 border-amber-800';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Base Viewer ({sequence.length} bp)</span>
        <div className="flex gap-2 font-mono">
          <span className="text-emerald-400">A</span>
          <span className="text-rose-400">T</span>
          <span className="text-cyan-400">C</span>
          <span className="text-amber-400">G</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 font-mono text-xs max-h-48 overflow-y-auto p-2 bg-slate-950 rounded-lg">
        {sequence.split('').map((char, index) => (
          <span key={index} className={`px-1.5 py-0.5 rounded border ${getBaseColor(char)}`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}