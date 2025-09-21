import type { Notification } from '../types/rightPanel';

// Use string icon names that correspond to SvgIcon component
// This ensures all icons are rendered as React components and can be styled with CSS

export const mockNotifications: Notification[] = [
  {
    id: 1,
    icon: 'bug-beetle',
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: 'Just now'
  },
  {
    id: 2,
    icon: 'user',
    iconBg: '#E5ECF6',
    title: 'New user registered',
    time: '59 minutes ago'
  },
  {
    id: 3,
    icon: 'bug-beetle',
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: '12 hours ago'
  },
  {
    id: 4,
    icon: 'broadcast',
    iconBg: '#E5ECF6',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM'
  }
];
