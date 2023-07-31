import Navbar from './components/Navbar'
import Content from './components/Content'
import './App.css'
import { NotificationsService } from './interfaces/NotificationsService'
import MockNotificationsApi from './services/MockNotificationsApi'
import NotificationsServiceContext from './context/NotificationsServiceContext'

function App() {
  const service: NotificationsService = new MockNotificationsApi();

  return (
    <>
      <NotificationsServiceContext.Provider value={service}>
        <Navbar/>
        <Content />
      </NotificationsServiceContext.Provider>
    </>
  )
}

export default App
