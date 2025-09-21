import { useState, useCallback, memo } from 'react';
import { worldMapData, getLocationValue } from '../../data/worldMapLocations';
import type { WorldMapLocation } from '../../data/worldMapLocations';
import CoordinateFinder from '../ui/CoordinateFinder';
import { useActiveLocations, useLocationSelection } from '../../hooks/useDashboardData';
import worldMapSvg from '../../assets/icons/world-map-complete.svg';

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
      className="location-marker"
      style={{ 
        left: `${location.coordinates.x}px`, 
        top: `${location.coordinates.y}px`,
        backgroundColor: location.color || '#1C1C1C'
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
  }, [selectedLocation, handleLocationClick]);

  const onLocationHover = useCallback((location: WorldMapLocation | null) => {
    setHoveredLocation(location);
  }, []);

  return (
    <div className="location-card">
      {/* Title */}
      <h3 className="location-card-title">Revenue by Location</h3>
      
      <div className="location-card-content">
        {/* World Map Visualization - Programmatic */}
        <div className="location-map-container">
          <div 
            className="location-map-wrapper"
            style={{ 
              width: `${worldMapData.viewBox.width}px`, 
              height: `${worldMapData.viewBox.height}px` 
            }}
          >
            {/* Base World Map SVG */}
            <img 
              src={worldMapSvg}
              alt="World Map"
              className="location-map-image"
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
                className="location-tooltip"
                style={{
                  left: `${hoveredLocation.coordinates.x}px`,
                  top: `${hoveredLocation.coordinates.y + 15}px`
                }}
              >
                <div className="location-tooltip-name">{hoveredLocation.name}</div>
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
        <div className="location-stats-container">
          {activeLocations.map((location) => (
            <div 
              key={location.id} 
              className="location-stats-item"
              onClick={() => onLocationClick(location)}
            >
              {/* Location name and value */}
              <div className="location-stats-header">
                <span className={`location-stats-name ${
                  selectedLocation?.id === location.id ? 'selected' : ''
                }`}>
                  {location.name}
                </span>
                <span className="location-stats-value">{getLocationValue(location)}</span>
              </div>
              
              {/* Progress bar */}
              <div className="location-progress-container">
                <div 
                  className="location-progress-bar"
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
    </div>
  );
});

WorldMap.displayName = 'WorldMap';

export default WorldMap;
