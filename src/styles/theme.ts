// Shared theme constants for consistent styling across dashboard components
export const theme = {
  // Colors - using CSS custom properties for theme-aware values
  colors: {
    primary: 'rgb(var(--color-primary))',
    secondary: 'rgb(var(--color-secondary))',
    background: {
      card: 'rgb(var(--color-card))',
      primary: 'rgb(var(--color-accent))',
      secondary: 'rgb(var(--color-muted))',
    },
    text: {
      primary: 'rgb(var(--color-foreground))',
      secondary: 'rgb(var(--color-muted-foreground))',
      muted: 'rgb(var(--color-muted-foreground) / 0.6)',
      light: 'rgb(var(--color-primary-foreground))',
    },
    border: 'rgb(var(--color-border))',
    sales: {
      direct: 'rgb(var(--color-chart-1))',
      affiliate: 'rgb(var(--color-chart-3))', 
      sponsored: 'rgb(var(--color-chart-4))',
      email: 'rgb(var(--color-chart-5))',
    },
  },

  // Typography
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      '2xl': '32px',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: '1.2',
      normal: '1.4285714285714286em',
      relaxed: '1.5em',
    },
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '28px',
  },

  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '20px',
  },

  // Chart configurations
  chart: {
    margin: {
      default: { top: 16, right: 0, left: 16, bottom: 28 },
      compact: { top: 16, right: 0, left: 0, bottom: 0 },
    },
    grid: {
      stroke: 'rgba(28, 28, 28, 0.05)',
      strokeDasharray: 'none',
    },
    axis: {
      tick: {
        fontSize: 12,
        fill: 'rgba(28, 28, 28, 0.4)',
        fontFamily: 'Inter, sans-serif',
      },
    },
    line: {
      strokeWidth: 3,
      dotRadius: 3,
      activeDotRadius: 4,
    },
    bar: {
      size: 20,
      categoryGap: 8,
    },
  },

  // Shadows
  shadows: {
    sm: '0px 2px 2px rgba(0, 0, 0, 0.1)',
    md: '0px 2px 4px rgba(0, 0, 0, 0.01)',
  },

  // Transitions
  transitions: {
    default: 'transition-all duration-200 ease-out',
    colors: 'transition-colors duration-200',
    transform: 'transition-transform duration-200 ease-out',
    slow: 'transition-all duration-300 ease-out',
  },
} as const;

// Chart-specific theme
export const chartTheme = {
  colors: {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    grid: theme.colors.border,
  },
  axis: theme.chart.axis,
  margin: theme.chart.margin,
} as const;

// Component-specific styles
export const componentStyles = {
  card: {
    base: 'rounded-2xl w-full',
    background: 'bg-card',
    padding: 'p-6',
    full: 'bg-card p-6 rounded-2xl w-full theme-transition',
  },
  title: {
    base: 'font-semibold text-foreground',
    small: 'text-sm font-semibold text-foreground',
    medium: 'text-base font-semibold text-foreground',
  },
  text: {
    xs: 'text-xs text-foreground',
    small: 'text-sm text-foreground',
    muted: 'text-xs text-muted-foreground font-normal',
  },
} as const;

export type Theme = typeof theme;
export type ChartTheme = typeof chartTheme;
