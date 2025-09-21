import type { Notification } from '../types/rightPanel';

// Use actual SVG file paths for direct image rendering
import bugBeetleIcon from '../assets/icons/bug-beetle.svg';
import userIcon from '../assets/icons/user.svg';
import broadcastIcon from '../assets/icons/broadcast.svg';

export const mockNotifications: Notification[] = [
  {
    id: 1,
    icon: bugBeetleIcon,
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: 'Just now'
  },
  {
    id: 2,
    icon: userIcon,
    iconBg: '#E5ECF6',
    title: 'New user registered',
    time: '59 minutes ago'
  },
  {
    id: 3,
    icon: bugBeetleIcon,
    iconBg: '#E3F5FF',
    title: 'You have a bug that needs to be fixed.',
    time: '12 hours ago'
  },
  {
    id: 4,
    icon: broadcastIcon,
    iconBg: '#E5ECF6',
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM'
  }
];
