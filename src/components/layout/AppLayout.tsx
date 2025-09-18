import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import RightPanel from './RightPanel/RightPanel'
import DashboardContainer from '../dashboard/DashboardContainer'

export default function AppLayout() {
  return (
    <div className="grid grid-cols-[212px_1fr_280px] grid-rows-[auto_1fr] h-screen w-[1440px] mx-auto">
      {/* Sidebar */}
      <div className="row-span-full border-r border-gray-200">
        <Sidebar />
      </div>
      
      {/* Header */}
      <div className="col-span-2 border-b border-gray-200 p-4">
        <Header />
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        <DashboardContainer />
      </div>
      
      {/* Right Panel */}
      <div className="border-l border-gray-200 p-4">
        <RightPanel />
      </div>
    </div>
  );
}
