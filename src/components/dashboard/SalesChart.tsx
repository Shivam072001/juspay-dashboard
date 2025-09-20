import { salesData } from '../../data/mockDashboardData';
import RoundedDonutChart from '../ui/RoundedDonutChart';

export default function SalesChart() {

  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl w-full flex flex-col items-center">
      <div className="w-full mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Total Sales</h3>
      </div>
      
      {/* Custom Rounded Donut Chart */}
      <div className="relative mb-6">
        <RoundedDonutChart 
          data={salesData}
          width={120}
          height={120}
          strokeWidth={20}
          segmentGap={6}
          showPercentage={true}
        />
      </div>
      
      {/* Legend */}
      <div className="w-full space-y-3">
        {salesData.map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white hover:bg-opacity-60 transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-900">{item.name}</span>
            </div>
            <span className="text-xs text-gray-900">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
