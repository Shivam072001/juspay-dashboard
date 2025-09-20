import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { salesData } from '../../data/mockDashboardData';
import { useState } from 'react';

export default function SalesChart() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-xl px-2 py-1 rounded-lg">
          <p className="text-xs text-white">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl flex flex-col items-center">
      <div className="w-full mb-4">
        <h3 className="text-sm font-semibold text-gray-900 text-center">Total Sales</h3>
      </div>
      
      {/* Pie Chart */}
      <div className="relative mb-6">
        <div className="w-30 h-30">
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {salesData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={activeIndex === index ? "#FFFFFF" : "none"}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
      
      {/* Tooltip positioned as shown in Figma */}
      {activeIndex === 0 && (
        <div className="absolute top-32 left-10 bg-gray-900 bg-opacity-80 backdrop-blur-xl px-2 py-1 rounded-lg">
          <span className="text-xs text-white">38.6%</span>
        </div>
      )}
    </div>
  );
}
