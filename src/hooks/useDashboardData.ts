import { useMemo } from 'react';
import { projectionsData, salesData, kpiData, productsData, locationData, revenueChartData } from '../data/mockDashboardData';
import { worldMapData } from '../data/worldMapLocations';
import type { WorldMapLocation } from '../data/worldMapLocations';

// Transform projections data for stacked bars - memoized
export const useProjectionsData = () => {
  return useMemo(() => {
    return projectionsData.map(item => ({
      month: item.month,
      actual: item.actual,
      projectedGap: item.projected - item.actual
    }));
  }, []);
};

// Get active locations from world map data - memoized
export const useActiveLocations = () => {
  return useMemo(() => {
    return worldMapData.locations.filter(loc => loc.isActive);
  }, []);
};

// Transform sales data for legend - memoized
export const useSalesLegendData = () => {
  return useMemo(() => {
    return salesData.map(item => ({
      name: item.name,
      value: item.amount,
      color: item.color,
      darkColor: item.darkColor
    }));
  }, []);
};

// Transform revenue data for legend - memoized
export const useRevenueLegendData = () => {
  return useMemo(() => [
    { name: 'Current Week', value: '$58,211', color: '#1C1C1C', darkColor: '#C6C7F8' },
    { name: 'Previous Week', value: '$68,768', color: '#A8C5DA', darkColor: '#A8C5DA' }
  ], []);
};

// Calculate total sales percentage - memoized
export const useTotalSalesPercentage = () => {
  return useMemo(() => {
    const total = salesData.reduce((sum, item) => sum + item.value, 0);
    return Math.round(total);
  }, []);
};

// Memoized dashboard data hooks
export const useKPIData = () => useMemo(() => kpiData, []);
export const useProductsData = () => useMemo(() => productsData, []);
export const useLocationData = () => useMemo(() => locationData, []);
export const useRevenueChartData = () => useMemo(() => revenueChartData, []);
export const useSalesData = () => useMemo(() => salesData, []);

// Location click handler with optimized state updates
export const useLocationSelection = () => {
  const handleLocationClick = (
    currentSelected: WorldMapLocation | null,
    location: WorldMapLocation,
    setSelected: (location: WorldMapLocation | null) => void
  ) => {
    setSelected(currentSelected?.id === location.id ? null : location);
  };

  return { handleLocationClick };
};

// Performance monitoring hook for development
export const usePerformanceMonitor = (componentName: string) => {
  if (import.meta.env.DEV) {
    return useMemo(() => {
      const start = performance.now();
      return () => {
        const end = performance.now();
        console.log(`${componentName} render time: ${end - start}ms`);
      };
    }, [componentName]);
  }
  return () => {}; // No-op in production
};
