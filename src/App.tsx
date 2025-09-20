import AppLayout from './components/layout/AppLayout'
import { PanelProvider } from './contexts/SidebarContext'
import { SidebarMenuProvider } from './contexts/SidebarMenuContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <PanelProvider>
        <SidebarMenuProvider>
          <AppLayout />
        </SidebarMenuProvider>
      </PanelProvider>
    </ThemeProvider>
  )
}

export default App
