import { memo, useCallback, useState, useRef, useEffect } from 'react';
import type { Notification, Activity, Contact } from '../../../types/rightPanel';
import SvgIcon, { type IconName } from '../../ui/SvgIcon';
import { useRightPanel } from '../../../hooks/useRightPanel';

// Generic item type that can handle all three types
type ListItem = Notification | Activity | Contact;

interface GenericListItemProps {
  item: ListItem;
  type: 'notification' | 'activity' | 'contact';
  isLast?: boolean;
  onClick?: (item: ListItem) => void;
  onDoubleClick?: (item: ListItem) => void;
}

// Type guards for better type safety
const isNotification = (item: ListItem, type: string): item is Notification => {
  return type === 'notification' && 'icon' in item && 'iconBg' in item;
};

const isActivity = (item: ListItem, type: string): item is Activity => {
  return type === 'activity' && 'avatar' in item && !('name' in item);
};

const isContact = (item: ListItem, type: string): item is Contact => {
  return type === 'contact' && 'name' in item && 'avatar' in item;
};

function GenericListItem({ 
  item, 
  type, 
  isLast = false, 
  onClick, 
  onDoubleClick 
}: GenericListItemProps) {
  const { isContactOnline, markNotificationAsRead } = useRightPanel();
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Handle click with proper type checking
  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    onClick?.(item);
    
    // Auto-mark notifications as read when clicked
    if (isNotification(item, type) && 'isRead' in item && !item.isRead) {
      markNotificationAsRead(item.id);
    }
  }, [item, type, onClick, markNotificationAsRead]);

  // Handle double-click
  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    onDoubleClick?.(item);
  }, [item, onDoubleClick]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event as any);
    }
  }, [handleClick]);

  // Auto-scroll into view for active items
  useEffect(() => {
    if (isNotification(item, type) && 'isRead' in item && !item.isRead && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible) {
        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [item, type]);

  // Render notification item
  if (isNotification(item, type)) {
    const notification = item;
    const isRead = 'isRead' in notification ? notification.isRead : false;
    
    return (
      <div 
        ref={itemRef}
        className={`flex gap-2 p-1 rounded-lg cursor-pointer theme-transition ${
          isRead ? 'opacity-70' : ''
        } ${isHovered ? 'bg-hover' : ''}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`Notification: ${notification.title}`}
        aria-pressed={isRead ? "true" : "false"}
      >
        {/* Icon */}
        <div 
          className="flex items-center justify-center rounded-lg p-1 w-6 h-6 flex-shrink-0 transition-transform duration-150"
          style={{ 
            backgroundColor: notification.iconBg,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {/* Check if icon is a valid SvgIcon name, otherwise use img fallback */}
          {['bug-beetle', 'user', 'broadcast'].includes(notification.icon) ? (
            <SvgIcon 
              name={notification.icon as IconName}
              width={16} 
              height={16}
              className="transition-opacity duration-150"
              style={{ opacity: isHovered ? 0.9 : 1 }}
              color="var(--color-sidebar-text-primary)"
            />
          ) : (
            <img 
              src={notification.icon} 
              alt="" 
              className="w-4 h-4 transition-opacity duration-150"
              style={{ opacity: isHovered ? 0.9 : 1 }}
              loading="lazy"
            />
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className={`text-sm font-normal leading-[1.4285714285714286] truncate theme-transition ${
            isRead ? 'text-muted-foreground' : 'text-foreground'
          }`}>
            {notification.title}
          </p>
          <p className="text-xs font-normal text-muted-foreground leading-[1.5] truncate">
            {notification.time}
          </p>
        </div>
        
        {/* Unread indicator */}
        {!isRead && (
          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 self-center animate-pulse" />
        )}
      </div>
    );
  }
  
  // Render activity item
  if (isActivity(item, type)) {
    const activity = item;
    
    return (
      <div 
        ref={itemRef}
        className={`flex gap-2 p-1 rounded-lg cursor-pointer theme-transition ${
          isHovered ? 'bg-hover' : ''
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`Activity: ${activity.title}`}
      >
        {/* Avatar with Timeline */}
        <div className="flex justify-center flex-shrink-0 relative">
          <img 
            src={activity.avatar} 
            alt="" 
            className={`w-6 h-6 rounded-full object-cover relative z-10 theme-transition ${
              isHovered ? 'ring-2 ring-primary/20 scale-105' : ''
            }`}
            loading="lazy"
          />
          {/* Timeline connector - maintaining exact same design */}
          {!isLast && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-3.5 bg-border"></div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-sm font-normal text-foreground leading-[1.4285714285714286] truncate theme-transition">
            {activity.title}
          </p>
          <p className="text-xs font-normal text-muted-foreground leading-[1.5] truncate">
            {activity.time}
          </p>
        </div>
      </div>
    );
  }
  
  // Render contact item
  if (isContact(item, type)) {
    const contact = item;
    const isOnline = isContactOnline(contact.id);
    
    return (
      <div 
        ref={itemRef}
        className={`flex gap-2 p-1 rounded-lg cursor-pointer theme-transition ${
          isHovered ? 'bg-hover' : ''
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`Contact: ${contact.name}${isOnline ? ' (online)' : ' (offline)'}`}
      >
        {/* Avatar with online status */}
        <div className="flex justify-center items-center flex-shrink-0 relative">
          <img 
            src={contact.avatar} 
            alt="" 
            className={`w-6 h-6 rounded-full object-cover theme-transition ${
              isHovered ? 'ring-2 ring-primary/20 scale-105' : ''
            }`}
            loading="lazy"
          />
          {/* Online indicator */}
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full animate-pulse" />
          )}
        </div>
        
        {/* Name with online status */}
        <div className="flex items-center flex-1 min-w-0">
          <p className={`text-sm font-normal leading-[1.4285714285714286] truncate theme-transition ${
            isOnline ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {contact.name}
          </p>
          {isOnline && (
            <span className="ml-2 text-xs text-green-600 font-medium">
              Online
            </span>
          )}
        </div>
      </div>
    );
  }
  
  return null;
}

export default memo(GenericListItem, (prevProps, nextProps) => {
  // Custom comparison for optimal re-rendering
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.type === nextProps.type &&
    prevProps.isLast === nextProps.isLast &&
    JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item)
  );
});
