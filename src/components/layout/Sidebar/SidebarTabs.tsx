import { memo, useState, useCallback } from 'react';

type TabType = 'favorites' | 'recently';

interface SidebarTabsProps {
  onTabChange?: (tab: TabType) => void;
}

const tabs: Array<{ id: TabType; label: string }> = [
  { id: 'favorites', label: 'Favorites' },
  { id: 'recently', label: 'Recently' }
];

function SidebarTabs({ onTabChange }: SidebarTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('favorites');

  const handleTabClick = useCallback((tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  }, [onTabChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, tab: TabType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tab);
    }
  }, [handleTabClick]);

  return (
    <div className="flex items-center gap-1 w-full" role="tablist" aria-label="Sidebar tabs">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`flex items-center justify-center gap-1 px-2 py-1 text-sm font-normal rounded-lg transition-all duration-150 ${
              isActive 
                ? 'text-[rgba(28,28,28,0.7)] bg-gray-50' 
                : 'text-[rgba(28,28,28,0.4)] hover:bg-gray-50 hover:text-[rgba(28,28,28,0.6)]'
            }`}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            tabIndex={isActive ? 0 : -1}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default memo(SidebarTabs);
