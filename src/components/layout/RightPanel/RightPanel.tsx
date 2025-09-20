import { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import NotificationsList from './NotificationsList';
import ActivitiesList from './ActivitiesList';
import ContactsList from './ContactsList';
import { RightPanelProvider } from '../../../contexts/NotificationsContext';
import { useRightPanel } from '../../../hooks/useRightPanel';
import { useDebounce } from '../../../hooks/useDebounce';
import type { Notification, Activity, Contact } from '../../../types/rightPanel';

interface RightPanelProps {
  className?: string;
  isCollapsible?: boolean;
  showSearch?: boolean;
  showTabs?: boolean;
  onNotificationClick?: (notification: Notification) => void;
  onActivityClick?: (activity: Activity) => void;
  onContactClick?: (contact: Contact) => void;
}

// Enhanced search component
const SearchBar = memo(({ 
  value, 
  onChange, 
  onClear, 
  placeholder = "Search..." 
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClear();
      searchRef.current?.blur();
    }
  }, [onClear]);

  return (
    <div className="relative mb-4">
      <input
        ref={searchRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 pl-9 pr-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-150"
        aria-label="Search notifications, activities, and contacts"
      />
      
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {/* Clear button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-150 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

// Tab navigation component
const TabNavigation = memo(({ 
  activeTab, 
  onTabChange, 
  unreadCount 
}: {
  activeTab: 'notifications' | 'activities' | 'contacts';
  onTabChange: (tab: 'notifications' | 'activities' | 'contacts') => void;
  unreadCount: number;
}) => {
  const tabs = [
    { id: 'notifications' as const, label: 'Notifications', count: unreadCount },
    { id: 'activities' as const, label: 'Activities' },
    { id: 'contacts' as const, label: 'Contacts' }
  ];

  return (
    <div className="flex bg-gray-50 rounded-lg p-1 mb-4" role="tablist" aria-label="Right panel sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
        >
          {tab.label}
          {tab.count !== undefined && tab.count > 0 && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
});

TabNavigation.displayName = 'TabNavigation';

function RightPanelContent({
  className = '',
  isCollapsible = false,
  showSearch = true,
  showTabs = false,
  onNotificationClick,
  onActivityClick,
  onContactClick
}: RightPanelProps) {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    isCollapsed,
    setIsCollapsed,
    unreadNotificationsCount
  } = useRightPanel();

  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Sync debounced search with context
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setLocalSearchQuery(value);
  }, []);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setLocalSearchQuery('');
    setSearchQuery('');
  }, [setSearchQuery]);

  // Handle tab change
  const handleTabChange = useCallback((tab: 'notifications' | 'activities' | 'contacts') => {
    setActiveTab(tab);
    // Optionally clear search when switching tabs
    if (localSearchQuery) {
      handleSearchClear();
    }
  }, [setActiveTab, localSearchQuery, handleSearchClear]);

  // Handle collapse toggle
  const handleCollapseToggle = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  // Panel classes with responsive design
  const panelClasses = useMemo(() => [
    'h-full bg-white transition-all duration-300 ease-in-out flex flex-col',
    isCollapsed ? 'w-16' : 'w-[280px]',
    className
  ].filter(Boolean).join(' '), [isCollapsed, className]);

  // Render content based on active tab or show all
  const renderContent = useMemo(() => {
    if (showTabs) {
      switch (activeTab) {
        case 'notifications':
          return (
            <div id="notifications-panel" role="tabpanel" aria-labelledby="notifications-tab">
              <NotificationsList 
                onNotificationClick={onNotificationClick}
                className="flex-1"
              />
            </div>
          );
        case 'activities':
          return (
            <div id="activities-panel" role="tabpanel" aria-labelledby="activities-tab">
              <ActivitiesList 
                onActivityClick={onActivityClick}
                className="flex-1"
              />
            </div>
          );
        case 'contacts':
          return (
            <div id="contacts-panel" role="tabpanel" aria-labelledby="contacts-tab">
              <ContactsList 
                onContactClick={onContactClick}
                className="flex-1"
              />
            </div>
          );
      }
    }

    // Show all sections when not using tabs
    return (
      <div className="flex flex-col gap-6">
        <NotificationsList onNotificationClick={onNotificationClick} />
        <ActivitiesList onActivityClick={onActivityClick} />
        <ContactsList onContactClick={onContactClick} />
      </div>
    );
  }, [showTabs, activeTab, onNotificationClick, onActivityClick, onContactClick]);

  return (
    <aside 
      className={panelClasses}
      style={{ padding: isCollapsed ? '20px 8px' : '20px' }}
      aria-label="Right panel with notifications, activities, and contacts"
    >
      {/* Header with collapse toggle */}
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-900">
            {showTabs ? 'Activity' : 'Overview'}
          </h2>
        )}
        
        {isCollapsible && (
          <button
            onClick={handleCollapseToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label={isCollapsed ? 'Expand right panel' : 'Collapse right panel'}
            title={isCollapsed ? 'Expand right panel' : 'Collapse right panel'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* Search bar */}
          {showSearch && (
            <SearchBar
              value={localSearchQuery}
              onChange={handleSearchChange}
              onClear={handleSearchClear}
              placeholder="Search notifications, activities..."
            />
          )}

          {/* Tab navigation */}
          {showTabs && (
            <TabNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              unreadCount={unreadNotificationsCount}
            />
          )}
        </>
      )}

      {/* Content area - scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {isCollapsed ? (
          /* Collapsed view - show summary icons */
          <div className="flex flex-col items-center gap-4">
            {unreadNotificationsCount > 0 && (
              <div className="relative p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-150 cursor-pointer">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Full view */
          renderContent
        )}
      </div>

      {/* Footer with status info */}
      {!isCollapsed && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            {searchQuery && `Searching for "${searchQuery}"`}
          </div>
        </div>
      )}
    </aside>
  );
}

function RightPanel(props: RightPanelProps) {
  return (
    <RightPanelProvider>
      <RightPanelContent {...props} />
    </RightPanelProvider>
  );
}

export default memo(RightPanel);
