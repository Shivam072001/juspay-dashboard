import { productsData } from '../../data/mockDashboardData';

export default function ProductsTable() {
  return (
    <div className="bg-[#F7F9FB] p-6 rounded-2xl">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Top Selling Products</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs text-gray-400 font-normal pb-2 pr-3">Name</th>
              <th className="text-left text-xs text-gray-400 font-normal pb-2 px-3">Price</th>
              <th className="text-left text-xs text-gray-400 font-normal pb-2 px-3">Quantity</th>
              <th className="text-left text-xs text-gray-400 font-normal pb-2 pl-3">Amount</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {productsData.map((product, index) => (
              <tr 
                key={index} 
                className={`${index === 1 ? 'bg-white' : ''} hover:bg-white hover:bg-opacity-60 transition-colors duration-200`}
              >
                <td className="py-2 pr-3">
                  <span className="text-xs text-gray-900">{product.name}</span>
                </td>
                <td className="py-2 px-3">
                  <span className="text-xs text-gray-900">{product.price}</span>
                </td>
                <td className="py-2 px-3">
                  <span className="text-xs text-gray-900">{product.quantity}</span>
                </td>
                <td className="py-2 pl-3">
                  <span className="text-xs text-gray-900">{product.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
