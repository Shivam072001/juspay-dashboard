import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, LineChart } from 'recharts';
import { revenueChartData } from '../../data/mockDashboardData';

export default function RevenueChart() {
  return (
    <div 
      className="rounded-2xl w-full h-full"
      style={{
        backgroundColor: '#F7F9FB',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Header with title and legend */}
      <div 
        className="flex items-center gap-4"
        style={{ flexWrap: 'wrap' }}
      >
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
          Revenue
        </h3>
        <span 
          style={{ 
            fontSize: '14px', 
            lineHeight: '1.4285714285714286em', 
            fontWeight: 400,
            fontFamily: 'Inter, sans-serif',
            color: 'rgba(28, 28, 28, 0.2)'
          }}
        >
          |
        </span>
        
        {/* Legend */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center"
            style={{ 
              padding: '2px 8px 2px 4px',
              gap: '8px'
            }}
          >
            <div 
              style={{ 
                width: '16px', 
                height: '16px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: '#1C1C1C' 
                }}
              />
            </div>
            <span 
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.5em', 
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                color: '#1C1C1C'
              }}
            >
              Current Week  $58,211
            </span>
          </div>
          
          <div 
            className="flex items-center"
            style={{ 
              padding: '2px 8px 2px 4px',
              gap: '8px'
            }}
          >
            <div 
              style={{ 
                width: '16px', 
                height: '16px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: '#A8C5DA' 
                }}
              />
            </div>
            <span 
              style={{ 
                fontSize: '12px', 
                lineHeight: '1.5em', 
                fontWeight: 400,
                fontFamily: 'Inter, sans-serif',
                color: '#1C1C1C'
              }}
            >
              Previous Week  $68,768
            </span>
          </div>
        </div>
      </div>
      
      <div style={{ height: '200px', flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueChartData}
            margin={{
              top: 16,
              right: 0,
              left: 16,
              bottom: 28,
            }}
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
                textAnchor: 'middle'
              }}
              domain={[0, 35]}
              ticks={[0, 10, 20, 30]}
              tickFormatter={(value) => value === 0 ? '0' : `${value}M`}
              dx={-10}
            />
            <Line 
              type="monotone" 
              dataKey="previousWeek" 
              stroke="#A8C5DA" 
              strokeWidth={3}
              dot={{ fill: '#A8C5DA', stroke: '#A8C5DA', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: '#A8C5DA', strokeWidth: 2, fill: '#A8C5DA' }}
            />
            <Line 
              type="monotone" 
              dataKey="currentWeek" 
              stroke="#1C1C1C" 
              strokeWidth={3}
              dot={{ fill: '#1C1C1C', stroke: '#1C1C1C', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: '#1C1C1C', strokeWidth: 2, fill: '#1C1C1C' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
