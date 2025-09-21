import { memo } from 'react';
import { theme } from '../../styles/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface LegendItem {
  name: string;
  value?: string;
  color: string;
  darkColor?: string; // Optional dark theme color
}

interface ChartLegendProps {
  items: LegendItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const ChartLegend = memo(({ 
  items, 
  className = '',
  orientation = 'horizontal' 
}: ChartLegendProps) => {
  const { theme: currentTheme } = useTheme();
  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center gap-4 flex-wrap'
    : 'space-y-3';

  return (
    <div className={`${containerClass} ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={`flex items-center ${
            orientation === 'horizontal' ? 'gap-2' : 'justify-between py-2 px-3 rounded-lg hover:bg-hover theme-transition'
          }`}
        >
          <div className="flex items-center gap-2">
            <div 
              className={`${orientation === 'horizontal' ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full`}
              style={{ backgroundColor: currentTheme === 'dark' && item.darkColor ? item.darkColor : item.color }}
            />
            <span 
              className="text-xs text-foreground"
              style={{ 
                fontFamily: theme.typography.fontFamily,
                fontWeight: orientation === 'horizontal' ? theme.typography.weights.normal : theme.typography.weights.normal
              }}
            >
              {item.name} {orientation === 'horizontal' && item.value && ` ${item.value}`}
            </span>
          </div>
          {orientation === 'vertical' && item.value && (
            <span 
              className="text-xs text-foreground"
              style={{ fontFamily: theme.typography.fontFamily }}
            >
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
});

ChartLegend.displayName = 'ChartLegend';

export default ChartLegend;
