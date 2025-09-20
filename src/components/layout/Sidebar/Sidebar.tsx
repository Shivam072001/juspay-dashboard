import { memo, useState, useCallback, useMemo } from 'react';
import SidebarBrand from './SidebarBrand';
import SidebarTabs from './SidebarTabs';
import SidebarSection from './SidebarSection';
import { useSidebarMenu } from '../../../hooks/useSidebarMenu';
import { useDebounce } from '../../../hooks/useDebounce';

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
  className?: string;
}

function Sidebar({ isCollapsed = false, onCollapseToggle, className = '' }: SidebarProps) {
  const { menuData, searchItems } = useSidebarMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'favorites' | 'recently'>('favorites');
  
  // Debounce search to improve performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Memoized search results
  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    return searchItems(debouncedSearchQuery);
  }, [debouncedSearchQuery, searchItems]);

  // Filter menu data based on search
  const displayedMenuData = useMemo(() => {
    if (searchResults.length > 0) {
      // Create a filtered section with search results
      return [{
        id: 'search-results',
        title: `Search Results (${searchResults.length})`,
        items: searchResults
      }];
    }
    return menuData;
  }, [menuData, searchResults]);

  const handleTabChange = useCallback((tab: 'favorites' | 'recently') => {
    setActiveTab(tab);
    setSearchQuery(''); // Clear search when switching tabs
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const sidebarClasses = useMemo(() => [
    'h-full bg-white border-r border-gray-100 transition-all duration-300 ease-in-out',
    isCollapsed ? 'w-16' : 'w-[212px]',
    'flex flex-col',
    className
  ].filter(Boolean).join(' '), [isCollapsed, className]);

  return (
    <aside 
      className={sidebarClasses}
      style={{ padding: isCollapsed ? '20px 8px' : '20px 16px' }}
      aria-label="Main navigation"
      role="navigation"
    >
      {/* Brand section with collapse functionality */}
      <div className="mb-4 flex items-center justify-between">
        {!isCollapsed && (
          <SidebarBrand 
            onClick={() => {
              // Handle brand click - could navigate to home
              console.log('Brand clicked');
            }}
          />
        )}
        
        {/* Collapse toggle button */}
        {onCollapseToggle && (
          <button
            onClick={onCollapseToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
            >
              <path
                d="M10 12L6 8L10 4"
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
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 pl-8 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-colors duration-150"
                aria-label="Search navigation menu"
              />
              <svg
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21L16.5 16.5M19 11A8 8 0 1 1 3 11A8 8 0 0 1 19 11Z"
                />
              </svg>
              
              {/* Clear search button */}
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 transition-colors duration-150"
                  aria-label="Clear search"
                >
                  <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Favorites/Recently tabs - hide during search */}
          {!searchQuery && (
            <div className="mb-4">
              <SidebarTabs onTabChange={handleTabChange} />
            </div>
          )}
        </>
      )}

      {/* Navigation sections - scrollable area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {isCollapsed ? (
          /* Collapsed view - show only icons */
          <div className="space-y-2">
            {menuData.flatMap(section => section.items).filter(item => !item.children).map((item) => (
              <div
                key={item.id}
                className="flex justify-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                title={item.label}
              >
                {item.icon && item.icon !== 'dot' && (
                  <img 
                    src={item.icon} 
                    alt={item.label} 
                    width="20" 
                    height="20"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-150"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Full view - show complete menu */
          <>
            {displayedMenuData.map((section) => (
              <SidebarSection 
                key={section.id} 
                section={section} 
              />
            ))}
            
            {/* Show "No results" message when searching */}
            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No items found for "{searchQuery}"</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer/Status section */}
      {!isCollapsed && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 text-center">
            {activeTab === 'favorites' ? 'Favorites' : 'Recently used'}
          </div>
        </div>
      )}
    </aside>
  );
}

export default memo(Sidebar);
