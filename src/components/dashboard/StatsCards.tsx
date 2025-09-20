import StatCard from './StatCard';
import { kpiData } from '../../data/mockDashboardData';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
      {kpiData.map((data, index) => (
        <StatCard key={index} data={data} />
      ))}
    </div>
  );
}
