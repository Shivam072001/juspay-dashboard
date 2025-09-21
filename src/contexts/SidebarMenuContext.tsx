import { createContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { sidebarData } from '../data/sidebarData';
import type { SidebarMenuItem, SidebarSection } from '../data/sidebarData';

interface SidebarMenuContextType {
  menuData: SidebarSection[];
  toggleMenuItem: (itemId: string) => void;
  setActiveItem: (itemId: string) => void;
  isItemExpanded: (itemId: string) => boolean;
  getActiveItemId: () => string | null;
  searchItems: (query: string) => SidebarMenuItem[];
  setNavigationCallback: (callback: (pageId: string, breadcrumb: { label: string; id?: string }[]) => void) => void;
}

export const SidebarMenuContext = createContext<SidebarMenuContextType | undefined>(undefined);

interface SidebarMenuProviderProps {
  children: ReactNode;
}

export function SidebarMenuProvider({ children }: SidebarMenuProviderProps) {
  const [navigationCallback, setNavigationCallbackState] = useState<((pageId: string, breadcrumb: { label: string; id?: string }[]) => void) | null>(null);
  
  // Moved utility functions inside the component to fix Fast Refresh
  const createItemsMap = useCallback((sections: SidebarSection[]): Map<string, SidebarMenuItem> => {
    const itemsMap = new Map<string, SidebarMenuItem>();
    
    const addItemsToMap = (items: SidebarMenuItem[]) => {
      items.forEach(item => {
        itemsMap.set(item.id, item);
        if (item.children) {
          addItemsToMap(item.children);
        }
      });
    };
    
    sections.forEach(section => addItemsToMap(section.items));
    return itemsMap;
  }, []);

  const updateItemInTree = useCallback((
    item: SidebarMenuItem, 
    targetId: string, 
    updateFn: (item: SidebarMenuItem) => Partial<SidebarMenuItem>
  ): SidebarMenuItem => {
    if (item.id === targetId) {
      return { ...item, ...updateFn(item) };
    }
    
    if (item.children) {
      const updatedChildren = item.children.map(child => 
        updateItemInTree(child, targetId, updateFn)
      );
      
      // Only update if children actually changed
      const hasChanged = updatedChildren.some((child, index) => 
        child !== item.children![index]
      );
      
      return hasChanged ? { ...item, children: updatedChildren } : item;
    }
    
    return item;
  }, []);
  const [menuData, setMenuData] = useState<SidebarSection[]>(sidebarData);

  // Memoized items map for fast lookups
  const itemsMap = useMemo(() => createItemsMap(menuData), [menuData, createItemsMap]);

  // Optimized toggle function with useCallback
  const toggleMenuItem = useCallback((itemId: string) => {
    setMenuData(prevData => {
      return prevData.map(section => ({
        ...section,
        items: section.items.map(item => 
          updateItemInTree(item, itemId, (targetItem) => ({
            isExpanded: targetItem.hasDropdown ? !targetItem.isExpanded : targetItem.isExpanded
          }))
        )
      }));
    });
  }, [updateItemInTree]);

  // Helper function to determine navigation info based on menu item
  const getNavigationInfo = useCallback((itemId: string) => {
    switch (itemId) {
      case 'default':
        return {
          page: 'default',
          breadcrumb: [{ label: 'Dashboards' }, { label: 'Default' }]
        };
      case 'ecommerce-orders':
        return {
          page: 'ecommerce-orders',
          breadcrumb: [{ label: 'Dashboards' }, { label: 'eCommerce' }, { label: 'Order List' }]
        };
      case 'ecommerce-analytics':
        return {
          page: 'ecommerce-analytics',
          breadcrumb: [{ label: 'Dashboards' }, { label: 'eCommerce' }, { label: 'Analytics' }]
        };
      case 'ecommerce-products':
        return {
          page: 'ecommerce-products',
          breadcrumb: [{ label: 'Dashboards' }, { label: 'eCommerce' }, { label: 'Products' }]
        };
      default:
        return {
          page: itemId,
          breadcrumb: [{ label: 'Dashboards' }, { label: itemId }]
        };
    }
  }, []);

  // Optimized active item setter with proper cleanup and navigation
  const setActiveItem = useCallback((itemId: string) => {
    setMenuData(prevData => {
      return prevData.map(section => ({
        ...section,
        items: section.items.map(item => 
          updateItemInTree(item, item.id, (targetItem) => ({
            isActive: targetItem.id === itemId
          }))
        )
      }));
    });

    // Handle navigation
    if (navigationCallback) {
      const navInfo = getNavigationInfo(itemId);
      navigationCallback(navInfo.page, navInfo.breadcrumb);
    }
  }, [updateItemInTree, navigationCallback, getNavigationInfo]);

  // Memoized expanded state check
  const isItemExpanded = useCallback((itemId: string): boolean => {
    const item = itemsMap.get(itemId);
    return item?.isExpanded || false;
  }, [itemsMap]);

  // Memoized active item lookup
  const getActiveItemId = useCallback((): string | null => {
    for (const [id, item] of itemsMap.entries()) {
      if (item.isActive) return id;
    }
    return null;
  }, [itemsMap]);

  // New feature: search functionality
  const searchItems = useCallback((query: string): SidebarMenuItem[] => {
    if (!query.trim()) return [];
    
    const results: SidebarMenuItem[] = [];
    const searchQuery = query.toLowerCase();
    
    for (const item of itemsMap.values()) {
      if (item.label.toLowerCase().includes(searchQuery)) {
        results.push(item);
      }
    }
    
    return results;
  }, [itemsMap]);

  // Function to set navigation callback
  const setNavigationCallback = useCallback((callback: (pageId: string, breadcrumb: { label: string; id?: string }[]) => void) => {
    setNavigationCallbackState(() => callback);
  }, []);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    menuData,
    toggleMenuItem,
    setActiveItem,
    isItemExpanded,
    getActiveItemId,
    searchItems,
    setNavigationCallback
  }), [menuData, toggleMenuItem, setActiveItem, isItemExpanded, getActiveItemId, searchItems, setNavigationCallback]);

  return (
    <SidebarMenuContext.Provider value={contextValue}>
      {children}
    </SidebarMenuContext.Provider>
  );
}
