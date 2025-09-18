import SidebarBrand from './SidebarBrand'
import SidebarTabs from './SidebarTabs'

export default function Sidebar() {
  return (
    <div className="w-[212px] h-full bg-white border-r border-gray-100" style={{ padding: '20px 16px' }}>
      {/* Name badge section */}
      <div className="mb-4">
      <SidebarBrand />
      </div>

      {/* Favorites/Recently tabs */}
      <div className="mb-4">
        <SidebarTabs />
      </div>

      {/* Basic navigation items */}
      <div className="mb-4 space-y-1">
        {/* Overview */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg">
          <div className="flex items-center justify-center w-4 h-4">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-sm font-normal text-[#1C1C1C]">Overview</span>
        </div>
        
        {/* Projects */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg">
          <div className="flex items-center justify-center w-4 h-4">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-sm font-normal text-[#1C1C1C]">Projects</span>
        </div>
      </div>

      {/* Dashboards section */}
      <div className="mb-4">
        <div className="px-3 py-1 mb-1">
          <h3 className="text-sm font-normal text-[rgba(28,28,28,0.4)]">Dashboards</h3>
        </div>
        
        <div className="space-y-1">
          {/* Default - Selected */}
          <div className="flex items-center justify-between px-2 py-1 bg-[rgba(28,28,28,0.05)] rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/chart-pie-slice-duotone.svg" alt="Chart" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Default</span>
            </div>
            <div className="w-1 h-4 bg-[#1C1C1C] rounded-sm"></div>
          </div>

          {/* eCommerce */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/shopping-bag-open-duotone.svg" alt="Shopping Bag" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">eCommerce</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>

          {/* Projects */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/folder-notch-duotone.svg" alt="Folder" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Projects</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>

          {/* Online Courses */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/book-open-duotone.svg" alt="Book" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Online Courses</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>
        </div>
      </div>

      {/* Pages section */}
      <div>
        <div className="px-3 py-1 mb-1">
          <h3 className="text-sm font-normal text-[rgba(28,28,28,0.4)]">Pages</h3>
        </div>
        
        <div className="space-y-1">
          {/* User Profile */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/identification-badge-duotone.svg" alt="ID Badge" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">User Profile</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-down.svg" alt="Arrow Down" width="16" height="16" />
            </div>
          </div>

          {/* Account */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/identification-card-duotone.svg" alt="ID Card" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Account</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>

          {/* Corporate */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/users-three-duotone.svg" alt="Users" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Corporate</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>

          {/* Blog */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/notebook-duotone.svg" alt="Notebook" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Blog</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center justify-between px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5">
                <img src="/src/assets/icons/chats-teardrop-duotone.svg" alt="Chat" width="20" height="20" />
              </div>
              <span className="text-sm font-normal text-[#1C1C1C]">Social</span>
            </div>
            <div className="flex items-center justify-center w-4 h-4">
              <img src="/src/assets/icons/arrow-line-right.svg" alt="Arrow Right" width="16" height="16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
