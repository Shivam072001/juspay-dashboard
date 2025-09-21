import { chartTheme, theme } from '../styles/theme';

// Shared chart configurations to eliminate duplication
export const getCartesianGridConfig = () => ({
  strokeDasharray: 'none',
  stroke: 'rgba(28, 28, 28, 0.1)', // Light grid lines
  strokeWidth: 1,
  horizontal: true,
  vertical: false,
});

export const getXAxisConfig = (dy = 10) => ({
  axisLine: false,
  tickLine: false,
  tick: {
    ...chartTheme.axis.tick,
    textAnchor: 'middle' as const,
  },
  dy,
});

export const getYAxisConfig = (options?: {
  domain?: [number, number];
  ticks?: number[];
  tickFormatter?: (value: number) => string;
  dx?: number;
  width?: number;
  textAnchor?: 'inherit' | 'end' | 'middle' | 'start';
  dominantBaseline?: 'inherit' | 'auto' | 'alphabetic' | 'hanging' | 'ideographic' | 'mathematical' | 'middle' | 'text-after-edge' | 'use-script' | 'no-change' | 'reset-size' | 'central' | 'text-before-edge';
}) => ({
  axisLine: false,
  tickLine: false,
  tick: {
    ...chartTheme.axis.tick,
    textAnchor: options?.textAnchor || 'middle' as const,
    ...(options?.dominantBaseline && { dominantBaseline: options.dominantBaseline }),
  },
  domain: options?.domain || [0, 35],
  type: 'number' as const,
  ...(options?.ticks && { ticks: options.ticks }),
  ...(options?.tickFormatter && { tickFormatter: options.tickFormatter }),
  ...(options?.dx && { dx: options.dx }),
  ...(options?.width && { width: options.width }),
});

export const getLineConfig = (dataKey: string, color: string) => ({
  type: 'monotone' as const,
  dataKey,
  stroke: color,
  strokeWidth: theme.chart.line.strokeWidth,
  dot: { 
    fill: color, 
    stroke: color, 
    strokeWidth: 2, 
    r: theme.chart.line.dotRadius
  },
  activeDot: { 
    r: theme.chart.line.activeDotRadius, 
    stroke: color, 
    strokeWidth: 2, 
    fill: color 
  },
});

export const getBarConfig = (dataKey: string, color: string, options?: {
  stackId?: string;
  fillOpacity?: number;
  radius?: [number, number, number, number];
  barSize?: number;
}) => ({
  dataKey,
  fill: color,
  barSize: options?.barSize || theme.chart.bar.size,
  ...(options?.stackId && { stackId: options.stackId }),
  ...(options?.fillOpacity && { fillOpacity: options.fillOpacity }),
  ...(options?.radius && { radius: options.radius }),
});

// Common chart margin configurations
export const chartMargins = {
  default: chartTheme.margin.default,
  compact: chartTheme.margin.compact,
  revenueChart: {
    top: 16,
    right: 0,
    left: 16,
    bottom: 28,
  },
  projectionsChart: {
    top: 16,
    right: 0,
    left: 0,
    bottom: 0,
  },
};

// Common formatters
export const tickFormatters = {
  millions: (value: number) => value === 0 ? '0' : `${value}M`,
  currency: (value: number) => `$${value}K`,
  percentage: (value: number) => `${value}%`,
};
