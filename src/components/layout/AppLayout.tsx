import { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import RightPanel from './RightPanel/RightPanel'
import DashboardContainer from '../dashboard/DashboardContainer'
import OrderListPage from '../pages/OrderListPage'
import { usePanelContext } from '../../contexts/SidebarContext'
import { useNavigation } from '../../hooks/useNavigation'

export default function AppLayout() {
  const { isLeftPanelOpen, isRightPanelOpen, toggleLeftPanel, toggleRightPanel } = usePanelContext();
  const { getCurrentPage } = useNavigation();

  // Page router - render different components based on current page
  const renderCurrentPage = () => {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
      case 'ecommerce-orders':
        return <OrderListPage />;
      case 'default':
      default:
        return <DashboardContainer />;
    }
  };

  // Responsive panel widths
  const getLeftPanelWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return isLeftPanelOpen ? '100%' : '0px'; // Mobile full width overlay
      return isLeftPanelOpen ? '212px' : '0px';
    }
    return isLeftPanelOpen ? '212px' : '0px';
  };

  const getRightPanelWidth = () => {
    if (typeof window !== 'undefined') {
      // Mobile: Full width overlay when open
      if (window.innerWidth < 768) {
        return isRightPanelOpen ? '100%' : '0px';
      }
      // Tablet and Desktop: Fixed width when open
      return isRightPanelOpen ? '280px' : '0px';
    }
    return isRightPanelOpen ? '280px' : '0px';
  };

  const leftPanelWidth = getLeftPanelWidth();
  const rightPanelWidth = getRightPanelWidth();
  
  // Mobile overlay for sidebar
  const isMobileOverlay = typeof window !== 'undefined' && window.innerWidth < 768 && isLeftPanelOpen;
  
  // Mobile overlay for right panel
  const isRightPanelMobileOverlay = typeof window !== 'undefined' && window.innerWidth < 768 && isRightPanelOpen;

  // Handle responsive behavior on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Keep panels open on desktop/tablet
      } else {
        // On mobile, you might want to auto-close panels when switching to mobile view
        // Uncomment the lines below if you want this behavior:
        // if (isLeftPanelOpen) toggleLeftPanel();
        // if (isRightPanelOpen) toggleRightPanel();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLeftPanelOpen, isRightPanelOpen]);

  return (
    <>
      {/* Mobile sidebar overlay backdrop */}
      {isMobileOverlay && (
        <div 
          className="sidebar-backdrop active"
          onClick={toggleLeftPanel}
        />
      )}
      
      {/* Mobile right panel overlay backdrop */}
      {isRightPanelMobileOverlay && (
        <div 
          className="sidebar-backdrop active"
          onClick={toggleRightPanel}
          style={{ zIndex: 40 }}
        />
      )}
      
      <div className="flex h-screen w-full max-w-none xl:mx-auto transition-all duration-300 ease-in-out relative">
        {/* Left Sidebar */}
        <div 
          className={`sidebar ${isMobileOverlay ? 'mobile-open' : ''} ${isLeftPanelOpen ? 'expanded' : 'collapsed'}`}
          style={{ 
            width: isMobileOverlay ? '300px' : leftPanelWidth
          }}
        >
          {isLeftPanelOpen && <Sidebar />}
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div className="border-b border-border bg-background z-30 flex-shrink-0 theme-transition">
            <Header />
          </div>
          
          {/* Page Content */}
          <div className="p-4 md:p-6 overflow-auto bg-background flex-1 theme-transition">
            {renderCurrentPage()}
          </div>
        </div>
        
        {/* Right Panel */}
        <div 
          className={`border-l border-border bg-background theme-transition overflow-hidden flex-shrink-0 ${
            isRightPanelOpen ? 'opacity-100' : 'opacity-0'
          } ${typeof window !== 'undefined' && window.innerWidth < 768 && isRightPanelOpen ? 'fixed top-0 right-0 h-full z-50' : ''}`}
          style={{ width: rightPanelWidth }}
        >
          {isRightPanelOpen && <RightPanel />}
        </div>
      </div>
    </>
  );
}
