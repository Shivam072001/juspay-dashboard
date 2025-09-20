import type { KPIData } from '../../data/mockDashboardData';

interface StatCardProps {
  data: KPIData;
}

export default function StatCard({ data }: StatCardProps) {
  const { title, value, change, isPositive, bgColor } = data;
  
  return (
    <div 
      className="p-6 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{ backgroundColor: bgColor }}
    >
      {/* Title */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      
      {/* Value and Change */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-900">
          {value}
        </div>
        
        <div className="flex items-center gap-1">
          <span className={`text-xs font-normal ${isPositive ? 'text-gray-900' : 'text-gray-900'}`}>
            {change}
          </span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
            className={`${isPositive ? 'rotate-0' : 'rotate-180'}`}
          >
            <path 
              d="M1.5 4L8 12.5L14.5 4" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
