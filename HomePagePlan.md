# SaaS Dashboard Home Page Implementation Plan

## Design Overview
A comprehensive eCommerce dashboard with light theme featuring:
- Left sidebar navigation with collapsible sections
- Top header with breadcrumbs and user actions
- Main content area with analytics and data visualization
- Right panel with notifications, activities, and contacts

## Layout Architecture

### 1. Main Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    App Container (1440px)                   │
├───────────┬─────────────────────────────────┬──────────────┤
│  Sidebar  │         Header                  │  RightPanel  │
│  (212px)  │         (948px)                 │   (280px)    │
├───────────┼─────────────────────────────────┼──────────────┤
│           │                                 │              │
│  Navigation│      Main Content Area         │ Notifications│
│   Menu    │      - Stats Cards             │ Activities   │
│           │      - Charts                  │ Contacts     │
│           │      - Tables                  │              │
│           │                                 │              │
└───────────┴─────────────────────────────────┴──────────────┘
```

## Component Architecture

### 1. Layout Components

#### `AppLayout.tsx`
- Main container with grid layout
- Manages sidebar collapse state
- Responsive breakpoints

#### `Sidebar.tsx`
- Fixed width navigation (212px)
- Collapsible sections
- Active state management
- Brand logo section

#### `Header.tsx`
- Breadcrumb navigation
- Search functionality
- User action buttons
- Theme toggle

#### `RightPanel.tsx`
- Notifications list
- Activities feed
- Contacts list
- Scrollable sections

### 2. Sidebar Components

#### `SidebarBrand.tsx`
- ByeWind logo/icon
- Brand name text

#### `SidebarTabs.tsx`
- Favorites/Recently toggle tabs
- Tab state management

#### `SidebarSection.tsx`
- Reusable section wrapper
- Section title
- Collapsible content

#### `SidebarMenuItem.tsx`
- Navigation menu item
- Icon + text layout
- Active/inactive states
- Hover effects
- Optional arrow indicator

#### `SidebarSubMenu.tsx`
- Collapsible submenu
- Nested navigation items
- Selected indicator

### 3. Header Components

#### `Breadcrumb.tsx`
- Navigation breadcrumb trail
- Clickable path segments
- Separator styling

#### `SearchBar.tsx`
- Search input with icon
- Keyboard shortcut display (⌘/)
- Focus states

#### `HeaderActions.tsx`
- Icon button group
- Theme toggle
- Notification badge
- Tooltip integration

### 4. Main Content Components

#### `DashboardContainer.tsx`
- Main content wrapper
- Grid layout for dashboard widgets

#### `StatsCards.tsx`
- Statistics card grid (4 cards)
- Individual `StatCard.tsx` components
- Trend indicators (arrows, percentages)

#### `StatCard.tsx`
- Card container with padding
- Title, value, change indicator
- Trend arrow (up/down)
- Color variants (white, blue, green backgrounds)

#### `ChartsSection.tsx`
- Chart container wrapper
- Chart title headers
- Responsive chart sizing

#### `ProjectionsChart.tsx`
- Bar chart component
- Dual data series (Projections vs Actuals)
- Chart legend
- Axis labels (months)

#### `RevenueChart.tsx`
- Line/area chart
- Revenue over time
- Legend with current/previous week data
- Tooltip on hover

#### `WorldMap.tsx`
- SVG world map component
- Location markers/dots
- Revenue data visualization
- Interactive hover states

#### `LocationStats.tsx`
- Location revenue breakdown
- City names with revenue values
- Progress bars for relative comparison

#### `ProductsTable.tsx`
- Data table component
- Sortable columns
- Product data display

#### `SalesChart.tsx`
- Donut/pie chart
- Sales breakdown by channel
- Interactive legend
- Tooltip component

### 5. Right Panel Components

#### `NotificationsList.tsx`
- Notification items list
- Icon-based notifications
- Timestamp display
- Different notification types

#### `ActivitiesList.tsx`
- User activity feed
- Avatar + activity description
- Relative timestamps

#### `ContactsList.tsx`
- User avatars with names
- Contact status indicators

### 6. Shared/Reusable Components

#### `Card.tsx`
- Base card component
- Consistent padding/spacing
- Shadow/border styles
- Variant props (background colors)

#### `IconButton.tsx`
- Clickable icon wrapper
- Size variants
- Hover/active states
- Tooltip support

#### `Button.tsx`
- Primary button component
- Size and variant props
- Loading states

#### `Avatar.tsx`
- User avatar component
- Image fallback to initials
- Size variants
- Online status indicator

#### `Badge.tsx`
- Notification badge
- Color variants
- Number display

#### `Tooltip.tsx`
- Hover tooltip component
- Positioning logic
- Dark theme

#### `ProgressBar.tsx`
- Progress visualization
- Color variants
- Animation support

## Context Management Setup

### 1. Theme Context
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

### 2. Sidebar Context
```typescript
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeSection: string | null;
  setActiveSection: (section: string) => void;
}
```

### 3. Dashboard Data Context
```typescript
interface DashboardContextType {
  statsData: StatsData;
  chartsData: ChartsData;
  tableData: TableData;
  loading: boolean;
  refreshData: () => void;
}
```

### 4. Notifications Context
```typescript
interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}
```

## Data Types & Interfaces

### Core Data Types
```typescript
interface StatCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: 'default' | 'blue' | 'green';
}

interface ChartDataPoint {
  label: string;
  value: number;
  projected?: number;
}

interface Product {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

interface LocationData {
  city: string;
  revenue: string;
  percentage: number;
}

interface SalesChannelData {
  channel: string;
  amount: string;
  color: string;
}

interface Notification {
  id: string;
  type: 'bug' | 'user' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

interface Activity {
  id: string;
  user: UserProfile;
  action: string;
  timestamp: string;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}
```

## Styling Strategy

### 1. CSS Variables (Design Tokens)
```css
:root {
  /* Colors */
  --color-primary: #1C1C1C;
  --color-secondary: #A8C5DA;
  --color-background: #FFFFFF;
  --color-surface: #F7F9FB;
  --color-border: rgba(28, 28, 28, 0.1);
  --color-text-primary: #1C1C1C;
  --color-text-secondary: rgba(28, 28, 28, 0.4);
  --color-text-muted: rgba(28, 28, 28, 0.2);
  
  /* Backgrounds */
  --bg-blue: #E3F5FF;
  --bg-green: #E5ECF6;
  --bg-yellow: #BAEDBD;
  
  /* Shadows */
  --shadow-card: 0px 2px 4px 0px rgba(0, 0, 0, 0.01);
  --shadow-tooltip: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 28px;
  
  /* Borders */
  --border-radius: 8px;
  --border-radius-lg: 16px;
  --border-radius-full: 80px;
}
```

### 2. Component-Specific Styles
- Use CSS Modules or styled-components
- Consistent spacing/sizing
- Hover and focus states
- Responsive design patterns

## Implementation Phases

### Phase 1: Core Layout & Navigation (Priority 1)
1. ✅ Setup project structure
2. Create main layout components
3. Implement sidebar navigation
4. Add header with breadcrumbs
5. Setup routing structure

### Phase 2: Context & State Management (Priority 1)
1. Setup theme context
2. Implement sidebar state management
3. Create dashboard data context
4. Add notifications context

### Phase 3: Dashboard Content (Priority 2)
1. Create stats cards section
2. Implement charts (bar chart, line chart)
3. Add world map component
4. Create products table
5. Implement sales breakdown chart

### Phase 4: Right Panel Features (Priority 2)
1. Notifications list
2. Activities feed
3. Contacts section

### Phase 5: Polish & Interactions (Priority 3)
1. Animations and transitions
2. Responsive design refinements
3. Accessibility improvements
4. Performance optimizations

## File Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarBrand.tsx
│   │   │   ├── SidebarTabs.tsx
│   │   │   ├── SidebarSection.tsx
│   │   │   ├── SidebarMenuItem.tsx
│   │   │   └── SidebarSubMenu.tsx
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── HeaderActions.tsx
│   │   └── RightPanel/
│   │       ├── RightPanel.tsx
│   │       ├── NotificationsList.tsx
│   │       ├── ActivitiesList.tsx
│   │       └── ContactsList.tsx
│   ├── dashboard/
│   │   ├── DashboardContainer.tsx
│   │   ├── StatsCards.tsx
│   │   ├── StatCard.tsx
│   │   ├── ChartsSection.tsx
│   │   ├── ProjectionsChart.tsx
│   │   ├── RevenueChart.tsx
│   │   ├── WorldMap.tsx
│   │   ├── LocationStats.tsx
│   │   ├── ProductsTable.tsx
│   │   └── SalesChart.tsx
│   └── ui/
│       ├── Card.tsx
│       ├── IconButton.tsx
│       ├── Button.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Tooltip.tsx
│       └── ProgressBar.tsx
├── contexts/
│   ├── ThemeContext.tsx
│   ├── SidebarContext.tsx
│   ├── DashboardContext.tsx
│   └── NotificationsContext.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── useClickOutside.ts
├── types/
│   ├── dashboard.ts
│   ├── notifications.ts
│   └── common.ts
├── utils/
│   ├── formatters.ts
│   ├── constants.ts
│   └── helpers.ts
└── styles/
    ├── globals.css
    ├── variables.css
    └── components/
```

## Key Features & Interactions

### Sidebar
- Collapsible navigation menu
- Active state highlighting
- Expandable sub-sections (Dashboards, Pages)
- Smooth hover animations

### Header
- Functional search bar with keyboard shortcuts
- Theme toggle button
- Notification indicator badges
- Responsive breadcrumb navigation

### Dashboard
- Interactive charts with hover tooltips
- Real-time data updates
- Responsive card layouts
- Sortable data tables

### Right Panel
- Real-time notifications
- Activity feed with timestamps
- Contact status indicators
- Smooth scrolling

## Performance Considerations
1. Lazy load chart libraries
2. Virtual scrolling for large lists
3. Optimize SVG world map
4. Debounce search input
5. Memoize expensive calculations

## Accessibility Features
1. Keyboard navigation support
2. ARIA labels and roles
3. Color contrast compliance
4. Screen reader optimization
5. Focus management

This plan provides a comprehensive roadmap for implementing the exact Figma design with modern React best practices, proper context management, and scalable component architecture.
