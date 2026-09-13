import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function RiskChart({ data }) {
  const chartData = data || [
    { category: 'Oncology', score: 0.78 },
    { category: 'Cardiogenetics', score: 0.45 },
    { category: 'Neurogenetics', score: 0.22 },
    { category: 'Metabolic', score: 0.60 },
    { category: 'Immunology', score: 0.35 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#475569" />
          <Radar name="Risk Level" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}