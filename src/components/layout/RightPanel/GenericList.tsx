import { memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import GenericListItem from './GenericListItem';
import { useRightPanel } from '../../../hooks/useRightPanel';
import type { Notification, Activity, Contact } from '../../../types/rightPanel';

type ListType = 'notifications' | 'activities' | 'contacts';
type ListData = Notification[] | Activity[] | Contact[];

interface GenericListProps {
  type: ListType;
  title: string;
  showCount?: boolean;
  showClearAll?: boolean;
  emptyStateMessage?: string;
  onItemClick?: (item: Notification | Activity | Contact) => void;
  onItemDoubleClick?: (item: Notification | Activity | Contact) => void;
  className?: string;
}

// Action Menu Dropdown Component
const ActionMenu = memo(({ 
  type, 
  data, 
  unreadNotificationsCount, 
  onMarkAllRead, 
  onClearAll 
}: {
  type: ListType;
  data: ListData;
  unreadNotificationsCount: number;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }, []);

  const handleMarkAllRead = useCallback(() => {
    onMarkAllRead();
    setIsOpen(false);
  }, [onMarkAllRead]);

  const handleClearAll = useCallback(() => {
    onClearAll();
    setIsOpen(false);
  }, [onClearAll]);

  if (data.length === 0) return null;

  const hasMarkAsReadAction = type === 'notifications' && unreadNotificationsCount > 0;
  const hasClearAction = type !== 'contacts'; // Contacts don't have clear action

  if (!hasMarkAsReadAction && !hasClearAction) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="More actions"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 right-panel-dropdown">
          {hasMarkAsReadAction && (
            <button
              onClick={handleMarkAllRead}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 focus:outline-none focus:bg-blue-50"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark all as read
              </div>
            </button>
          )}
          
          {hasClearAction && (
            <button
              onClick={handleClearAll}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 focus:outline-none focus:bg-red-50"
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear all
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
});

ActionMenu.displayName = 'ActionMenu';

function GenericList({
  type,
  title,
  showCount = false,
  showClearAll = false,
  emptyStateMessage,
  onItemClick,
  onItemDoubleClick,
  className = ''
}: GenericListProps) {
  const {
    filteredNotifications,
    filteredActivities,
    filteredContacts,
    unreadNotificationsCount,
    markAllNotificationsAsRead,
    clearNotifications,
    clearActivities,
    searchQuery
  } = useRightPanel();

  // Get data based on type
  const data = useMemo((): ListData => {
    switch (type) {
      case 'notifications':
        return filteredNotifications;
      case 'activities':
        return filteredActivities;
      case 'contacts':
        return filteredContacts;
      default:
        return [];
    }
  }, [type, filteredNotifications, filteredActivities, filteredContacts]);

  // Get count for display
  const count = useMemo(() => {
    if (type === 'notifications') {
      return showCount ? unreadNotificationsCount : data.length;
    }
    return data.length;
  }, [type, data.length, unreadNotificationsCount, showCount]);

  // Handle clear all action
  const handleClearAll = useCallback(() => {
    switch (type) {
      case 'notifications':
        clearNotifications();
        break;
      case 'activities':
        clearActivities();
        break;
      // Contacts don't have a clear action
    }
  }, [type, clearNotifications, clearActivities]);

  // Handle mark all as read (notifications only)
  const handleMarkAllRead = useCallback(() => {
    if (type === 'notifications') {
      markAllNotificationsAsRead();
    }
  }, [type, markAllNotificationsAsRead]);

  // Render empty state
  const renderEmptyState = useCallback(() => {
    const defaultMessages = {
      notifications: searchQuery ? `No notifications found for "${searchQuery}"` : 'No notifications',
      activities: searchQuery ? `No activities found for "${searchQuery}"` : 'No activities',
      contacts: searchQuery ? `No contacts found for "${searchQuery}"` : 'No contacts'
    };

    return (
      <div className="text-center py-6">
        <p className="text-sm text-[rgba(28,28,28,0.4)]">
          {emptyStateMessage || defaultMessages[type]}
        </p>
      </div>
    );
  }, [type, searchQuery, emptyStateMessage]);

  // Generate title with count - always show count for notifications
  const displayTitle = useMemo(() => {
    if (type === 'notifications') {
      return `${title} (${unreadNotificationsCount})`;
    }
    if (showCount && count > 0) {
      return `${title} (${count})`;
    }
    return title;
  }, [title, showCount, count, type, unreadNotificationsCount]);

  return (
    <div className={`flex flex-col gap-2 self-stretch ${className}`}>
      {/* Title Section with Actions */}
      <div className="flex items-center justify-between px-2 py-1 self-stretch">
        <h3 className="text-sm font-semibold text-[#1C1C1C] leading-[1.4285714285714286]">
          {displayTitle}
        </h3>
        
        {/* Action Menu */}
        {showClearAll && (
          <ActionMenu
            type={type}
            data={data}
            unreadNotificationsCount={unreadNotificationsCount}
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
          />
        )}
      </div>
      
      {/* List Items */}
      <div className="flex flex-col gap-2" role="list" aria-label={title}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={item.id} role="listitem">
              <GenericListItem
                item={item}
                type={type === 'notifications' ? 'notification' : type === 'activities' ? 'activity' : 'contact'}
                isLast={index === data.length - 1}
                onClick={onItemClick}
                onDoubleClick={onItemDoubleClick}
              />
            </div>
          ))
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
}

export default memo(GenericList, (prevProps, nextProps) => {
  // Shallow comparison for props
  return (
    prevProps.type === nextProps.type &&
    prevProps.title === nextProps.title &&
    prevProps.showCount === nextProps.showCount &&
    prevProps.showClearAll === nextProps.showClearAll &&
    prevProps.emptyStateMessage === nextProps.emptyStateMessage &&
    prevProps.className === nextProps.className
  );
});
