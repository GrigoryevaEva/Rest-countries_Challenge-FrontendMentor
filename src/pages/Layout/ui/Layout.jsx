import { Outlet } from 'react-router-dom';

import { ChangeTheme } from '../../../features/changeTheme/index';

export const Layout = () => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Where in the world?</h1>
          <ChangeTheme />
        </div>
      </header>
      <Outlet />
    </>
  )
}