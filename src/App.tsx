import AppLayout from './components/layout/AppLayout'
import { PanelProvider } from './contexts/SidebarContext'
import './App.css'

function App() {
  return (
    <PanelProvider>
      <AppLayout />
    </PanelProvider>
  )
}

export default App
