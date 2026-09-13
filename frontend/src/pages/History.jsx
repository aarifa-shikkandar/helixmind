import React from 'react';
import AnalysisCard from '../components/AnalysisCard';

export default function History() {
  const records = [
    { id: '1', patientCode: 'PAT-9021', date: 'Aug 24, 2026', riskLevel: 'High' },
    { id: '2', patientCode: 'PAT-4412', date: 'Aug 22, 2026', riskLevel: 'Low' },
    { id: '3', patientCode: 'PAT-7789', date: 'Aug 19, 2026', riskLevel: 'Moderate' },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Historical Runs</h1>
      <div className="space-y-3">
        {records.map((r) => (
          <AnalysisCard key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
}