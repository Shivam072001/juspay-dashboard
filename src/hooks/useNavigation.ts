import { useContext } from 'react';
import { NavigationContext } from '../contexts/NavigationContext.types';

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
