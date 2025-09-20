import NotificationsList from './NotificationsList'
import ActivitiesList from './ActivitiesList'
import ContactsList from './ContactsList'

export default function RightPanel() {
  return (
    <div className="h-full bg-white" style={{ padding: '20px', width: '280px' }}>
      <div className="flex flex-col gap-6">
        <NotificationsList />
        <ActivitiesList />
        <ContactsList />
      </div>
    </div>
  );
}
