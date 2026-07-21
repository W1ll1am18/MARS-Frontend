import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavBar'
import DevMessage from './components/DevMessage'

const Layout = () => (
  <>
    <NavigationBar />
    <DevMessage />
    <Outlet />
  </>
)

export default Layout