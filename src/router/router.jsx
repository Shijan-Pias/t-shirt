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
import MyCart from '../mycart/MyCart';
import DetailsTShirt from '../shop/DetailsTShirt';
import DashBoardLayout from '../Layout/DashBoardLayout';
import Payment from '../DashBoard/Payment/Payment';
import PaymentHistory from '../DashBoard/UserDashboard/PaymnetHistory';

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
      },
      
      {
        path:'/tShirt/:id',
        Component:DetailsTShirt
      },
      {
        
        path:'/myCart',
       element:<PrivateRoutes><MyCart></MyCart></PrivateRoutes>

      },

      

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
  },
  {
    path:'/dashBoard',
    element:<PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
    children:[
      {
        path:'myCart',
        Component:MyCart

      },
      {
        path:'payment/:cartId',
        Component: Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      }
    ]
  }
]);

export default router;