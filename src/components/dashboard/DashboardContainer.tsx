import StatsCards from './StatsCards'
import ChartsSection from './ChartsSection'
import ProductsTable from './ProductsTable'

export default function DashboardContainer() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <StatsCards />
      <ChartsSection />
      <ProductsTable />
    </div>
  );
}
