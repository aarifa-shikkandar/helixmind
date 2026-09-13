import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { dnaService } from '../services/dnaService';
import { useAnalysis } from '../hooks/useAnalysis';

export default function DNAUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCurrentAnalysis } = useAnalysis();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await dnaService.uploadFile(file);
      setCurrentAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-8 text-center flex flex-col items-center justify-center">
      <div className="bg-cyan-500/10 p-4 rounded-full text-cyan-400 mb-4">
        <Upload className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-1">Upload Genomic Data File</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-sm">Select FASTA, VCF, or TXT raw sequencing files for automated feature extraction.</p>
      
      <input
        type="file"
        id="dna-file-input"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".fasta,.fa,.vcf,.txt"
      />
      
      <label htmlFor="dna-file-input" className="cursor-pointer flex items-center gap-2 border border-slate-600 hover:border-cyan-500 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors mb-4">
        <FileText className="w-4 h-4" />
        {file ? file.name : 'Choose File'}
      </label>

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full max-w-xs bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-slate-950 font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Processing...' : 'Start Extraction'}
      </button>
    </div>
  );
}