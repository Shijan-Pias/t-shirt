import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLoyout from '../Layout/RootLoyout';
import Home from '../HomePage/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import PrivateRoutes from '../Routes/PrivateRoutes';
import AddTShirt from '../addTshirt/AddTShirt';
import ShopTShirts from '../shop/allTshirt';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLoyout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path:'/addShirt',
        element:<PrivateRoutes><AddTShirt></AddTShirt></PrivateRoutes>
      },
      {
        path:'/shop',
        Component:ShopTShirts
      }

    ]
  },

  //authentication

  {

    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      }
    ]
  }
]);

export default router;