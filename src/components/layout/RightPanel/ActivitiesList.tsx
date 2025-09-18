export default function ActivitiesList() {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Activities</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div className="text-sm text-gray-600">John completed task</div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div className="text-sm text-gray-600">Sarah updated project</div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
          <div className="text-sm text-gray-600">Mike added comment</div>
        </div>
      </div>
    </div>
  );
}
