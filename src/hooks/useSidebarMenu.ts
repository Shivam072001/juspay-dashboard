import { useContext } from 'react';
import { SidebarMenuContext } from '../contexts/SidebarMenuContext';

export function useSidebarMenu() {
  const context = useContext(SidebarMenuContext);
  if (!context) {
    throw new Error('useSidebarMenu must be used within a SidebarMenuProvider');
  }
  return context;
}
