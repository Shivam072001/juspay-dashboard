import NotificationsList from './NotificationsList'
import ActivitiesList from './ActivitiesList'
import ContactsList from './ContactsList'

export default function RightPanel() {
  return (
    <div className="h-full space-y-6">
      <NotificationsList />
      <ActivitiesList />
      <ContactsList />
    </div>
  );
}
