import { memo, useCallback } from 'react';
import GenericList from './GenericList';
import type { Activity } from '../../../types/rightPanel';

interface ActivitiesListProps {
  showActions?: boolean;
  onActivityClick?: (activity: Activity) => void;
  onActivityDoubleClick?: (activity: Activity) => void;
  className?: string;
}

function ActivitiesList({
  showActions = true,
  onActivityClick,
  onActivityDoubleClick,
  className
}: ActivitiesListProps) {
  // Handle activity click with proper typing
  const handleItemClick = useCallback((item: Activity | any) => {
    if ('avatar' in item && !('name' in item)) {
      onActivityClick?.(item as Activity);
    }
  }, [onActivityClick]);

  // Handle activity double-click with proper typing
  const handleItemDoubleClick = useCallback((item: Activity | any) => {
    if ('avatar' in item && !('name' in item)) {
      onActivityDoubleClick?.(item as Activity);
    }
  }, [onActivityDoubleClick]);

  return (
    <GenericList
      type="activities"
      title="Activities"
      showCount={false}
      showClearAll={showActions}
      onItemClick={handleItemClick}
      onItemDoubleClick={handleItemDoubleClick}
      className={className}
      emptyStateMessage="No recent activities"
    />
  );
}

export default memo(ActivitiesList);
