import { memo, ReactNode } from 'react';
import { componentStyles } from '../../styles/theme';

interface DashboardCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  titleClassName?: string;
}

const DashboardCard = memo(({ 
  children, 
  title, 
  className = '', 
  style,
  titleClassName = componentStyles.title.small 
}: DashboardCardProps) => {
  return (
    <div 
      className={`${componentStyles.card.full} ${className}`}
      style={style}
    >
      {title && (
        <div className="mb-4">
          <h3 className={titleClassName}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';

export default DashboardCard;
