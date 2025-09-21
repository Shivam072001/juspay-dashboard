// Mock data based on exact Figma design values
import { worldMapData } from './worldMapLocations';

export interface KPIData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgColor: string;
}

export interface ProjectionData {
  month: string;
  actual: number;
  projected: number;
}

export interface RevenueData {
  month: string;
  currentWeek: number;
  previousWeek: number;
}

export interface LocationData {
  name: string;
  value: string;
  progress: number; // 0-100 for progress bar
}

export interface ProductData {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

export interface SalesData {
  name: string;
  value: number;
  amount: string;
  color: string;
  darkColor?: string; // Optional dark theme color
}

// KPI Cards data from Figma
export const kpiData: KPIData[] = [
  {
    title: "Customers",
    value: "3,781",
    change: "+11.01%",
    isPositive: true,
    bgColor: "#E3F5FF"
  },
  {
    title: "Orders", 
    value: "1,219",
    change: "-0.03%",
    isPositive: false,
    bgColor: "#F7F9FB"
  },
  {
    title: "Revenue",
    value: "$695",
    change: "+15.03%", 
    isPositive: true,
    bgColor: "#F7F9FB"
  },
  {
    title: "Growth",
    value: "30.1%",
    change: "+6.08%",
    isPositive: true,
    bgColor: "#E5ECF6"
  }
];

// Projections vs Actuals Chart Data (6 months)
// Based on Figma design: 3 full bars (Feb, Apr, May) and 3 stacked bars (Jan, Mar, Jun)
export const projectionsData: ProjectionData[] = [
  { month: "Jan", actual: 15.4, projected: 19.3 },  // Jan: 72px actual, 18px gap = ~15.4M actual, ~3.9M gap
  { month: "Feb", actual: 18.8, projected: 23.7 },  // Feb: 88px actual, 22px gap = ~18.8M actual, ~4.9M gap
  { month: "Mar", actual: 16.3, projected: 20.4 },  // Mar: 76px actual, 19px gap = ~16.3M actual, ~4.1M gap  
  { month: "Apr", actual: 20.6, projected: 25.7 },  // Apr: 96px actual, 24px gap = ~20.6M actual, ~5.1M gap
  { month: "May", actual: 13.7, projected: 17.1 },  // May: 64px actual, 16px gap = ~13.7M actual, ~3.4M gap
  { month: "Jun", actual: 18.8, projected: 23.7 }   // Jun: 88px actual, 22px gap = ~18.8M actual, ~4.9M gap
];

// Revenue Chart Data (Line chart with two series)
// Based on exact Figma design patterns
export const revenueChartData: RevenueData[] = [
  { month: "Jan", currentWeek: 20, previousWeek: 24 },
  { month: "Feb", currentWeek: 25, previousWeek: 28 },
  { month: "Mar", currentWeek: 15, previousWeek: 22 },
  { month: "Apr", currentWeek: 30, previousWeek: 18 },
  { month: "May", currentWeek: 18, previousWeek: 25 },
  { month: "Jun", currentWeek: 28, previousWeek: 27 }
];

// Helper function to convert WorldMapLocation to LocationData format
const formatValueForLocationData = (value: string): string => {
  // Convert "$72,490" to "72K" format
  const numericValue = parseInt(value.replace(/[$,]/g, ''));
  if (numericValue >= 1000) {
    return `${Math.round(numericValue / 1000)}K`;
  }
  return value;
};

// Location Stats - derived from worldMapData (single source of truth)
export const locationData: LocationData[] = worldMapData.locations
  .filter(location => location.isActive)
  .map(location => ({
    name: location.name,
    value: formatValueForLocationData(location.revenue.toString()),
    progress: location.progress
  }));

// Top Selling Products from Figma
export const productsData: ProductData[] = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" }
];

// Total Sales Chart Data (Pie chart)
export const salesData: SalesData[] = [
  { name: "Direct", value: 38.6, amount: "$300.56", color: "#1C1C1C", darkColor: "#C6C7F8" },
  { name: "Affiliate", value: 22.5, amount: "$135.18", color: "#BAEDBD", darkColor: "#BAEDBD" },
  { name: "Sponsored", value: 30.8, amount: "$154.02", color: "#95A4FC", darkColor: "#95A4FC" },
  { name: "E-mail", value: 8.1, amount: "$48.96", color: "#B1E3FF", darkColor: "#B1E3FF" }
];
