import { memo } from 'react';
import StatCard from './StatCard';
import { useKPIData } from '../../hooks/useDashboardData';
import { theme } from '../../styles/theme';

const StatsCards = memo(() => {
  const kpiData = useKPIData();

  return (
    <div 
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing.xl,
        gridTemplateRows: 'auto auto'
      }}
    >
      {kpiData.map((data, index) => (
        <StatCard key={index} data={data} />
      ))}
    </div>
  );
});

StatsCards.displayName = 'StatsCards';

export default StatsCards;
