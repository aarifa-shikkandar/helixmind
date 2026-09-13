import React from 'react';
import { useAnalysis } from '../hooks/useAnalysis';
import RiskScore from '../components/RiskScore';
import ConfidenceScore from '../components/ConfidenceScore';
import FeatureImportance from '../components/FeatureImportance';

export default function Prediction() {
  const { currentAnalysis } = useAnalysis();

  const mockData = {
    risk_score: 0.74,
    confidence_score: 0.92,
    patient_id: 'PAT-88401',
    top_feature_importance: {
      gc_content: 0.45,
      kmer_ATG: 0.30,
      sequence_length: 0.15,
      mutation_density: 0.10,
    },
  };

  const data = currentAnalysis || mockData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Prediction Results</h1>
        <p className="text-sm text-slate-400">Patient Reference ID: {data.patient_id || 'PAT-DEMO'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskScore score={data.risk_score || 0.74} />
        <ConfidenceScore confidence={data.confidence_score || 0.92} />
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">ML Model Feature Importance</h3>
        <FeatureImportance features={data.top_feature_importance} />
      </div>
    </div>
  );
}