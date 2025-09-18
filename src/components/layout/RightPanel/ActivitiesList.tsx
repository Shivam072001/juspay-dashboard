import type { Activity } from '../../../types';
import { mockActivities } from '../../../data';

interface ActivityItemProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex gap-2 p-1 rounded-lg">
      {/* Avatar */}
      <div className="flex items-center justify-center flex-shrink-0">
        <img 
          src={activity.avatar} 
          alt="" 
          className="w-6 h-6 rounded-full object-cover" 
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col justify-center flex-1">
        <p className="text-sm font-normal text-[#1C1C1C] leading-tight">
          {activity.title}
        </p>
        <p className="text-xs font-normal text-[rgba(28,28,28,0.4)] leading-tight">
          {activity.time}
        </p>
      </div>
    </div>
  );
}

export default function ActivitiesList() {

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <div className="px-1 py-2">
        <h3 className="text-sm font-semibold text-[#1C1C1C]">Activities</h3>
      </div>
      
      {/* Activities Items */}
      <div className="relative flex flex-col gap-2">
        {mockActivities.map((activity) => (
          <ActivityItem 
            key={activity.id} 
            activity={activity} 
          />
        ))}
        
        {/* Timeline connector - vertical line with dots */}
        <div className="absolute left-[16px] top-[80px] w-[1px] h-[176px] bg-[rgba(28,28,28,0.1)]">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[rgba(28,28,28,0.1)] rounded-full"></div>
          <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[rgba(28,28,28,0.1)] rounded-full"></div>
          <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[rgba(28,28,28,0.1)] rounded-full"></div>
          <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[rgba(28,28,28,0.1)] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
