import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface NavigationState {
  currentPage: string;
  breadcrumb: { label: string; id?: string }[];
}

interface NavigationContextType {
  navigationState: NavigationState;
  navigateTo: (pageId: string, breadcrumb: { label: string; id?: string }[]) => void;
  getCurrentPage: () => string;
  getBreadcrumb: () => { label: string; id?: string }[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: 'default',
    breadcrumb: [{ label: 'Dashboards' }, { label: 'Default' }]
  });

  const navigateTo = useCallback((pageId: string, breadcrumb: { label: string; id?: string }[]) => {
    setNavigationState({
      currentPage: pageId,
      breadcrumb
    });
  }, []);

  const getCurrentPage = useCallback(() => {
    return navigationState.currentPage;
  }, [navigationState.currentPage]);

  const getBreadcrumb = useCallback(() => {
    return navigationState.breadcrumb;
  }, [navigationState.breadcrumb]);

  const contextValue = React.useMemo(() => ({
    navigationState,
    navigateTo,
    getCurrentPage,
    getBreadcrumb
  }), [navigationState, navigateTo, getCurrentPage, getBreadcrumb]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
