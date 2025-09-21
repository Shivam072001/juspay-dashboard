# 🚀 Modern React Dashboard

A sophisticated, feature-rich dashboard application built with React 18, TypeScript, and modern UI/UX principles. This dashboard demonstrates advanced React patterns, performance optimization, and interactive data visualization components.

## 🌐 Live Demo

**[View Live Dashboard →](https://juspay-dashboard-five.vercel.app/)**

Experience the full interactive dashboard with all features, animations, and responsive design in action.

## ✨ Key Features

### 🎨 **Modern Design System**
- **Dual Theme Support**: Complete light/dark theme with system preference detection
- **CSS Custom Properties**: Theme-aware color system with smooth transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: 13 reusable UI components with consistent styling

### 📊 **Interactive Data Visualizations**
- **KPI Cards**: Real-time metrics with trend indicators (+11.01%, -0.03%, +15.03%, +6.08%)
- **Projections Chart**: Stacked bar chart comparing actual vs projected revenue (6 months data)
- **Revenue Timeline**: Multi-line chart with interactive legends showing current vs previous week
- **World Map**: Interactive geographical visualization with clickable location markers
- **Sales Distribution**: Custom rounded donut chart with hover effects and percentage display
- **Product Performance**: Sortable table with 5 top-selling products and detailed analytics

### 🎮 **Micro-Interactions & Animations**
- **Hover States**: Scale transforms (`hover:scale-105 active:scale-95`) on all buttons
- **Chart Interactions**: Dynamic tooltips, segment highlighting, hover overlays
- **Smooth Transitions**: 200ms easing transitions for all interactive elements
- **Loading States**: Progressive component loading with React Suspense boundaries

### 🔧 **Advanced Technical Features**

#### **Context Management System**
```typescript
// Multi-level context providers
- ThemeContext: Theme switching & localStorage persistence
- NavigationContext: Dynamic breadcrumb & page routing  
- SidebarContext: Panel visibility management
- NotificationsContext: Real-time notifications with unread counting
```

#### **Performance Optimization**
- **Lazy Loading**: All dashboard components use React.lazy with code splitting
- **Memoization**: Strategic use of memo, useMemo, useCallback for performance
- **Custom Hooks**: 8 specialized hooks for functionality and optimization
- **Bundle Optimization**: Tree-shaking and dynamic imports

### 📱 **Responsive Layout System**
- **Left Sidebar**: Collapsible navigation (212px desktop, full overlay mobile)
- **Main Content**: Flexible grid system adapting to content
- **Right Panel**: Notifications/activities panel (280px desktop, full overlay mobile)
- **Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

### 🔔 **Real-Time Features**
- **Notification System**: Unread counting, mark as read, search filtering
- **Activity Feed**: Real-time user actions and system events  
- **Contact Management**: Online/offline status indicators
- **Search & Filter**: Debounced search (300ms) across all content types

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server  
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/        # 8 dashboard components (StatsCards, Charts, etc.)
│   ├── layout/          # 16 layout components (Header, Sidebar, etc.) 
│   ├── ui/              # 13 reusable UI components
│   └── pages/           # Page components
├── contexts/            # 4 React Context providers
├── hooks/               # 8 custom hooks
├── data/                # Mock data (KPIs, charts, locations, notifications)
├── types/               # TypeScript definitions
├── styles/              # Theme system & CSS
└── utils/               # Helper functions
```

## 🔧 Technology Stack

### Core Technologies
- **React 18.3.1**: Concurrent features, Suspense, lazy loading
- **TypeScript 5.8.3**: Strict type checking, interface-driven development
- **Vite 7.1.6**: Lightning-fast build tool with HMR
- **Tailwind CSS 4.1.13**: Utility-first styling with custom theme

### Specialized Libraries
- **Recharts 2.8.0**: Interactive charts (Bar, Line, Donut)
- **React Simple Maps 3.0.0**: World map visualization
- **Material-UI 7.3.2**: Advanced components and icons
- **Day.js 1.11.18**: Lightweight date manipulation

## 🎨 Component Showcase

### Dashboard Components
1. **StatsCards**: KPI metrics with trend indicators
2. **ProjectionsChart**: Stacked bar chart with actual vs projected data
3. **RevenueChart**: Multi-line chart with legend
4. **WorldMap**: Interactive geographical visualization with coordinate finder
5. **SalesChart**: Custom rounded donut chart with gaps and hover states
6. **ProductsTable**: Sortable table with product performance data

### UI Components
1. **RoundedDonutChart**: Custom SVG donut with rounded segments and gaps
2. **CoordinateFinder**: Development tool for finding map coordinates
3. **ThemeToggle**: Animated light/dark mode switcher
4. **Avatar**: User avatar with online status indicators
5. **ProgressBar**: Animated progress indicators
6. **Tooltip**: Context-aware tooltip positioning

### Layout System
- **Responsive Header**: Breadcrumb navigation, search, theme toggle
- **Collapsible Sidebar**: Hierarchical navigation with expand/collapse
- **Right Panel**: Tabbed interface for notifications, activities, contacts
- **Mobile Navigation**: Full overlay panels with backdrop

## 🎯 Advanced Features

### Interactive Elements
- **Click-Outside Detection**: Custom hook for dropdown/modal management
- **Debounced Search**: 300ms delay for optimal performance
- **Keyboard Shortcuts**: ESC to clear, navigation hotkeys
- **Location Selection**: Interactive map markers with state management

### Data Management
```typescript
// Mock data includes:
- 4 KPI metrics with trend data
- 6 months projection data
- 6 months revenue comparison  
- 5 active world locations
- 5 top-selling products
- 4 sales channels data
- Real-time notifications
```

### Theme System
```css
/* CSS Custom Properties for theme switching */
--color-background, --color-foreground
--color-card, --color-border
--color-primary, --color-secondary
--color-muted, --color-accent
```

## 🚧 Interactive Features Demonstrated

### Hover Interactions
- Button scale transforms with active states
- Chart segment highlighting with tooltips
- Navigation item hover states with smooth transitions
- Card elevation changes on hover

### Click Interactions  
- Map location selection with state persistence
- Chart legend toggling (planned)
- Sortable table headers (planned)
- Panel collapse/expand with animation

### Real-time Updates
- Notification badge counting
- Online status indicators
- Dynamic breadcrumb updates
- Search result filtering

## 📈 Performance & Quality

### Optimization Techniques
- **Code Splitting**: Lazy loading reduces initial bundle size
- **Memoization**: Prevents unnecessary re-renders
- **Tree Shaking**: Eliminates unused code
- **Image Optimization**: SVG icons and optimized assets

### Development Features
- **TypeScript**: 100% type coverage with strict configuration
- **ESLint**: React best practices enforcement
- **Hot Module Replacement**: Instant updates during development
- **Performance Monitoring**: Development-time render tracking

---

**Built with ❤️ using React 18 + TypeScript + Vite**

This dashboard demonstrates modern React development with advanced patterns, performance optimization, and exceptional user experience design.