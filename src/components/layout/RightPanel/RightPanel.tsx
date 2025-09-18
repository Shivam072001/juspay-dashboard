import NotificationsList from './NotificationsList'
import ActivitiesList from './ActivitiesList'
import ContactsList from './ContactsList'

export default function RightPanel() {
  return (
    <div className="w-[280px] h-full bg-white border-l border-gray-100" style={{ padding: '20px' }}>
      <div className="flex flex-col gap-6">
        <NotificationsList />
        <ActivitiesList />
        <ContactsList />
      </div>
    </div>
  );
}
