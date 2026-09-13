import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dna, Activity, History, User } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dna-analysis', label: 'DNA Analysis', icon: Dna },
    { to: '/prediction', label: 'Prediction', icon: Activity },
    { to: '/history', label: 'History', icon: History },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-73px)] p-4 flex flex-col gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        );
      })}
    </aside>
  );
}