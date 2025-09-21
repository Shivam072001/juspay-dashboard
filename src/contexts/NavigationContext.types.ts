import { createContext } from 'react';

export interface NavigationState {
  currentPage: string;
  breadcrumb: { label: string; id?: string }[];
}

export interface NavigationContextType {
  navigationState: NavigationState;
  navigateTo: (pageId: string, breadcrumb: { label: string; id?: string }[]) => void;
  getCurrentPage: () => string;
  getBreadcrumb: () => { label: string; id?: string }[];
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
