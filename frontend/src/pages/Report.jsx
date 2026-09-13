import React from 'react';
import ReportViewer from '../components/ReportViewer';

export default function Report() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-100">Clinical & Genomic Reports</h1>
      <ReportViewer />
    </div>
  );
}