export default function SidebarTabs() {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button className="flex-1 py-2 px-3 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm">
        Favorites
      </button>
      <button className="flex-1 py-2 px-3 text-sm font-medium text-gray-500">
        Recently
      </button>
    </div>
  );
}
