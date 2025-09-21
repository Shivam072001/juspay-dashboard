import { useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import RightPanel from './RightPanel/RightPanel'
import DashboardContainer from '../dashboard/DashboardContainer'
import OrderListPage from '../pages/OrderListPage'
import { usePanelContext } from '../../contexts/SidebarContext'
import { useNavigation } from '../../contexts/NavigationContext'

export default function AppLayout() {
  const { isLeftPanelOpen, isRightPanelOpen, toggleLeftPanel } = usePanelContext();
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
      // Always show right panel on desktop, but can be collapsed
      if (window.innerWidth >= 1024) {
        return isRightPanelOpen ? '280px' : '0px';
      }
      // Hide completely on tablet and mobile
      return '0px';
    }
    return isRightPanelOpen ? '280px' : '0px';
  };

  const leftPanelWidth = getLeftPanelWidth();
  const rightPanelWidth = getRightPanelWidth();
  
  // Mobile overlay for sidebar
  const isMobileOverlay = typeof window !== 'undefined' && window.innerWidth < 768 && isLeftPanelOpen;

  // Close sidebar on mobile when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isLeftPanelOpen) {
        // Keep sidebar open on desktop/tablet
      } else if (window.innerWidth < 768 && !isLeftPanelOpen) {
        // Sidebar is closed on mobile
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLeftPanelOpen]);

  return (
    <>
      {/* Mobile sidebar overlay backdrop */}
      {isMobileOverlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleLeftPanel}
        />
      )}
      
      <div className="flex h-screen w-full max-w-none xl:mx-auto transition-all duration-300 ease-in-out relative">
        {/* Left Sidebar */}
        <div 
          className={`border-r border-border theme-transition overflow-hidden bg-background flex-shrink-0 ${
            isLeftPanelOpen ? 'opacity-100' : 'opacity-0'
          } ${isMobileOverlay ? 'fixed left-0 top-0 h-full z-50 shadow-xl' : ''}`}
          style={{ 
            width: leftPanelWidth,
            maxWidth: isMobileOverlay ? '300px' : leftPanelWidth
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
          } ${typeof window !== 'undefined' && window.innerWidth < 1024 ? 'hidden' : ''}`}
          style={{ width: rightPanelWidth }}
        >
          {isRightPanelOpen && <RightPanel />}
        </div>
      </div>
    </>
  );
}
