import { locationData } from '../../data/mockDashboardData';

export default function WorldMap() {
  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Revenue by Location</h3>
      </div>
      
      <div className="flex items-start gap-6">
        {/* World Map Visualization - More detailed matching Figma */}
        <div className="flex-shrink-0">
          <svg width="154" height="82" viewBox="0 0 154 82" fill="none" className="drop-shadow-sm">
            {/* Detailed world map shapes with proper geography */}
            <g opacity="0.5">
              {/* Greenland */}
              <path d="M45 8 L50 6 L55 8 L58 12 L56 18 L52 20 L47 18 L44 14 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* North America - more detailed */}
              <path d="M8 15 L15 12 L25 14 L35 16 L42 20 L45 25 L50 28 L52 35 L48 42 L45 48 L40 52 L35 48 L28 45 L20 42 L12 38 L8 32 L6 25 L8 18 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* South America */}
              <path d="M32 52 L35 50 L40 52 L42 58 L44 65 L42 72 L38 78 L35 80 L32 78 L30 72 L28 65 L29 58 L31 54 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Europe */}
              <path d="M68 16 L75 14 L82 16 L85 20 L83 25 L80 28 L75 30 L70 28 L66 25 L65 20 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Africa */}
              <path d="M65 32 L72 30 L78 32 L82 38 L84 45 L86 55 L84 65 L80 72 L75 75 L70 72 L65 65 L63 55 L64 45 L66 38 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Asia - detailed with multiple regions */}
              <path d="M88 12 L95 10 L105 8 L115 10 L125 12 L132 16 L138 22 L140 28 L138 35 L135 40 L130 42 L125 40 L118 38 L110 36 L102 34 L95 32 L90 28 L88 22 L89 16 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Russia - Northern Asia */}
              <path d="M85 8 L95 6 L110 4 L125 5 L140 8 L145 12 L142 18 L138 20 L130 18 L120 16 L108 14 L96 12 L88 10 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* India */}
              <path d="M98 42 L105 40 L112 42 L115 48 L112 54 L108 58 L103 56 L100 52 L98 48 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* China */}
              <path d="M105 22 L115 20 L125 22 L130 28 L128 35 L125 38 L118 36 L112 34 L108 30 L106 25 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Southeast Asia */}
              <path d="M115 45 L125 43 L132 45 L135 50 L133 55 L128 58 L122 56 L118 52 L116 48 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Australia */}
              <path d="M115 62 L125 60 L135 62 L140 68 L138 74 L132 76 L125 74 L118 72 L114 68 L115 64 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* New Zealand */}
              <path d="M135 75 L138 73 L140 76 L138 79 L135 78 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Japan */}
              <path d="M135 28 L138 26 L140 28 L141 32 L139 35 L136 33 L134 30 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
              
              {/* Madagascar */}
              <path d="M88 68 L90 66 L92 70 L90 74 L88 72 Z" 
                    fill="#A8C5DA" stroke="#FFFFFF" strokeWidth="0.25"/>
            </g>
            
            {/* Location markers with drop shadow effect */}
            <g>
              {/* New York */}
              <circle cx="30" cy="30" r="2.5" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1" 
                      style={{filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'}}/>
              
              {/* San Francisco */}
              <circle cx="18" cy="32" r="2.5" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1" 
                      style={{filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'}}/>
              
              {/* Sydney */}
              <circle cx="128" cy="70" r="2.5" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1" 
                      style={{filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'}}/>
              
              {/* Singapore */}
              <circle cx="125" cy="52" r="2.5" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1" 
                      style={{filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))'}}/>
            </g>
          </svg>
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
