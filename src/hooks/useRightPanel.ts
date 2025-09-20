import { useContext } from 'react';
import { RightPanelContext } from '../contexts/NotificationsContext';

export function useRightPanel() {
  const context = useContext(RightPanelContext);
  if (!context) {
    throw new Error('useRightPanel must be used within a RightPanelProvider');
  }
  return context;
}
