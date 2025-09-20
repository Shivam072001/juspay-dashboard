import { useState, useCallback, memo } from 'react';
import { worldMapData, getLocationValue } from '../../data/worldMapLocations';
import type { WorldMapLocation } from '../../data/worldMapLocations';
import DashboardCard from '../ui/DashboardCard';
import CoordinateFinder from '../ui/CoordinateFinder';
import { useActiveLocations, useLocationSelection } from '../../hooks/useDashboardData';
import { theme } from '../../styles/theme';

interface LocationMarkerProps {
  location: WorldMapLocation;
  onClick?: (location: WorldMapLocation) => void;
  onHover?: (location: WorldMapLocation | null) => void;
}

const LocationMarker = memo(({ location, onClick, onHover }: LocationMarkerProps) => {
  const handleClick = useCallback(() => onClick?.(location), [location, onClick]);
  const handleMouseEnter = useCallback(() => onHover?.(location), [location, onHover]);
  const handleMouseLeave = useCallback(() => onHover?.(null), [onHover]);

  return (
    <div 
      className={`absolute bg-[#1C1C1C] rounded-full border border-white cursor-pointer hover:scale-125 ${theme.transitions.transform}`}
      style={{ 
        width: '8px',
        height: '8px',
        left: `${location.coordinates.x}px`, 
        top: `${location.coordinates.y}px`,
        filter: theme.shadows.sm,
        transform: 'translate(-50%, -50%)',
        backgroundColor: location.color || theme.colors.primary
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${location.name}: ${getLocationValue(location)}`}
    />
  );
});

LocationMarker.displayName = 'LocationMarker';

const WorldMap = memo(() => {
  const [hoveredLocation, setHoveredLocation] = useState<WorldMapLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<WorldMapLocation | null>(null);
  
  const activeLocations = useActiveLocations();
  const { handleLocationClick } = useLocationSelection();

  const onLocationClick = useCallback((location: WorldMapLocation) => {
    handleLocationClick(selectedLocation, location, setSelectedLocation);
    console.log('Location clicked:', location);
  }, [selectedLocation, handleLocationClick]);

  const onLocationHover = useCallback((location: WorldMapLocation | null) => {
    setHoveredLocation(location);
  }, []);

  return (
    <DashboardCard title="Revenue by Location" titleClassName="text-sm font-semibold text-center text-[#1C1C1C]">
      
      <div className="space-y-4">
        {/* World Map Visualization - Programmatic */}
        <div className="flex justify-center">
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
              style={{ filter: theme.shadows.md }}
            />
            
            {/* Programmatically rendered location markers */}
            <div className="absolute inset-0">
              {activeLocations.map((location) => (
                <LocationMarker
                  key={location.id}
                  location={location}
                  onClick={onLocationClick}
                  onHover={onLocationHover}
                />
              ))}
            </div>
            
            {/* Hover tooltip - positioned smartly below marker */}
            {hoveredLocation && (
              <div 
                className="absolute bg-card border border-border text-foreground px-2 py-1 rounded text-xs pointer-events-none z-10 whitespace-nowrap shadow-md"
                style={{
                  left: `${hoveredLocation.coordinates.x}px`,
                  top: `${hoveredLocation.coordinates.y + 15}px`,
                  transform: 'translate(-50%, 0)'
                }}
              >
                <div className="font-medium">{hoveredLocation.name}</div>
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
        
        {/* Location Stats - Data-driven - Vertical Layout */}
        <div className="space-y-4">
          {activeLocations.map((location) => (
            <div 
              key={location.id} 
              className={`space-y-1 cursor-pointer ${theme.transitions.colors}`}
              onClick={() => onLocationClick(location)}
            >
              {/* Location name and value */}
              <div className="flex items-center justify-between">
                <span className={`text-xs ${
                  selectedLocation?.id === location.id 
                    ? 'text-primary font-semibold' 
                    : 'text-foreground'
                }`}>
                  {location.name}
                </span>
                <span className="text-xs text-foreground font-medium">{getLocationValue(location)}</span>
              </div>
              
              {/* Progress bar */}
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-[#A8C5DA] rounded-full ${theme.transitions.slow}`}
                  style={{ width: `${location.progress}%` }}
                />
              </div>
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
    </DashboardCard>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
