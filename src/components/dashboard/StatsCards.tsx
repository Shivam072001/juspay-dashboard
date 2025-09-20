import StatCard from './StatCard';
import { kpiData } from '../../data/mockDashboardData';

export default function StatsCards() {
  return (
    <div 
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px',
        gridTemplateRows: 'auto auto'
      }}
    >
      {kpiData.map((data, index) => (
        <StatCard key={index} data={data} />
      ))}
    </div>
  );
}
