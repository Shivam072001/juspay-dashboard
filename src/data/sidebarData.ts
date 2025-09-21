// Use string icon names that correspond to SvgIcon component
// This ensures all icons are rendered as React components and can be styled with CSS

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  isExpanded?: boolean;
  children?: SidebarMenuItem[];
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarMenuItem[];
}

export const sidebarData: SidebarSection[] = [
  {
    id: 'navigation',
    items: [
      {
        id: 'overview',
        label: 'Overview',
        icon: 'dot'
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: 'dot'
      }
    ]
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    items: [
      {
        id: 'default',
        label: 'Default',
        icon: 'chart-pie-slice-duotone'
      },
      {
        id: 'ecommerce',
        label: 'eCommerce',
        icon: 'shopping-bag-open-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'ecommerce-analytics', label: 'Analytics' },
          { id: 'ecommerce-products', label: 'Products' },
          { id: 'ecommerce-orders', label: 'Order List' }
        ]
      },
      {
        id: 'projects-dash',
        label: 'Projects',
        icon: 'folder-notch-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'projects-overview', label: 'Overview' },
          { id: 'projects-tasks', label: 'Tasks' },
          { id: 'projects-team', label: 'Team' }
        ]
      },
      {
        id: 'online-courses',
        label: 'Online Courses',
        icon: 'book-open-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'courses-dashboard', label: 'Dashboard' },
          { id: 'courses-catalog', label: 'Catalog' },
          { id: 'courses-students', label: 'Students' }
        ]
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    items: [
      {
        id: 'user-profile',
        label: 'User Profile',
        icon: 'identification-badge-duotone',
        hasDropdown: true,
        isExpanded: true, // This one is expanded by default as shown in the current UI
        children: [
          { id: 'profile-overview', label: 'Overview' },
          { id: 'profile-projects', label: 'Projects' },
          { id: 'profile-campaigns', label: 'Campaigns' },
          { id: 'profile-documents', label: 'Documents' },
          { id: 'profile-followers', label: 'Followers' }
        ]
      },
      {
        id: 'account',
        label: 'Account',
        icon: 'identification-card-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'account-settings', label: 'Settings' },
          { id: 'account-billing', label: 'Billing' },
          { id: 'account-security', label: 'Security' }
        ]
      },
      {
        id: 'corporate',
        label: 'Corporate',
        icon: 'users-three-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'corporate-about', label: 'About' },
          { id: 'corporate-team', label: 'Team' },
          { id: 'corporate-contact', label: 'Contact' }
        ]
      },
      {
        id: 'blog',
        label: 'Blog',
        icon: 'notebook-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'blog-posts', label: 'Posts' },
          { id: 'blog-categories', label: 'Categories' },
          { id: 'blog-authors', label: 'Authors' }
        ]
      },
      {
        id: 'social',
        label: 'Social',
        icon: 'chats-teardrop-duotone',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'social-feed', label: 'Feed' },
          { id: 'social-messages', label: 'Messages' },
          { id: 'social-friends', label: 'Friends' }
        ]
      }
    ]
  }
];
