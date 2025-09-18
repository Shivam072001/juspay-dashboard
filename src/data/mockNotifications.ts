import type { Notification } from '../types/rightPanel';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    icon: '/src/assets/icons/bug-beetle.svg',
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: 'Just now'
  },
  {
    id: 2,
    icon: '/src/assets/icons/user.svg',
    iconBg: '#E5ECF6',
    title: 'New user registered',
    time: '59 minutes ago'
  },
  {
    id: 3,
    icon: '/src/assets/icons/bug-beetle.svg',
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: '12 hours ago'
  },
  {
    id: 4,
    icon: '/src/assets/icons/broadcast.svg',
    iconBg: '#E5ECF6',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM'
  }
];
