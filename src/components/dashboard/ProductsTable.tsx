import { memo } from 'react';
import DashboardCard from '../ui/DashboardCard';
import { useProductsData } from '../../hooks/useDashboardData';
import { componentStyles } from '../../styles/theme';

const ProductsTable = memo(() => {
  const productsData = useProductsData();

  return (
    <DashboardCard title="Top Selling Products">
      <div className="overflow-x-auto">
        <div style={{ minWidth: '400px' }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className={`text-left ${componentStyles.text.muted} pb-2 pr-3`}>Name</th>
                <th className={`text-left ${componentStyles.text.muted} pb-2 px-3`}>Price</th>
                <th className={`text-left ${componentStyles.text.muted} pb-2 px-3`}>Quantity</th>
                <th className={`text-left ${componentStyles.text.muted} pb-2 pl-3`}>Amount</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {productsData.map((product, index) => (
                <tr 
                  key={index} 
                  className="py-2 px-3 rounded-lg hover:bg-hover theme-transition cursor-pointer"
                >
                  <td className="pr-3">
                    <span className={componentStyles.text.small}>{product.name}</span>
                  </td>
                  <td className="px-3">
                    <span className={componentStyles.text.small}>{product.price}</span>
                  </td>
                  <td className="px-3">
                    <span className={componentStyles.text.small}>{product.quantity}</span>
                  </td>
                  <td className="pl-3">
                    <span className={componentStyles.text.small}>{product.amount}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardCard>
  );
});

ProductsTable.displayName = 'ProductsTable';

export default ProductsTable;
