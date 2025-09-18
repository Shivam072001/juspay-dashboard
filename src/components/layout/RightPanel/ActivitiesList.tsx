import type { Activity } from '../../../types';
import { mockActivities } from '../../../data';

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
}

function ActivityItem({ activity, isLast }: ActivityItemProps) {
  return (
    <div className="flex gap-2 p-1 rounded-lg">
      {/* Avatar with Timeline */}
      <div className="flex justify-center flex-shrink-0 relative">
        <img 
          src={activity.avatar} 
          alt="" 
          className="w-6 h-6 rounded-full object-cover relative z-10" 
        />
        {/* Timeline connector - short segment with gaps before and after avatars */}
        {!isLast && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-3.5 bg-[rgba(28,28,28,0.1)]"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-sm font-normal text-[#1C1C1C] leading-[1.4285714285714286] truncate">
          {activity.title}
        </p>
        <p className="text-xs font-normal text-[rgba(28,28,28,0.4)] leading-[1.5] truncate">
          {activity.time}
        </p>
      </div>
    </div>
  );
}

export default function ActivitiesList() {

  return (
    <div className="flex flex-col gap-2 self-stretch">
      {/* Title */}
      <div className="px-2 py-1 self-stretch">
        <h3 className="text-sm font-semibold text-[#1C1C1C] leading-[1.4285714285714286]">Activities</h3>
      </div>
      
      {/* Activities Items */}
      <div className="flex flex-col gap-2">
        {mockActivities.map((activity, index) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
            isLast={index === mockActivities.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
