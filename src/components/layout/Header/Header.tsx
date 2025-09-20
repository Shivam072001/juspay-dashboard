import { usePanelContext } from '../../../contexts/SidebarContext';

export default function Header() {
  const { toggleLeftPanel, toggleRightPanel } = usePanelContext();

  return (
    <div className="flex items-center justify-between w-full px-4 md:px-7 py-5 border-b border-[rgba(28,28,28,0.1)] bg-white">
      {/* Left Section: Icon-Breadcrumb */}
      <div className="flex items-center gap-2 md:gap-2">
        {/* Toggle buttons group */}
        <div className="flex items-center gap-2">
          {/* Left panel toggle button */}
          <button 
            onClick={toggleLeftPanel}
            className="group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/sidebar-duotone.svg" 
                alt="Toggle sidebar" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </button>

          {/* Star/Favorites button */}
          <button className="group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/star-duotone.svg" 
                alt="Favorites" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          <button className="px-2 py-1 text-sm font-normal text-[rgba(28,28,28,0.4)] hover:bg-gray-100 rounded-lg transition-all duration-200 hover:text-[rgba(28,28,28,0.6)]">
            Dashboards
          </button>
          <span className="text-sm font-normal text-[rgba(28,28,28,0.2)]">/</span>
          <button className="px-2 py-1 text-sm font-normal text-[#1C1C1C] hover:bg-gray-100 rounded-lg transition-all duration-200">
            Default
          </button>
        </div>
      </div>

      {/* Right Section: Search and Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search Bar */}
        <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-[rgba(28,28,28,0.05)] rounded-lg w-32 md:w-40 hover:bg-[rgba(28,28,28,0.08)] transition-all duration-200 focus-within:bg-[rgba(28,28,28,0.08)] focus-within:ring-2 focus-within:ring-[rgba(28,28,28,0.1)]">
          <div className="flex items-center gap-1 flex-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <img src="/src/assets/icons/search.svg" alt="Search" width="16" height="16" />
            </div>
            <span className="text-sm font-normal text-[rgba(28,28,28,0.2)] flex-1">Search</span>
          </div>
          <span className="text-sm font-normal text-[rgba(28,28,28,0.2)] hidden md:inline">⌘/</span>
        </div>

        {/* Action buttons group */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search button for mobile */}
          <button className="sm:hidden group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/search.svg" 
                alt="Search" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </button>

          {/* Theme toggle (Sun) */}
          <button className="group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/sun-duotone.svg" 
                alt="Toggle theme" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </button>

          {/* History/Clock button */}
          <button className="hidden md:block group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/clock-duotone.svg" 
                alt="History" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          </button>

          {/* Notifications (Bell) */}
          <button className="group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 relative">
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/bell-duotone.svg" 
                alt="Notifications" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            {/* Notification indicator */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-80"></div>
          </button>

          {/* Right panel toggle */}
          <button 
            onClick={toggleRightPanel}
            className="hidden lg:block group p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            title="Toggle right panel"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img 
                src="/src/assets/icons/sidebar-duotone.svg" 
                alt="Toggle right panel" 
                width="20" 
                height="20" 
                className="transition-transform duration-200 group-hover:scale-110"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
