import React, { useState } from 'react';
import { dnaService } from '../services/dnaService';
import { useAnalysis } from '../hooks/useAnalysis';
import { useNavigate } from 'react-router-dom';

export default function DNAInputForm() {
  const [patientId, setPatientId] = useState('');
  const [sequence, setSequence] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentAnalysis } = useAnalysis();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dnaService.analyzeRawSequence(patientId, sequence);
      setCurrentAnalysis(result);
      navigate('/prediction');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Patient ID</label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="PAT-12345"
          required
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Raw Nucleotide Sequence</label>
        <textarea
          rows={6}
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          placeholder="ATCGGCTAAGCT..."
          required
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 font-mono text-xs text-slate-100 focus:outline-none focus:border-cyan-500 uppercase"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-semibold py-2.5 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Running Analysis...' : 'Submit Sequence'}
      </button>
    </form>
  );
}