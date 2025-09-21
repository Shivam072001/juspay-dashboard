import { createContext } from 'react';
import type { SidebarMenuItem, SidebarSection } from '../data/sidebarData';

export interface SidebarMenuContextType {
  menuData: SidebarSection[];
  toggleMenuItem: (itemId: string) => void;
  setActiveItem: (itemId: string) => void;
  isItemExpanded: (itemId: string) => boolean;
  getActiveItemId: () => string | null;
  searchItems: (query: string) => SidebarMenuItem[];
  setNavigationCallback: (callback: (pageId: string, breadcrumb: { label: string; id?: string }[]) => void) => void;
}

export const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);
