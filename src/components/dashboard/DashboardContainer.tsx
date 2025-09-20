import StatsCards from './StatsCards'
import ProjectionsChart from './ProjectionsChart'
import RevenueChart from './RevenueChart'
import WorldMap from './WorldMap'
import SalesChart from './SalesChart'
import ProductsTable from './ProductsTable'

export default function DashboardContainer() {
  return (
    <div className="w-full max-w-[892px] flex flex-col gap-7">
      <h1 className="text-2xl font-bold text-gray-900 text-left">Dashboard</h1>
      
      {/* Row 1: Stats Cards (1/2) + Projections Chart (1/2) */}
      <div className="flex flex-col lg:flex-row gap-7 w-full">
        <div className="w-full lg:w-1/2">
          <StatsCards />
        </div>
        <div className="w-full lg:w-1/2">
          <ProjectionsChart />
        </div>
      </div>
      
      {/* Row 2: Revenue Chart (1/2) + World Map (1/2) */}
      <div className="flex flex-col md:flex-row gap-7 w-full">
        <div className="w-full md:w-1/2">
          <RevenueChart />
        </div>
        <div className="w-full md:w-1/2">
          <WorldMap />
        </div>
      </div>
      
      {/* Row 3: Products Table (1/2) + Sales Chart (1/2) */}
      <div className="flex flex-col md:flex-row gap-7 w-full">
        <div className="w-full md:w-1/2">
          <ProductsTable />
        </div>
        <div className="w-full md:w-1/2">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}
