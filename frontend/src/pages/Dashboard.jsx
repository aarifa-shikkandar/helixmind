import React from 'react';
import { Link } from 'react-router-dom';
import { Dna, Activity, FileCheck, ArrowUpRight } from 'lucide-react';
import RiskChart from '../components/RiskChart';
import AnalysisCard from '../components/AnalysisCard';

export default function Dashboard() {
  const stats = [
    { label: 'Analyses Processed', value: '1,284', icon: Dna, change: '+12%' },
    { label: 'High Risk Flagged', value: '42', icon: Activity, change: '-3%' },
    { label: 'Reports Exported', value: '890', icon: FileCheck, change: '+18%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Precision Intelligence Dashboard</h1>
        <p className="text-sm text-slate-400">Genomic overview and latest prediction metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</h3>
                <span className="text-xs text-emerald-400 flex items-center gap-0.5 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> {stat.change} this month
                </span>
              </div>
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Risk Profile Spectrum</h3>
          <RiskChart />
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Run New Analysis</h3>
            <p className="text-sm text-slate-400 mb-6">Upload raw sequencing data or enter sequence string to generate predictions.</p>
          </div>
          <Link
            to="/dna-analysis"
            className="w-full text-center bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-3 px-4 rounded-lg transition-colors block"
          >
            Launch DNA Pipeline
          </Link>
        </div>
      </div>
    </div>
  );
}