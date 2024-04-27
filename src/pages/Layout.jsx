import { Outlet } from 'react-router-dom';
import ToggleTheme from '../components/ToggleTheme';

const Layout = () => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Where in the world?</h1>
          <ToggleTheme />
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Layout;