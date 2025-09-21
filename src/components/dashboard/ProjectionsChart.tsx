import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getCartesianGridConfig, getXAxisConfig, getYAxisConfig, chartMargins } from '../../utils/chartConfig';
import { useProjectionsData } from '../../hooks/useDashboardData';

const ProjectionsChart = memo(() => {
  const transformedData = useProjectionsData();

  return (
    <div className="projection-card">
      {/* Title */}
      <h3 className="projection-card-title">Projections vs Actuals</h3>
      
      {/* Chart Container */}
      <div className="projection-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transformedData}
            margin={chartMargins.projectionsChart}
            barCategoryGap={8}
            className="projection-chart"
          >
            <CartesianGrid {...getCartesianGridConfig()} />
            <ReferenceLine 
              y={0} 
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
              dataKey="actual"
              stackId="a"
              radius={[0, 0, 4, 4] as [number, number, number, number]}
              barSize={20}
              className="projection-bar-actual"
            />
            <Bar 
              dataKey="projectedGap"
              stackId="a"
              fillOpacity={0.5}
              radius={[4, 4, 0, 0] as [number, number, number, number]}
              barSize={20}
              className="projection-bar-projected"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

ProjectionsChart.displayName = 'ProjectionsChart';

export default ProjectionsChart;
