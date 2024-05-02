import { createHashRouter, RouterProvider} from 'react-router-dom';

import { Layout } from "../pages/Layout/index";
import { MainPage } from '../pages/MainPage/index';
import { CountryPage } from '../pages/CountryPage/index';
import { ErrorPage } from '../pages/ErrorPage/index';

import "./index.scss";

const router = createHashRouter([
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
