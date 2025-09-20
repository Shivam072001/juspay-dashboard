import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface PanelContextType {
  isLeftPanelOpen: boolean;
  isRightPanelOpen: boolean;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export function usePanelContext() {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider');
  }
  return context;
}

interface PanelProviderProps {
  children: ReactNode;
}

export function PanelProvider({ children }: PanelProviderProps) {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const toggleLeftPanel = () => setIsLeftPanelOpen(!isLeftPanelOpen);
  const toggleRightPanel = () => setIsRightPanelOpen(!isRightPanelOpen);

  return (
    <PanelContext.Provider value={{
      isLeftPanelOpen,
      isRightPanelOpen,
      toggleLeftPanel,
      toggleRightPanel
    }}>
      {children}
    </PanelContext.Provider>
  );
}
