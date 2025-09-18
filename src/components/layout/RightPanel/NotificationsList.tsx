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
        className="flex items-center justify-center w-4 h-4 rounded-lg p-1"
        style={{ backgroundColor: notification.iconBg }}
      >
        <img 
          src={notification.icon} 
          alt="" 
          className="w-4 h-4" 
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col justify-center flex-1">
        <p className="text-sm font-normal text-[#1C1C1C] leading-tight">
          {notification.title}
        </p>
        <p className="text-xs font-normal text-[rgba(28,28,28,0.4)] leading-tight">
          {notification.time}
        </p>
      </div>
    </div>
  );
}

export default function NotificationsList() {

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <div className="px-1 py-2">
        <h3 className="text-sm font-semibold text-[#1C1C1C]">Notifications</h3>
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
