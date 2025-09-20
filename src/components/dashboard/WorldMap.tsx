import { locationData } from '../../data/mockDashboardData';

export default function WorldMap() {
  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Revenue by Location</h3>
      </div>
      
      <div className="flex items-start gap-6">
        {/* World Map Visualization from Figma */}
        <div className="flex-shrink-0 relative">
          <div className="w-[154px] h-[82px]">
            <img 
              src="/src/assets/icons/world-map-complete.svg"
              alt="World Map"
              className="w-full h-full drop-shadow-sm" 
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.01))' }}
            />
            
            {/* Location markers positioned exactly as per Figma coordinates */}
            <div className="absolute inset-0">
              {/* Location marker 1: (16.21, 26) */}
              <div 
                className="absolute w-2 h-2 bg-[#1C1C1C] rounded-full border border-white"
                style={{ 
                  left: '16.21px', 
                  top: '26px',
                  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Location marker 2: (37.49, 31) */}
              <div 
                className="absolute w-2 h-2 bg-[#1C1C1C] rounded-full border border-white"
                style={{ 
                  left: '37.49px', 
                  top: '31px',
                  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Location marker 3: (110.43, 48) */}
              <div 
                className="absolute w-2 h-2 bg-[#1C1C1C] rounded-full border border-white"
                style={{ 
                  left: '110.43px', 
                  top: '48px',
                  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))',
                  transform: 'translate(-50%, -50%)'
                }}
              />
              
              {/* Location marker 4: (127.66, 62) */}
              <div 
                className="absolute w-2 h-2 bg-[#1C1C1C] rounded-full border border-white"
                style={{ 
                  left: '127.66px', 
                  top: '62px',
                  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Location Stats */}
        <div className="flex-1 space-y-4">
          {locationData.map((location, index) => (
            <div key={index} className="space-y-1">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
