import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { projectionsData } from '../../data/mockDashboardData';

export default function ProjectionsChart() {
  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Projections vs Actuals</h3>
      </div>
      
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectionsData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
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
            <Bar 
              dataKey="projected" 
              fill="#A8C5DA" 
              opacity={0.5}
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
            <Bar 
              dataKey="actual" 
              fill="#A8C5DA" 
              radius={[4, 4, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
