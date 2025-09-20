import type { WorldMapLocation } from '../data/worldMapLocations';
import { worldMapData } from '../data/worldMapLocations';

/**
 * Utility to help find coordinates for new locations
 * This helps developers position dots by clicking on the map
 */
export const getCoordinatesFromClick = (
  event: MouseEvent, 
  mapElement: HTMLElement
): { x: number; y: number } => {
  const rect = mapElement.getBoundingClientRect();
  const scaleX = worldMapData.viewBox.width / rect.width;
  const scaleY = worldMapData.viewBox.height / rect.height;
  
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  
  return {
    x: Math.round(x * 100) / 100, // Round to 2 decimal places
    y: Math.round(y * 100) / 100
  };
};

/**
 * Create a new location with auto-generated ID
 */
export const createLocation = (
  location: Omit<WorldMapLocation, 'id'>
): WorldMapLocation => {
  return {
    ...location,
    id: location.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
  };
};

/**
 * Validate location coordinates are within map bounds
 */
export const isValidCoordinates = (x: number, y: number): boolean => {
  return (
    x >= 0 && 
    x <= worldMapData.viewBox.width && 
    y >= 0 && 
    y <= worldMapData.viewBox.height
  );
};

/**
 * Find nearest location to given coordinates
 */
export const findNearestLocation = (
  x: number, 
  y: number, 
  maxDistance = 10
): WorldMapLocation | null => {
  let nearest: WorldMapLocation | null = null;
  let minDistance = maxDistance;

  for (const location of worldMapData.locations) {
    const distance = Math.sqrt(
      Math.pow(location.coordinates.x - x, 2) + 
      Math.pow(location.coordinates.y - y, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  }

  return nearest;
};

/**
 * Generate sample location data for testing
 */
export const generateSampleLocation = (
  name: string,
  country: string,
  x: number,
  y: number
): WorldMapLocation => {
  const baseRevenue = 30000 + Math.random() * 50000;
  
  return createLocation({
    name,
    country,
    coordinates: { x, y },
    value: `$${Math.round(baseRevenue).toLocaleString()}`,
    progress: Math.round(40 + Math.random() * 60),
    revenue: Math.round(baseRevenue),
    color: '#1C1C1C',
    isActive: true
  });
};

/**
 * Location data management helpers
 */
export const locationHelpers = {
  getAll: () => worldMapData.locations,
  getActive: () => worldMapData.locations.filter(loc => loc.isActive),
  getById: (id: string) => worldMapData.locations.find(loc => loc.id === id),
  getByCountry: (country: string) => worldMapData.locations.filter(loc => loc.country === country),
  
  // Format helpers
  formatRevenue: (revenue?: number) => 
    revenue ? `$${revenue.toLocaleString()}` : 'N/A',
    
  // Sorting helpers
  sortByRevenue: (locations: WorldMapLocation[]) => 
    [...locations].sort((a, b) => (b.revenue || 0) - (a.revenue || 0)),
    
  sortByProgress: (locations: WorldMapLocation[]) =>
    [...locations].sort((a, b) => b.progress - a.progress),
    
  sortByName: (locations: WorldMapLocation[]) =>
    [...locations].sort((a, b) => a.name.localeCompare(b.name))
};
