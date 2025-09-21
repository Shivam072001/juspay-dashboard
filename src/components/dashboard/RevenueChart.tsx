import { memo } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, LineChart } from 'recharts';
import { getCartesianGridConfig, getXAxisConfig, getYAxisConfig, chartMargins } from '../../utils/chartConfig';
import { useRevenueChartData, useRevenueLegendData } from '../../hooks/useDashboardData';

const RevenueChart = memo(() => {
  const revenueData = useRevenueChartData();
  const legendData = useRevenueLegendData();

  return (
    <div className="revenue-card">
      {/* Header with title and legend */}
      <div className="revenue-card-header">
        <h3 className="revenue-card-title">Revenue</h3>
        <span className="revenue-card-separator">|</span>
        <div className="revenue-legend">
          {legendData.map((item, index) => (
            <div key={index} className="revenue-legend-item">
              <div 
                className="revenue-legend-dot" 
                style={{ backgroundColor: item.color }}
              />
              <span className="revenue-legend-text">
                {item.name} {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="revenue-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={chartMargins.revenueChart}
            className="revenue-chart"
          >
            <CartesianGrid {...getCartesianGridConfig()} />
            <XAxis 
              dataKey="month" 
              {...getXAxisConfig(10)}
            />
            <YAxis 
              {...getYAxisConfig({
                domain: [0, 35],
                ticks: [0, 10, 20, 30],
                tickFormatter: (value) => value === 0 ? '0' : `${value}M`,
                dx: -10
              })}
            />
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke="#A8C5DA"
              strokeWidth={3}
              fill="none"
              dot={{ 
                fill: '#A8C5DA', 
                stroke: '#A8C5DA', 
                strokeWidth: 2, 
                r: 3 
              }}
              activeDot={{ 
                r: 4, 
                stroke: '#A8C5DA', 
                strokeWidth: 2, 
                fill: '#A8C5DA' 
              }}
              className="revenue-line-previous"
            />
            <Line
              type="monotone"
              dataKey="currentWeek"
              stroke="#1C1C1C"
              strokeWidth={3}
              fill="none"
              dot={{ 
                fill: '#1C1C1C', 
                stroke: '#1C1C1C', 
                strokeWidth: 2, 
                r: 3 
              }}
              activeDot={{ 
                r: 4, 
                stroke: '#1C1C1C', 
                strokeWidth: 2, 
                fill: '#1C1C1C' 
              }}
              className="revenue-line-current"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
