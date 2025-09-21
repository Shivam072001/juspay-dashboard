import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DonutSegment {
  name: string;
  value: number;
  amount: string;
  color: string;
  darkColor?: string; // Optional dark theme color
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
  segmentGap = 4,
  className = '',
  showPercentage = true,
  onSegmentHover,
  onSegmentLeave,
}: RoundedDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const { theme } = useTheme();

  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 2;
  const innerRadius = outerRadius - strokeWidth;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const totalGapInRadians = (segmentGap * data.length * Math.PI) / 180;
  const availableCircle = 2 * Math.PI - totalGapInRadians;

  let cumulativeAngle = 0;

  const segmentsWithPaths = data.map((segment) => {
    const proportion = segment.value / total;
    const segmentAngle = proportion * availableCircle;

    const startAngle = cumulativeAngle - Math.PI / 2;
    const endAngle = cumulativeAngle + segmentAngle - Math.PI / 2;

    // Outer arc start/end
    const x1 = centerX + outerRadius * Math.cos(startAngle);
    const y1 = centerY + outerRadius * Math.sin(startAngle);
    const x2 = centerX + outerRadius * Math.cos(endAngle);
    const y2 = centerY + outerRadius * Math.sin(endAngle);

    // Inner arc start/end
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;

    // Closed donut slice path
    const pathData = `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Q ${centerX} ${centerY} ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Q ${centerX} ${centerY} ${x1} ${y1}
      Z
    `;

    cumulativeAngle += segmentAngle + (segmentGap * Math.PI) / 180;

    return {
      ...segment,
      pathData,
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
        {segmentsWithPaths.map((segment, index) => {
          const isActive = activeIndex === index;
          return (
            <path
              key={`seg-${index}`}
              d={segment.pathData}
              fill={theme === 'dark' && segment.darkColor ? segment.darkColor : segment.color}
              className="transition-all duration-200 cursor-pointer"
              style={{
                filter: isActive ? 'drop-shadow(0px 2px 6px rgba(0,0,0,0.2))' : 'none'
              }}
              onMouseEnter={() => handleSegmentEnter(segment, index)}
              onMouseLeave={handleSegmentLeave}
            />
          );
        })}
      </svg>

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
