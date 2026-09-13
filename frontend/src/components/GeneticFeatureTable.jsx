import React from 'react';

export default function GeneticFeatureTable({ features = {} }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase font-mono">
          <tr>
            <th className="px-4 py-3">Feature Name</th>
            <th className="px-4 py-3">Extracted Value</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 text-slate-300">
          {Object.entries(features).map(([key, val]) => (
            <tr key={key} className="hover:bg-slate-800/40">
              <td className="px-4 py-3 font-mono text-xs text-cyan-300">{key}</td>
              <td className="px-4 py-3">{typeof val === 'number' ? val.toFixed(4) : val}</td>
              <td className="px-4 py-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Computed
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}