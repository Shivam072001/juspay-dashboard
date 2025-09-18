export default function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-2">$24,567</p>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-gray-500">Orders</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-2">1,234</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg border border-green-100">
        <h3 className="text-sm font-medium text-gray-500">Customers</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-2">567</p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">Growth</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-2">+12.5%</p>
      </div>
    </div>
  );
}
