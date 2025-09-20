import { lazy, Suspense, memo } from 'react';

// Lazy load dashboard components for better performance
const StatsCards = lazy(() => import('./StatsCards'));
const ProjectionsChart = lazy(() => import('./ProjectionsChart'));
const RevenueChart = lazy(() => import('./RevenueChart'));
const WorldMap = lazy(() => import('./WorldMap'));
const SalesChart = lazy(() => import('./SalesChart'));
const ProductsTable = lazy(() => import('./ProductsTable'));

// Loading fallback component
const ComponentLoader = memo(() => (
  <div className="bg-[#F7F9FB] p-6 rounded-2xl w-full h-40 animate-pulse flex items-center justify-center">
    <div className="text-sm text-gray-400">Loading...</div>
  </div>
));

ComponentLoader.displayName = 'ComponentLoader';

// Lazy wrapper components with suspense
export const LazyStatsCards = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <StatsCards />
  </Suspense>
));

export const LazyProjectionsChart = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <ProjectionsChart />
  </Suspense>
));

export const LazyRevenueChart = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <RevenueChart />
  </Suspense>
));

export const LazyWorldMap = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <WorldMap />
  </Suspense>
));

export const LazySalesChart = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <SalesChart />
  </Suspense>
));

export const LazyProductsTable = memo(() => (
  <Suspense fallback={<ComponentLoader />}>
    <ProductsTable />
  </Suspense>
));

// Set display names
LazyStatsCards.displayName = 'LazyStatsCards';
LazyProjectionsChart.displayName = 'LazyProjectionsChart';
LazyRevenueChart.displayName = 'LazyRevenueChart';
LazyWorldMap.displayName = 'LazyWorldMap';
LazySalesChart.displayName = 'LazySalesChart';
LazyProductsTable.displayName = 'LazyProductsTable';
