import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { revenueChartData } from '../../data/mockDashboardData';

export default function RevenueChart() {
  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl h-full">
      {/* Header with title and legend */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Revenue</h3>
          <span className="text-sm text-gray-400">|</span>
          
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span className="text-xs text-gray-900">Current Week  $58,211</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#A8C5DA]"></div>
              <span className="text-xs text-gray-900">Previous Week  $68,768</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="currentWeekGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1C1C1C" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#1C1C1C" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="previousWeekGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A8C5DA" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#A8C5DA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="none" 
              stroke="rgba(28, 28, 28, 0.05)" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'rgba(28, 28, 28, 0.4)' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'rgba(28, 28, 28, 0.4)' }}
              domain={[0, 35]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => `${value}M`}
              dx={-10}
            />
            <Area 
              type="monotone" 
              dataKey="previousWeek" 
              stroke="#A8C5DA" 
              fillOpacity={1} 
              fill="url(#previousWeekGradient)"
              strokeWidth={3}
              dot={false}
            />
            <Area 
              type="monotone" 
              dataKey="currentWeek" 
              stroke="#1C1C1C" 
              fillOpacity={1} 
              fill="url(#currentWeekGradient)"
              strokeWidth={3}
              dot={{ fill: '#1C1C1C', stroke: '#FFFFFF', strokeWidth: 1, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
