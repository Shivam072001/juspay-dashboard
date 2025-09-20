export interface WorldMapLocation {
  id: string;
  name: string;
  coordinates: {
    x: number; // SVG coordinate (0-154)
    y: number; // SVG coordinate (0-82)
  };
  country: string;
  value: string;
  progress: number; // 0-100 for progress bar
  revenue?: number;
  color?: string;
  isActive?: boolean;
}

export interface WorldMapConfig {
  viewBox: {
    width: number;
    height: number;
  };
  locations: WorldMapLocation[];
}

// World map location data - easily configurable
export const worldMapData: WorldMapConfig = {
  viewBox: {
    width: 154,
    height: 82
  },
  locations: [
    {
      id: "san-francisco",
      name: "San Francisco",
      coordinates: { x: 16.21, y: 26 },
      country: "USA",
      value: "$72,490",
      progress: 95,
      revenue: 72490,
      color: "#1C1C1C",
      isActive: true
    },
    {
      id: "new-york",
      name: "New York",
      coordinates: { x: 37.49, y: 31 },
      country: "USA", 
      value: "$64,382",
      progress: 80,
      revenue: 64382,
      color: "#1C1C1C",
      isActive: true
    },
    {
      id: "singapore",
      name: "Singapore",
      coordinates: { x: 110.43, y: 48 },
      country: "Singapore",
      value: "$58,472",
      progress: 70,
      revenue: 58472,
      color: "#1C1C1C",
      isActive: true
    },
    {
      id: "sydney",
      name: "Sydney", 
      coordinates: { x: 127.66, y: 62 },
      country: "Australia",
      value: "$49,325",
      progress: 60,
      revenue: 49325,
      color: "#1C1C1C",
      isActive: true
    }
  ]
};

// Helper function to add new location
export const addLocation = (location: Omit<WorldMapLocation, 'id'>): WorldMapLocation => {
  return {
    ...location,
    id: location.name.toLowerCase().replace(/\s+/g, '-')
  };
};

// Helper function to get location by ID
export const getLocationById = (id: string): WorldMapLocation | undefined => {
  return worldMapData.locations.find(location => location.id === id);
};

// Helper function to get active locations
export const getActiveLocations = (): WorldMapLocation[] => {
  return worldMapData.locations.filter(location => location.isActive);
};

// Helper function to get location by name (case-insensitive)
export const getLocationByName = (name: string): WorldMapLocation | undefined => {
  return worldMapData.locations.find(
    location => location.name.toLowerCase() === name.toLowerCase()
  );
};

// Helper function to get city coordinates for external use
export const getCityCoordinates = (): Record<string, { x: number; y: number }> => {
  return worldMapData.locations.reduce((acc, location) => {
    acc[location.name] = location.coordinates;
    return acc;
  }, {} as Record<string, { x: number; y: number }>);
};

// Helper function to get total revenue from all locations
export const getTotalRevenue = (): number => {
  return worldMapData.locations.reduce((total, location) => {
    return total + (location.revenue || 0);
  }, 0);
};

// Type guard to check if a location is a WorldMapLocation
export const isWorldMapLocation = (obj: unknown): obj is WorldMapLocation => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as WorldMapLocation).id === 'string' &&
    typeof (obj as WorldMapLocation).name === 'string' &&
    typeof (obj as WorldMapLocation).coordinates === 'object' &&
    typeof (obj as WorldMapLocation).coordinates.x === 'number' &&
    typeof (obj as WorldMapLocation).coordinates.y === 'number'
  );
};
