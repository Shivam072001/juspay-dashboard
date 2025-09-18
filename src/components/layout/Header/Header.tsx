export default function Header() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}
