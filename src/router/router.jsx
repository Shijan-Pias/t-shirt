import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLoyout from '../Layout/RootLoyout';
import Home from '../HomePage/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import PrivateRoutes from '../Routes/PrivateRoutes';
import ShopTShirts from '../shop/allTshirt';
import MyCart from '../mycart/MyCart';
import DetailsTShirt from '../shop/DetailsTShirt';
import DashBoardLayout from '../Layout/DashBoardLayout';
import Payment from '../DashBoard/Payment/Payment';
import PaymentHistory from '../DashBoard/UserDashboard/PaymnetHistory';
import SellerPaymentHistory from '../DashBoard/SellerDashboard/PaymentHistory';
import AddTShirtForm from '../addTshirt/AddTShirt';
import ManageTShirts from '../DashBoard/SellerDashboard/ManageTshirt';
import AdminManage from '../DashBoard/Admindashboard/AdminManage';

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
      },
      {
        path:'sellerPaymentHistory',
        Component:SellerPaymentHistory
      },
      {
        path:"addTShirt",
        Component:AddTShirtForm
      },
      {
        path:"manageTShirt",
        Component:ManageTShirts
      },
      {
        path:"manageAdmin",
        Component:AdminManage
      }
      
    ]
  }
]);

export default router;