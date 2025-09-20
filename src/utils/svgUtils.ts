// Utility functions for creating custom donut chart with rounded segment ends

export interface DonutSegment {
  value: number;
  color: string;
  name: string;
  amount: string;
}

export interface DonutConfig {
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  centerX: number;
  centerY: number;
}

/**
 * Convert percentage to radians
 */
export const percentToRadians = (percent: number): number => {
  return (percent / 100) * 2 * Math.PI;
};

/**
 * Calculate the end points of an arc for SVG path
 */
export const calculateArcPoints = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = {
    x: centerX + radius * Math.cos(startAngle),
    y: centerY + radius * Math.sin(startAngle),
  };
  
  const end = {
    x: centerX + radius * Math.cos(endAngle),
    y: centerY + radius * Math.sin(endAngle),
  };
  
  return { start, end };
};

/**
 * Create SVG path for a donut segment with rounded ends
 */
export const createDonutSegmentPath = (
  config: DonutConfig,
  startPercent: number,
  endPercent: number
): string => {
  const { centerX, centerY, innerRadius, outerRadius } = config;
  
  // Start from -90 degrees (12 o'clock position) and go clockwise
  const startAngle = percentToRadians(startPercent) - Math.PI / 2;
  const endAngle = percentToRadians(endPercent) - Math.PI / 2;
  
  // Calculate points for outer arc
  const outerStart = calculateArcPoints(centerX, centerY, outerRadius, startAngle, endAngle);
  const innerStart = calculateArcPoints(centerX, centerY, innerRadius, startAngle, endAngle);
  
  // Determine if arc is large (> 180 degrees)
  const largeArcFlag = (endPercent - startPercent) > 50 ? 1 : 0;
  
  // Create the path for a segment
  // We'll use stroke instead of fill to get rounded ends
  const pathData = `
    M ${outerStart.start.x} ${outerStart.start.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerStart.end.x} ${outerStart.end.y}
  `;
  
  return pathData.trim();
};

/**
 * Calculate cumulative percentages for segments
 */
export const calculateSegmentPositions = (segments: DonutSegment[]) => {
  let cumulative = 0;
  return segments.map((segment) => {
    const start = cumulative;
    const end = cumulative + segment.value;
    cumulative += segment.value;
    return {
      ...segment,
      startPercent: start,
      endPercent: end,
    };
  });
};

/**
 * Calculate the middle angle of a segment for positioning labels/tooltips
 */
export const getSegmentMiddleAngle = (startPercent: number, endPercent: number): number => {
  const middlePercent = (startPercent + endPercent) / 2;
  return percentToRadians(middlePercent) - Math.PI / 2;
};

/**
 * Get position for label or tooltip based on segment middle
 */
export const getLabelPosition = (
  centerX: number,
  centerY: number,
  radius: number,
  startPercent: number,
  endPercent: number
) => {
  const angle = getSegmentMiddleAngle(startPercent, endPercent);
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
};
