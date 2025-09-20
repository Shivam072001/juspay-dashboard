import { memo } from 'react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, LineChart } from 'recharts';
import DashboardCard from '../ui/DashboardCard';
import ChartLegend from '../ui/ChartLegend';
import { getCartesianGridConfig, getXAxisConfig, getYAxisConfig, getLineConfig, chartMargins } from '../../utils/chartConfig';
import { useRevenueChartData, useRevenueLegendData } from '../../hooks/useDashboardData';
import { theme } from '../../styles/theme';

const RevenueChart = memo(() => {
  const revenueData = useRevenueChartData();
  const legendData = useRevenueLegendData();

  return (
    <DashboardCard className="h-full flex flex-col gap-4">
      {/* Header with title and legend */}
      <div className="flex items-center gap-4 flex-wrap">
        <h3 
          style={{ 
            fontSize: theme.typography.sizes.sm, 
            lineHeight: theme.typography.lineHeights.normal, 
            fontWeight: theme.typography.weights.semibold,
            margin: 0,
            fontFamily: theme.typography.fontFamily,
            color: theme.colors.primary
          }}
        >
          Revenue
        </h3>
        <span 
          style={{ 
            fontSize: theme.typography.sizes.sm, 
            lineHeight: theme.typography.lineHeights.normal, 
            fontWeight: theme.typography.weights.normal,
            fontFamily: theme.typography.fontFamily,
            color: theme.colors.text.muted
          }}
        >
          |
        </span>
        <ChartLegend items={legendData} orientation="horizontal" />
      </div>
      
      <div style={{ height: '200px', flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={chartMargins.revenueChart}
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
            <Line {...getLineConfig('previousWeek', theme.colors.secondary)} />
            <Line {...getLineConfig('currentWeek', theme.colors.primary)} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
});

RevenueChart.displayName = 'RevenueChart';

export default RevenueChart;
