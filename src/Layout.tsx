import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavBar'

const Layout = () => (
  <>
    <NavigationBar />
    <Outlet />
  </>
)

export default Layout