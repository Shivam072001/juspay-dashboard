export default function ChartsSection() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Chart</h3>
        <div className="h-48 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Chart Component</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Breakdown</h3>
        <div className="h-48 bg-gradient-to-r from-green-50 to-green-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Pie Chart Component</span>
        </div>
      </div>
    </div>
  );
}
