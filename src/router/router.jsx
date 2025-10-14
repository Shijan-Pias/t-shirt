import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLoyout from '../Layout/RootLoyout';
import Home from '../HomePage/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLoyout,
    children: [
      {
        index: true,
        Component: Home
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