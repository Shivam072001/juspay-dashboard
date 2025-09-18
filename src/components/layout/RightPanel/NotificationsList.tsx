import type { Notification } from '../../../types';
import { mockNotifications } from '../../../data';

interface NotificationItemProps {
  notification: Notification;
}

function NotificationItem({ notification }: NotificationItemProps) {
  return (
    <div className="flex gap-2 p-1 rounded-lg">
      {/* Icon */}
      <div 
        className="flex items-center justify-center rounded-lg p-1 w-6 h-6 flex-shrink-0"
        style={{ backgroundColor: notification.iconBg }}
      >
        <img 
          src={notification.icon} 
          alt="" 
          className="w-4 h-4" 
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-sm font-normal text-[#1C1C1C] leading-[1.4285714285714286] truncate">
          {notification.title}
        </p>
        <p className="text-xs font-normal text-[rgba(28,28,28,0.4)] leading-[1.5] truncate">
          {notification.time}
        </p>
      </div>
    </div>
  );
}

export default function NotificationsList() {

  return (
    <div className="flex flex-col gap-2 self-stretch">
      {/* Title */}
      <div className="px-2 py-1 self-stretch">
        <h3 className="text-sm font-semibold text-[#1C1C1C] leading-[1.4285714285714286]">Notifications</h3>
      </div>
      
      {/* Notification Items */}
      <div className="flex flex-col gap-2">
        {mockNotifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification} 
          />
        ))}
      </div>
    </div>
  );
}
