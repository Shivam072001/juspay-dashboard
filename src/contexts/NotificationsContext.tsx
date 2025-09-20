import { createContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { mockNotifications } from '../data/mockNotifications';
import { mockActivities } from '../data/mockActivities';
import { mockContacts } from '../data/mockContacts';
import type { Notification, Activity, Contact } from '../types/rightPanel';

interface RightPanelContextType {
  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: number) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Activities
  activities: Activity[];
  clearActivities: () => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  
  // Contacts
  contacts: Contact[];
  onlineContacts: Contact[];
  isContactOnline: (contactId: number) => boolean;
  setContactOnlineStatus: (contactId: number, isOnline: boolean) => void;
  
  // Search and filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredNotifications: Notification[];
  filteredActivities: Activity[];
  filteredContacts: Contact[];
  
  // UI state
  activeTab: 'notifications' | 'activities' | 'contacts';
  setActiveTab: (tab: 'notifications' | 'activities' | 'contacts') => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const RightPanelContext = createContext<RightPanelContextType | undefined>(undefined);

interface RightPanelProviderProps {
  children: ReactNode;
}

// Enhanced notification type with read status
interface ExtendedNotification extends Notification {
  isRead?: boolean;
}

export function RightPanelProvider({ children }: RightPanelProviderProps) {
  // Enhanced notifications with read status
  const [notifications, setNotifications] = useState<ExtendedNotification[]>(
    mockNotifications.map(notification => ({ ...notification, isRead: false }))
  );
  
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [contacts] = useState<Contact[]>(mockContacts);
  
  // Online status for contacts (simulated)
  const [onlineContactIds, setOnlineContactIds] = useState<Set<number>>(
    new Set([1, 2, 4]) // Some contacts online by default
  );
  
  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'notifications' | 'activities' | 'contacts'>('notifications');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notification management
  const markNotificationAsRead = useCallback((id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Activity management
  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const addActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    const newId = Math.max(...activities.map(a => a.id), 0) + 1;
    setActivities(prev => [{ ...activity, id: newId }, ...prev]);
  }, [activities]);

  // Contact management
  const isContactOnline = useCallback((contactId: number) => {
    return onlineContactIds.has(contactId);
  }, [onlineContactIds]);

  const setContactOnlineStatus = useCallback((contactId: number, isOnline: boolean) => {
    setOnlineContactIds(prev => {
      const newSet = new Set(prev);
      if (isOnline) {
        newSet.add(contactId);
      } else {
        newSet.delete(contactId);
      }
      return newSet;
    });
  }, []);

  // Computed values with memoization
  const unreadNotificationsCount = useMemo(
    () => notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  const onlineContacts = useMemo(
    () => contacts.filter(contact => onlineContactIds.has(contact.id)),
    [contacts, onlineContactIds]
  );

  // Search filtering
  const filteredNotifications = useMemo(() => {
    if (!searchQuery.trim()) return notifications;
    const query = searchQuery.toLowerCase();
    return notifications.filter(notification =>
      notification.title.toLowerCase().includes(query)
    );
  }, [notifications, searchQuery]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return activities;
    const query = searchQuery.toLowerCase();
    return activities.filter(activity =>
      activity.title.toLowerCase().includes(query)
    );
  }, [activities, searchQuery]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  // Memoized context value
  const contextValue = useMemo(() => ({
    // Notifications
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    
    // Activities
    activities,
    clearActivities,
    addActivity,
    
    // Contacts
    contacts,
    onlineContacts,
    isContactOnline,
    setContactOnlineStatus,
    
    // Search and filtering
    searchQuery,
    setSearchQuery,
    filteredNotifications,
    filteredActivities,
    filteredContacts,
    
    // UI state
    activeTab,
    setActiveTab,
    isCollapsed,
    setIsCollapsed
  }), [
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    activities,
    clearActivities,
    addActivity,
    contacts,
    onlineContacts,
    isContactOnline,
    setContactOnlineStatus,
    searchQuery,
    setSearchQuery,
    filteredNotifications,
    filteredActivities,
    filteredContacts,
    activeTab,
    setActiveTab,
    isCollapsed,
    setIsCollapsed
  ]);

  return (
    <RightPanelContext.Provider value={contextValue}>
      {children}
    </RightPanelContext.Provider>
  );
}
