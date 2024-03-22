import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import Layout from "./pages/Layout";
import MainPage from './pages/MainPage';
import CountryPage from './pages/CountryPage';
import ErrorPage from './pages/ErrorPage';

import "./scss/test.scss";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/:countryCode",
        element: <CountryPage />,
      },
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
