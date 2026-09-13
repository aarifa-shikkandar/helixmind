import React from 'react';
import DNASequenceViewer from '../components/DNASequenceViewer';
import GeneticFeatureTable from '../components/GeneticFeatureTable';
import HealthSummary from '../components/HealthSummary';

export default function Results() {
  const sampleFeatures = {
    gc_content: 0.542,
    sequence_length: 1240,
    kmer_atg_frequency: 0.041,
    transversion_ratio: 1.25,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Comprehensive Analysis Results</h1>
      <HealthSummary />
      <DNASequenceViewer sequence="ATCGGCTAGCTAGCTAGCTAAGCGCTATCGATCGATCGATCGAATCG" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-200">Extracted Genetic Vectors</h3>
        <GeneticFeatureTable features={sampleFeatures} />
      </div>
    </div>
  );
}