import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
      <h1 className="text-6xl font-bold text-cyan-400">404</h1>
      <p className="text-slate-400">The genomic sequence or route requested does not exist.</p>
      <Link to="/dashboard" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm">
        Return to Dashboard
      </Link>
    </div>
  );
}