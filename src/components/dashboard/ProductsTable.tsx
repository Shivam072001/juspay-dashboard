import { memo } from 'react';
import DashboardCard from '../ui/DashboardCard';
import { useProductsData } from '../../hooks/useDashboardData';
import { componentStyles, theme } from '../../styles/theme';

const ProductsTable = memo(() => {
  const productsData = useProductsData();

  return (
    <DashboardCard title="Top Selling Products">
      <div className="overflow-x-auto">
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
                className={`hover:bg-white hover:bg-opacity-60 ${theme.transitions.colors}`}
              >
                <td className="py-2 pr-3">
                  <span className={componentStyles.text.xs}>{product.name}</span>
                </td>
                <td className="py-2 px-3">
                  <span className={componentStyles.text.xs}>{product.price}</span>
                </td>
                <td className="py-2 px-3">
                  <span className={componentStyles.text.xs}>{product.quantity}</span>
                </td>
                <td className="py-2 pl-3">
                  <span className={componentStyles.text.xs}>{product.amount}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
});

ProductsTable.displayName = 'ProductsTable';

export default ProductsTable;
