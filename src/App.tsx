import AppLayout from './components/layout/AppLayout'
import { PanelProvider } from './contexts/SidebarContext'
import { SidebarMenuProvider } from './contexts/SidebarMenuContext'
import './App.css'

function App() {
  return (
    <PanelProvider>
      <SidebarMenuProvider>
        <AppLayout />
      </SidebarMenuProvider>
    </PanelProvider>
  )
}

export default App
