import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <div className="container">
          <h1>Where in the world?</h1>
          <button>
            <img src="" alt=""></img>
            Dark Mode
          </button>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Layout;