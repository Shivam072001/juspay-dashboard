import { memo } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, LineChart } from 'recharts';
import { getCartesianGridConfig, getXAxisConfig, getYAxisConfig, chartMargins } from '../../utils/chartConfig';
import { useRevenueChartData, useRevenueLegendData } from '../../hooks/useDashboardData';
import { useTheme } from '../../contexts/ThemeContext';

const RevenueChart = memo(() => {
  const revenueData = useRevenueChartData();
  const legendData = useRevenueLegendData();
  const { theme: currentTheme } = useTheme();
  
  // Get theme-aware colors from legend data
  const currentWeekColor = currentTheme === 'dark' && legendData[0].darkColor 
    ? legendData[0].darkColor 
    : legendData[0].color;
  const previousWeekColor = currentTheme === 'dark' && legendData[1].darkColor 
    ? legendData[1].darkColor 
    : legendData[1].color;

  return (
    <div className="revenue-card">
      <div className="revenue-chart-container">
        <div className="overflow-x-auto">
          <div style={{ minWidth: '500px' }}>
            {/* Header with title and legend - now inside scrollable area */}
            <div className="revenue-card-header" style={{ marginBottom: '16px' }}>
              <h3 className="revenue-card-title">Revenue</h3>
              <span className="revenue-card-separator">|</span>
              <div className="revenue-legend">
                {legendData.map((item, index) => (
                  <div key={index} className="revenue-legend-item">
                    <div 
                      className="revenue-legend-dot" 
                      style={{ 
                        backgroundColor: currentTheme === 'dark' && item.darkColor 
                          ? item.darkColor 
                          : item.color 
                      }}
                    />
                    <span className="revenue-legend-text">
                      {item.name} {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={chartMargins.default}
                className="revenue-chart"
              >
            <CartesianGrid {...getCartesianGridConfig()} />
            <XAxis 
              dataKey="month" 
              {...getXAxisConfig(10)}
            />
            <YAxis 
              {...getYAxisConfig({
                domain: [0, 30],
                tickFormatter: (value) => value === 0 ? '0' : `${value}M`,
                dx: -12,
                width: 44,
                textAnchor: 'end',
                dominantBaseline: 'text-after-edge'
              })}
              tickCount={4}
            />
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke={previousWeekColor}
              strokeWidth={3}
              fill="none"
              dot={{ 
                fill: previousWeekColor, 
                stroke: previousWeekColor, 
                strokeWidth: 2, 
                r: 3 
              }}
              activeDot={{ 
                r: 4, 
                stroke: previousWeekColor, 
                strokeWidth: 2, 
                fill: previousWeekColor 
              }}
              className="revenue-line-previous"
            />
            <Line
              type="monotone"
              dataKey="currentWeek"
              stroke={currentWeekColor}
              strokeWidth={3}
              fill="none"
              dot={{ 
                fill: currentWeekColor, 
                stroke: currentWeekColor, 
                strokeWidth: 2, 
                r: 3 
              }}
              activeDot={{ 
                r: 4, 
                stroke: currentWeekColor, 
                strokeWidth: 2, 
                fill: currentWeekColor 
              }}
              className="revenue-line-current"
            />
          </LineChart>
        </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
