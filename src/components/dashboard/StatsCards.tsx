import { memo } from 'react';
import StatCard from './StatCard';
import { useKPIData } from '../../hooks/useDashboardData';

const StatsCards = memo(() => {
  const kpiData = useKPIData();

  return (
    <div className="kpi-cards-container">
      {kpiData.map((data, index) => (
        <StatCard key={index} data={data} />
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
