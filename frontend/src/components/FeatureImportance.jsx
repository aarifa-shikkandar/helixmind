import React from 'react';

export default function FeatureImportance({ features = {} }) {
  const items = Object.entries(features);

  return (
    <div className="space-y-3">
      {items.map(([key, value]) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300 font-mono">
            <span>{key}</span>
            <span>{(value * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${value * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}