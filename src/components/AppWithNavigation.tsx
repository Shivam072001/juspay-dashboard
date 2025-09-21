import { useEffect } from 'react';
import AppLayout from './layout/AppLayout';
import { useNavigation } from '../contexts/NavigationContext';
import { useSidebarMenu } from '../hooks/useSidebarMenu';

export default function AppWithNavigation() {
  const { navigateTo } = useNavigation();
  const { setNavigationCallback } = useSidebarMenu();

  // Set up the navigation callback when the component mounts
  useEffect(() => {
    setNavigationCallback(navigateTo);
  }, [setNavigationCallback, navigateTo]);

  return <AppLayout />;
}
