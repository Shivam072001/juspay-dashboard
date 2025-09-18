export default function SidebarTabs() {
  return (
    <div className="flex items-center gap-2 w-full">
      <button className="flex items-center justify-center gap-1 px-2 py-1 text-sm font-normal text-[rgba(28,28,28,0.4)] hover:bg-gray-50 rounded-lg">
        Favorites
      </button>
      <button className="flex items-center justify-center gap-1 px-2 py-1 text-sm font-normal text-[rgba(28,28,28,0.2)] hover:bg-gray-50 rounded-lg">
        Recently
      </button>
    </div>
  );
}
