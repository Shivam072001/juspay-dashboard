export default function SidebarBrand() {
  return (
    <div className="flex items-center gap-2 p-1 w-full">
      <div className="flex items-center gap-2">
        <div className="w-[23px] h-6 rounded-full overflow-hidden">
          {/* ByeWind Logo - placeholder for now, should be actual logo image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">BW</span>
          </div>
        </div>
        <span className="text-sm font-normal text-[#1C1C1C]">ByeWind</span>
      </div>
    </div>
  );
}
