import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { NavigationContext } from './NavigationContext.types';
import type { NavigationState } from './NavigationContext.types';

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

