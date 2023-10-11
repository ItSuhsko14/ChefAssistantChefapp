import { createHashRouter } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import AllCards from '../pages/AllCards/AllCards.js'
import Login from '../pages/Login/login.js'
import ErrorPage from '../pages/Error/ErrorPage.js'
import Registration from '../pages/Registration/Registration.js'
import Navbar from '../pages/Navbar/Navbar.js'
import Card from '../pages/Card/Card.js';
import AddCard from '../pages/Card/AddCard.js';
import Root from './root.jsx'
import { DynamicCardBreadcrumb } from '../router/DynamicCardBreadcrumb.js'
import { Outlet } from "react-router-dom";

const basenameURL = process.env.PUBLIC_URL;

export const router = createHashRouter([
  // {
  //   path: "/",
  //   basename: "/ChefAssistantChefapp",
  //   element: <div>Hello world!</div>,
  // },
      {
        path: "/",
        basename: "/ChefAssistantChefapp",
        element: <Root />,
        children: [
          {
            path: '/',
            element: <Outlet />,
            breadcrumb: 'Home',
            children: [
              {
                path: "/",
                element: <AllCards />,
                errorElement: <ErrorPage />,
                breadcrumb: "All cards"
              },
              {
                path: "login",
                element: <Login />,
                errorElement: <ErrorPage />,
                breadcrumb: "Login"
              },
              {
                path: "/getAll",
                element: <AllCards />,
                errorElement: <ErrorPage />,
                breadcrumb: "All cards"
              },
              {
                path: "/registration",
                element: <Registration />,
                errorElement: <ErrorPage />,
                breadcrumb: "Registration"
              },
              {
                path: "navbar",
                element: <Navbar />,
                errorElement: <ErrorPage />
              },
              {
                path: "/Card/:id",
                element: <Card />,
                errorElement: <ErrorPage />,
                breadcrumb: DynamicCardBreadcrumb
              },
              {
                path: "/Card",
                element: <AllCards />,
                errorElement: <ErrorPage />,
                breadcrumb: DynamicCardBreadcrumb
              },
              {
                path: "addCard",
                element: <AddCard />,
                errorElement: <ErrorPage />,
                breadcrumb: "Add card"
              },
              {
                path: "/addCard/:id/",
                element: <AddCard />,
                errorElement: <ErrorPage />,
                breadcrumb: DynamicCardBreadcrumb
              },
            ],
          },  
        ],
      },
    ])


  console.log(router.routes);