import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { projectionsData } from '../../data/mockDashboardData';

export default function ProjectionsChart() {
  // Transform data for stacked bars: bottom=actual, top=projected gap
  const transformedData = projectionsData.map(item => ({
    month: item.month,
    actual: item.actual,
    projectedGap: item.projected - item.actual
  }));

  return (
    <div 
      className="rounded-2xl h-full"
      style={{
        backgroundColor: '#F7F9FB',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <div>
        <h3 
          style={{ 
            fontSize: '14px', 
            lineHeight: '1.4285714285714286em', 
            fontWeight: 600,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            color: '#1C1C1C'
          }}
        >
          Projections vs Actuals
        </h3>
      </div>
      
      <div style={{ height: '196px', flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={{
              top: 16,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap={8}
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
              tick={{ 
                fontSize: 12, 
                fill: 'rgba(28, 28, 28, 0.4)',
                fontFamily: 'Inter, sans-serif',
                textAnchor: 'middle'
              }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fontSize: 12, 
                fill: 'rgba(28, 28, 28, 0.4)',
                fontFamily: 'Inter, sans-serif',
                textAnchor: 'end',
                dominantBaseline: 'text-after-edge'
              }}
              domain={[0, 30]}
              type="number"
              tickCount={4}
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`}
              dx={-12}
              width={44}
            />
            <Bar 
              dataKey="actual" 
              stackId="a"
              fill="#A8C5DA" 
              radius={[0, 0, 4, 4]}
              barSize={20}
            />
            <Bar 
              dataKey="projectedGap" 
              stackId="a"
              fill="#A8C5DA" 
              fillOpacity={0.5}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
