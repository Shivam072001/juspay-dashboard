export default function ContactsList() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Contacts</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">JD</span>
          </div>
          <span className="text-sm text-gray-700">John Doe</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">SW</span>
          </div>
          <span className="text-sm text-gray-700">Sarah Wilson</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">MJ</span>
          </div>
          <span className="text-sm text-gray-700">Mike Johnson</span>
        </div>
      </div>
    </div>
  );
}
