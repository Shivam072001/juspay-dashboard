import { memo } from 'react';
import {
  LazyStatsCards,
  LazyProjectionsChart,
  LazyRevenueChart,
  LazyWorldMap,
  LazySalesChart,
  LazyProductsTable
} from './LazyDashboard';
import { theme } from '../../styles/theme';

const DashboardContainer = memo(() => {
  return (
    <div className="w-full flex flex-col" style={{ gap: theme.spacing.xl }}>
      <h1 className="text-2xl font-bold text-foreground text-left">eCommerce</h1>
      
      {/* Row 1: Stats Cards (max-width) + Projections Chart (remaining space) */}
      <div className="flex flex-col lg:flex-row w-full" style={{ gap: theme.spacing.xl }}>
        <div className="w-full lg:w-auto lg:max-w-[520px] lg:flex-shrink-0">
          <LazyStatsCards />
        </div>
        <div className="w-full lg:flex-1 lg:min-w-0">
          <LazyProjectionsChart />
        </div>
      </div>
      
      {/* Row 2: Revenue Chart (70%) + World Map (30%) */}
      <div className="flex flex-col lg:flex-row w-full lg:items-stretch" style={{ gap: theme.spacing.xl }}>
        <div className="w-full lg:flex-[7] lg:min-w-0 flex">
          <LazyRevenueChart />
        </div>
        <div className="w-full lg:flex-[3] lg:min-w-0 flex">
          <LazyWorldMap />
        </div>
      </div>
      
      {/* Row 3: Products Table (70%) + Sales Chart (30%) */}
      <div className="flex flex-col lg:flex-row w-full lg:items-stretch" style={{ gap: theme.spacing.xl }}>
        <div className="w-full lg:flex-[7] lg:min-w-0 flex">
          <LazyProductsTable />
        </div>
        <div className="w-full lg:flex-[3] lg:min-w-0 flex">
          <LazySalesChart />
        </div>
      </div>
    </div>
  );
});

DashboardContainer.displayName = 'DashboardContainer';

export default DashboardContainer;
