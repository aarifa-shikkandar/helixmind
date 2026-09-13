export const formatPercentage = (val) => `${(val * 100).toFixed(1)}%`;
export const formatRiskLevel = (score) => {
  if (score > 0.7) return { label: 'High', color: 'text-rose-500 bg-rose-500/10' };
  if (score > 0.3) return { label: 'Moderate', color: 'text-amber-500 bg-amber-500/10' };
  return { label: 'Low', color: 'text-emerald-500 bg-emerald-500/10' };
};