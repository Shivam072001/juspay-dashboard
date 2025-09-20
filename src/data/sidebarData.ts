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
        icon: '/src/assets/icons/chart-pie-slice-duotone.svg',
        isActive: true
      },
      {
        id: 'ecommerce',
        label: 'eCommerce',
        icon: '/src/assets/icons/shopping-bag-open-duotone.svg',
        hasDropdown: true,
        isExpanded: false,
        children: [
          { id: 'ecommerce-analytics', label: 'Analytics' },
          { id: 'ecommerce-products', label: 'Products' },
          { id: 'ecommerce-orders', label: 'Orders' }
        ]
      },
      {
        id: 'projects-dash',
        label: 'Projects',
        icon: '/src/assets/icons/folder-notch-duotone.svg',
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
        icon: '/src/assets/icons/book-open-duotone.svg',
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
        icon: '/src/assets/icons/identification-badge-duotone.svg',
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
        icon: '/src/assets/icons/identification-card-duotone.svg',
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
        icon: '/src/assets/icons/users-three-duotone.svg',
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
        icon: '/src/assets/icons/notebook-duotone.svg',
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
        icon: '/src/assets/icons/chats-teardrop-duotone.svg',
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
