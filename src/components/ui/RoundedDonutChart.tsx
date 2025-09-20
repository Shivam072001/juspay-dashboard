import { useState } from 'react';

interface DonutSegment {
  name: string;
  value: number;
  amount: string;
  color: string;
}

interface RoundedDonutChartProps {
  data: DonutSegment[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  segmentGap?: number; // Gap between segments in degrees
  className?: string;
  showPercentage?: boolean;
  onSegmentHover?: (segment: DonutSegment, index: number) => void;
  onSegmentLeave?: () => void;
}

export default function RoundedDonutChart({
  data,
  width = 120,
  height = 120,
  strokeWidth = 20,
  segmentGap = 4, // Default 4 degree gap between segments
  className = '',
  showPercentage = true,
  onSegmentHover,
  onSegmentLeave,
}: RoundedDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (Math.min(width, height) / 2) - (strokeWidth / 2) - 2;

  // Calculate total and segment angles with gaps
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const totalGapInRadians = (segmentGap * data.length * Math.PI) / 180; // Convert degrees to radians
  const availableCircle = 2 * Math.PI - totalGapInRadians; // Available space after gaps
  
  let cumulativeAngle = 0; // Track cumulative angle including gaps
  
  const segmentsWithPaths = data.map((segment) => {
    // Calculate the proportion of this segment relative to total values
    const segmentProportion = segment.value / total;
    const segmentAngleRange = segmentProportion * availableCircle;
    
    // Start angle includes previous segments and their gaps
    const startAngle = cumulativeAngle - Math.PI / 2; // Start from top (12 o'clock)
    const endAngle = cumulativeAngle + segmentAngleRange - Math.PI / 2;
    
    // Calculate start and end points
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    // Create arc path
    const largeArcFlag = segmentAngleRange > Math.PI ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    
    // Update cumulative angle for next segment (include gap)
    cumulativeAngle += segmentAngleRange + (segmentGap * Math.PI) / 180;
    
    return {
      ...segment,
      pathData,
      startAngle,
      endAngle,
    };
  });

  const handleSegmentEnter = (segment: DonutSegment, index: number) => {
    setActiveIndex(index);
    onSegmentHover?.(segment, index);
  };

  const handleSegmentLeave = () => {
    setActiveIndex(undefined);
    onSegmentLeave?.();
  };

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.15)" />
          </filter>
        </defs>

        {segmentsWithPaths.map((segment, index) => {
          const isActive = activeIndex === index;
          
          return (
            <g key={`path-segment-${index}`}>
              {/* Main segment path */}
              <path
                d={segment.pathData}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round" // This creates the rounded caps!
                className="transition-all duration-200 cursor-pointer"
                filter={isActive ? 'url(#dropShadow)' : 'none'}
                onMouseEnter={() => handleSegmentEnter(segment, index)}
                onMouseLeave={handleSegmentLeave}
              />
              
              {/* Active state border - rendered on top */}
              {isActive && (
                <path
                  d={segment.pathData}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={strokeWidth + 4}
                  strokeLinecap="round"
                  opacity={0.8}
                  pointerEvents="none"
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Percentage display in center when hovering */}
      {showPercentage && activeIndex !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-xl px-3 py-2 rounded-lg">
            <span className="text-sm font-semibold text-white">
              {segmentsWithPaths[activeIndex]?.value}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
