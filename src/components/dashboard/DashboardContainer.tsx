import StatsCards from './StatsCards'
import ProjectionsChart from './ProjectionsChart'
import RevenueChart from './RevenueChart'
import WorldMap from './WorldMap'
import SalesChart from './SalesChart'
import ProductsTable from './ProductsTable'

export default function DashboardContainer() {
  return (
    <div className="flex flex-row flex-wrap justify-stretch items-stretch gap-7 w-full max-w-[892px]">
      <h1 className="text-2xl font-bold text-gray-900 text-left w-full">Dashboard</h1>
      
      {/* Stats Cards Row - Full Width */}
      <div className="w-full">
        <StatsCards />
      </div>
      
      {/* Projections Chart */}
      <div className="flex-1 min-w-[400px]">
        <ProjectionsChart />
      </div>
      
      {/* Revenue Chart */}
      <div className="flex-1 min-w-[400px]">
        <RevenueChart />
      </div>
      
      {/* World Map / Revenue by Location */}
      <div className="flex-1 min-w-[400px]">
        <WorldMap />
      </div>
      
      {/* Sales Chart + Products Table Column */}
      <div className="flex flex-col gap-7 flex-1 min-w-[400px]">
        <SalesChart />
        <ProductsTable />
      </div>
    </div>
  );
}
