import { memo } from 'react';
import type { KPIData } from '../../data/mockDashboardData';
import { theme } from '../../styles/theme';

interface StatCardProps {
  data: KPIData;
}

const StatCard = memo(({ data }: StatCardProps) => {
  const { title, value, change, isPositive, bgColor } = data;
  
  return (
      <div 
        className="w-full rounded-2xl"
        style={{ 
          backgroundColor: bgColor, 
          fontFamily: theme.typography.fontFamily,
          padding: theme.spacing.lg,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm
        }}
      >
      {/* Title */}
      <div>
        <h3 
          className="text-black" 
          style={{ 
            fontSize: theme.typography.sizes.sm, 
            lineHeight: theme.typography.lineHeights.normal, 
            fontWeight: theme.typography.weights.semibold,
            margin: 0,
            fontFamily: theme.typography.fontFamily,
            textAlign: 'left'
          }}
        >
          {title}
        </h3>
      </div>
      
      {/* Value and Change */}
      <div 
        className="flex items-center justify-between"
        style={{ width: '100%' }}
      >
        <div 
          className="text-black" 
          style={{ 
            fontSize: theme.typography.sizes.xl, 
            lineHeight: theme.typography.lineHeights.relaxed, 
            fontWeight: theme.typography.weights.semibold,
            fontFamily: theme.typography.fontFamily,
            flex: '1',
            textAlign: 'left'
          }}
        >
          {value}
        </div>
        
        <div 
          className="flex items-center flex-shrink-0" 
          style={{ 
            gap: theme.spacing.xs,
            marginLeft: theme.spacing.sm
          }}
        >
          <span 
            className="text-black whitespace-nowrap" 
            style={{ 
              fontSize: theme.typography.sizes.xs, 
              lineHeight: theme.typography.lineHeights.relaxed, 
              fontWeight: theme.typography.weights.normal,
              fontFamily: theme.typography.fontFamily,
              textAlign: 'left'
            }}
          >
            {change}
          </span>
          {isPositive ? (
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 13 8" 
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M6.95488 1.60777L12.5 0L11.1198 5.6061L9.39804 3.9532L6.62069 6.84627C6.52641 6.94448 6.39615 7 6.26 7C6.12385 7 5.99359 6.94448 5.89931 6.84627L3.86 4.72199L0.860694 7.84627C0.669457 8.04547 0.35294 8.05193 0.153735 7.86069C-0.0454709 7.66946 -0.0519304 7.35294 0.139307 7.15373L3.49931 3.65373C3.59359 3.55552 3.72385 3.5 3.86 3.5C3.99615 3.5 4.12641 3.55552 4.22069 3.65373L6.26 5.77801L8.67665 3.26067L6.95488 1.60777Z" 
                fill="#1C1C1C"
              />
            </svg>
          ) : (
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 13 8" 
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M12.3463 0.139307C12.5455 0.330544 12.5519 0.647061 12.3607 0.846267L9.00069 4.34627C8.90641 4.44448 8.77615 4.5 8.64 4.5C8.50385 4.5 8.37359 4.44448 8.27931 4.34627L6.24 2.22199L3.82335 4.73933L5.54513 6.39223L0 8L1.38019 2.3939L3.10197 4.0468L5.87931 1.15373C5.97359 1.05552 6.10385 1 6.24 1C6.37615 1 6.50641 1.05552 6.60069 1.15373L8.64 3.27801L11.6393 0.153735C11.8305 -0.0454709 12.1471 -0.0519304 12.3463 0.139307Z" 
                fill="#1C1C1C"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;
