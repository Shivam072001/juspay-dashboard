import { memo, useCallback } from 'react';
import GenericList from './GenericList';
import type { Notification } from '../../../types/rightPanel';

interface NotificationsListProps {
  showActions?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  onNotificationDoubleClick?: (notification: Notification) => void;
  className?: string;
}

function NotificationsList({
  showActions = true,
  onNotificationClick,
  onNotificationDoubleClick,
  className
}: NotificationsListProps) {
  // Handle notification click with proper typing
  const handleItemClick = useCallback((item: Notification | any) => {
    if ('icon' in item && 'iconBg' in item) {
      onNotificationClick?.(item as Notification);
    }
  }, [onNotificationClick]);

  // Handle notification double-click with proper typing
  const handleItemDoubleClick = useCallback((item: Notification | any) => {
    if ('icon' in item && 'iconBg' in item) {
      onNotificationDoubleClick?.(item as Notification);
    }
  }, [onNotificationDoubleClick]);

  return (
    <GenericList
      type="notifications"
      title="Notifications"
      showCount={true}
      showClearAll={showActions}
      onItemClick={handleItemClick}
      onItemDoubleClick={handleItemDoubleClick}
      className={className}
      emptyStateMessage="No new notifications"
    />
  );
}

export default memo(NotificationsList);
