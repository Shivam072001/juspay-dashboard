import AppLayout from './components/layout/AppLayout'
import { PanelProvider } from './contexts/SidebarContext'
import { SidebarMenuProvider } from './contexts/SidebarMenuContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NavigationProvider } from './contexts/NavigationContext'
import AppWithNavigation from './components/AppWithNavigation'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <PanelProvider>
          <SidebarMenuProvider>
            <AppWithNavigation />
          </SidebarMenuProvider>
        </PanelProvider>
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
