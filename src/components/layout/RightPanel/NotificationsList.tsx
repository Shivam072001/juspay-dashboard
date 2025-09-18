export default function NotificationsList() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
          <div className="text-sm text-gray-600">Bug report received</div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div className="text-sm text-gray-600">New user registered</div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
          <div className="text-sm text-gray-600">System update complete</div>
        </div>
      </div>
    </div>
  );
}
