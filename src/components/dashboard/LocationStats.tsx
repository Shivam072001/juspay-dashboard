import { memo } from 'react';
import { useLocationData } from '../../hooks/useDashboardData';
import { componentStyles, theme } from '../../styles/theme';

const LocationStats = memo(() => {
  const locationData = useLocationData();

  return (
    <div className="space-y-6">
      {locationData.map((location, index) => (
        <div key={index} className="space-y-1">
          {/* Location name and value */}
          <div className="flex items-center justify-between">
            <span className={componentStyles.text.xs}>{location.name}</span>
            <span className="text-xs text-gray-900 font-medium">{location.value}</span>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-[#A8C5DA] rounded-full ${theme.transitions.slow}`}
              style={{ width: `${location.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

LocationStats.displayName = 'LocationStats';

export default LocationStats;
