import { useContext } from 'react';
import { SidebarMenuContext } from '../contexts/SidebarMenuContext.types';

export function useSidebarMenu() {
  const context = useContext(SidebarMenuContext);
  if (!context) {
    throw new Error('useSidebarMenu must be used within a SidebarMenuProvider');
  }
  return context;
}
