import SidebarBrand from './SidebarBrand'
import SidebarTabs from './SidebarTabs'
import SidebarSection from './SidebarSection'
import SidebarMenuItem from './SidebarMenuItem'

export default function Sidebar() {
  return (
    <div className="p-4 h-full bg-gray-50">
      <SidebarBrand />
      <div className="mt-6">
        <SidebarTabs />
      </div>
      <div className="mt-6">
        <SidebarSection />
        <div className="mt-2 space-y-1">
          <SidebarMenuItem />
          <SidebarMenuItem />
          <SidebarMenuItem />
        </div>
      </div>
    </div>
  );
}
