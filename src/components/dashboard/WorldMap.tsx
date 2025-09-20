import { useState } from 'react';
import { worldMapData } from '../../data/worldMapLocations';
import type { WorldMapLocation } from '../../data/worldMapLocations';
import CoordinateFinder from '../ui/CoordinateFinder';

interface LocationMarkerProps {
  location: WorldMapLocation;
  onClick?: (location: WorldMapLocation) => void;
  onHover?: (location: WorldMapLocation | null) => void;
}

function LocationMarker({ location, onClick, onHover }: LocationMarkerProps) {
  return (
    <div 
      className="absolute w-2 h-2 bg-[#1C1C1C] rounded-full border border-white cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
      style={{ 
        left: `${location.coordinates.x}px`, 
        top: `${location.coordinates.y}px`,
        filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))',
        transform: 'translate(-50%, -50%)',
        backgroundColor: location.color || '#1C1C1C'
      }}
      onClick={() => onClick?.(location)}
      onMouseEnter={() => onHover?.(location)}
      onMouseLeave={() => onHover?.(null)}
      title={`${location.name}: ${location.value}`}
    />
  );
}

export default function WorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState<WorldMapLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<WorldMapLocation | null>(null);
  
  const activeLocations = worldMapData.locations.filter(loc => loc.isActive);

  const handleLocationClick = (location: WorldMapLocation) => {
    setSelectedLocation(selectedLocation?.id === location.id ? null : location);
    console.log('Location clicked:', location);
  };

  const handleLocationHover = (location: WorldMapLocation | null) => {
    setHoveredLocation(location);
  };

  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Revenue by Location</h3>
      </div>
      
      <div className="flex items-start gap-6">
        {/* World Map Visualization - Programmatic */}
        <div className="flex-shrink-0 relative">
          <div 
            className="relative"
            style={{ 
              width: `${worldMapData.viewBox.width}px`, 
              height: `${worldMapData.viewBox.height}px` 
            }}
          >
            {/* Base World Map SVG */}
            <img 
              src="/src/assets/icons/world-map-complete.svg"
              alt="World Map"
              className="w-full h-full drop-shadow-sm" 
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.01))' }}
            />
            
            {/* Programmatically rendered location markers */}
            <div className="absolute inset-0">
              {activeLocations.map((location) => (
                <LocationMarker
                  key={location.id}
                  location={location}
                  onClick={handleLocationClick}
                  onHover={handleLocationHover}
                />
              ))}
            </div>
            
            {/* Hover tooltip */}
            {hoveredLocation && (
              <div 
                className="absolute bg-gray-900 text-white px-2 py-1 rounded text-xs pointer-events-none z-10 whitespace-nowrap"
                style={{
                  left: `${hoveredLocation.coordinates.x + 10}px`,
                  top: `${hoveredLocation.coordinates.y - 30}px`,
                  transform: 'translate(-50%, 0)'
                }}
              >
                <div className="font-medium">{hoveredLocation.name}</div>
                <div className="text-gray-300">{hoveredLocation.value}</div>
              </div>
            )}
            
            {/* Coordinate Finder Utility */}
            <CoordinateFinder 
              viewBox={worldMapData.viewBox}
              onCoordinateFound={(coords) => {
                console.log('🎯 Found coordinates:', coords);
              }}
            />
          </div>
        </div>
        
        {/* Location Stats - Data-driven */}
        <div className="flex-1 space-y-4">
          {activeLocations.map((location) => (
            <div 
              key={location.id} 
              className={`space-y-1 p-2 rounded cursor-pointer transition-colors duration-200 ${
                selectedLocation?.id === location.id 
                  ? 'bg-blue-50 border border-blue-200' 
                  : hoveredLocation?.id === location.id
                  ? 'bg-gray-50'
                  : ''
              }`}
              onClick={() => handleLocationClick(location)}
            >
              {/* Location name and value */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-900">{location.name}</span>
                <span className="text-xs text-gray-900 font-medium">{location.value}</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#A8C5DA] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${location.progress}%` }}
                />
              </div>
              
              {/* Additional info when selected */}
              {selectedLocation?.id === location.id && (
                <div className="mt-2 text-xs text-gray-600">
                  <div>Country: {location.country}</div>
                  <div>Revenue: ${location.revenue?.toLocaleString()}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Debug info */}
      {import.meta.env.VITE_DEV_MODE === 'true' && (
        <div className="mt-4 text-xs text-gray-500">
          Active Locations: {activeLocations.length} | 
          Hovered: {hoveredLocation?.name || 'None'} | 
          Selected: {selectedLocation?.name || 'None'}
        </div>
      )}
    </div>
  );
}
