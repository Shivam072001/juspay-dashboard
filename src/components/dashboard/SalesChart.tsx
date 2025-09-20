import { memo } from 'react';
import DashboardCard from '../ui/DashboardCard';
import ChartLegend from '../ui/ChartLegend';
import RoundedDonutChart from '../ui/RoundedDonutChart';
import { useSalesData, useSalesLegendData } from '../../hooks/useDashboardData';

const SalesChart = memo(() => {
  const salesData = useSalesData();
  const legendData = useSalesLegendData();

  return (
    <DashboardCard title="Total Sales" className="flex flex-col items-center">
      {/* Custom Rounded Donut Chart */}
      <div className="relative mb-6">
        <RoundedDonutChart 
          data={salesData}
          width={120}
          height={120}
          strokeWidth={20}
          segmentGap={6}
          showPercentage={true}
        />
      </div>
      
      {/* Legend */}
      <div className="w-full">
        <ChartLegend items={legendData} orientation="vertical" />
      </div>
    </DashboardCard>
  );
});

SalesChart.displayName = 'SalesChart';

export default SalesChart;
