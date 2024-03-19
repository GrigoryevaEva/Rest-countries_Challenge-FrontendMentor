import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import Layout from "./pages/Layout";
import MainPage from './pages/MainPage';
import CountryPage from './pages/CountryPage';
import ErrorPage from './pages/ErrorPage';

import { loaderMainPage, loaderCountryPage } from './api/Loader';

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
        loader: loaderMainPage
      },
      {
        path: "/:countryCode",
        element: <CountryPage />,
        loader: loaderCountryPage
      },
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
