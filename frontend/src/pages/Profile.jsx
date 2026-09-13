import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">User Profile</h1>
      <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg">
        <User className="w-5 h-5 text-cyan-400" />
        <div>
          <div className="text-xs text-slate-400">Full Name</div>
          <div className="text-slate-200 text-sm font-medium">{user?.full_name || 'Dr. Precision Specialist'}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg">
        <Mail className="w-5 h-5 text-cyan-400" />
        <div>
          <div className="text-xs text-slate-400">Email</div>
          <div className="text-slate-200 text-sm font-medium">{user?.email || 'specialist@helixmind.ai'}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-lg">
        <Shield className="w-5 h-5 text-cyan-400" />
        <div>
          <div className="text-xs text-slate-400">Role & Access</div>
          <div className="text-slate-200 text-sm font-medium">Genomics Analyst / Lead Researcher</div>
        </div>
      </div>
    </div>
  );
}