'use client';

export default function ConfidenceBar({ value, label, size = 'default' }) {
  const percentage = Math.round((value || 0) * 100);
  
  let color = 'bg-green-500';
  if (percentage < 70) color = 'bg-red-500';
  else if (percentage < 85) color = 'bg-yellow-500';

  const height = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-gray-600 min-w-[100px]">{label}</span>}
      <div className={`flex-1 bg-gray-200 rounded-full ${height}`}>
        <div
          className={`${height} rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label || 'Confidence'}: ${percentage}%`}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 min-w-[40px] text-right">{percentage}%</span>
    </div>
  );
}

