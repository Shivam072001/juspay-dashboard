import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import DashboardCard from '../ui/DashboardCard';
import { getCartesianGridConfig, getXAxisConfig, getYAxisConfig, getBarConfig, chartMargins } from '../../utils/chartConfig';
import { useProjectionsData } from '../../hooks/useDashboardData';
import { theme } from '../../styles/theme';

const ProjectionsChart = memo(() => {
  const transformedData = useProjectionsData();

  return (
    <DashboardCard title="Projections vs Actuals" className="h-full flex flex-col gap-4">
      
      <div style={{ height: '196px', flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={chartMargins.projectionsChart}
            barCategoryGap={theme.chart.bar.categoryGap}
          >
            <CartesianGrid {...getCartesianGridConfig()} />
            <ReferenceLine 
              y={0} 
              stroke="rgba(28, 28, 28, 0.3)" 
              strokeWidth={2}
            />
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
            <Bar 
              {...getBarConfig('actual', theme.colors.secondary, {
                stackId: 'a',
                radius: [0, 0, 4, 4] as [number, number, number, number],
                barSize: 20
              })}
            />
            <Bar 
              {...getBarConfig('projectedGap', theme.colors.secondary, {
                stackId: 'a',
                fillOpacity: 0.5,
                radius: [4, 4, 0, 0] as [number, number, number, number],
                barSize: 20
              })}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
});

ProjectionsChart.displayName = 'ProjectionsChart';

export default ProjectionsChart;
