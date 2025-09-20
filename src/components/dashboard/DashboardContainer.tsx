import StatsCards from './StatsCards'
import ProjectionsChart from './ProjectionsChart'
import RevenueChart from './RevenueChart'
import WorldMap from './WorldMap'
import SalesChart from './SalesChart'
import ProductsTable from './ProductsTable'

export default function DashboardContainer() {
  return (
    <div className="w-full flex flex-col gap-7">
      <h1 className="text-2xl font-bold text-gray-900 text-left">Dashboard</h1>
      
      {/* Row 1: Stats Cards (max-width) + Projections Chart (remaining space) */}
      <div className="flex flex-col lg:flex-row gap-7 w-full">
        <div className="w-full lg:w-auto lg:max-w-[520px] lg:flex-shrink-0">
          <StatsCards />
        </div>
        <div className="w-full lg:flex-1 lg:min-w-0">
          <ProjectionsChart />
        </div>
      </div>
      
      {/* Row 2: Revenue Chart (70%) + World Map (30%) */}
      <div className="flex flex-col lg:flex-row gap-7 w-full lg:items-stretch">
        <div className="w-full lg:flex-[7] lg:min-w-0 flex">
          <RevenueChart />
        </div>
        <div className="w-full lg:flex-[3] lg:min-w-0 flex">
          <WorldMap />
        </div>
      </div>
      
      {/* Row 3: Products Table (70%) + Sales Chart (30%) */}
      <div className="flex flex-col lg:flex-row gap-7 w-full lg:items-stretch">
        <div className="w-full lg:flex-[7] lg:min-w-0 flex">
          <ProductsTable />
        </div>
        <div className="w-full lg:flex-[3] lg:min-w-0 flex">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}
