/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";

import Products from "./pages/Products/Products";
import LoginPage from "./pages/Authorization/LoginPage";
import Layout from "./components/Layout/Layout";
import Cart from "./pages/Cart/Cart";
import AddProduct from "./pages/Products/AddProduct";
import SignupPage from "./pages/Authorization/SignupPage";
import Orders from "./pages/Orders/Orders";
import Wishlist from "./pages/Wishlist/Wishlist";
import RouteProtection from "./components/RouteProtection/RouteProtection";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import CheckoutFail from "./pages/Checkout/CheckoutFail";

function App() {
const dispatch = useDispatch();
const { isAuth, authLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      dispatch(authActions.logout());
      return;
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();

    dispatch(authActions.loginSuccess({ token, userId }));
    setAutoLogout(remainingMilliseconds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
        dispatch(authActions.logout());
    }, milliseconds);
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isAuth={isAuth} />,
      children: [
        {
          path: "/login",
          element: <LoginPage setAutoLogout={setAutoLogout} loading={authLoading} isAuth={isAuth} />,
        },
        {
          path: "/signup",
          element: <SignupPage loading={authLoading} error={error} isAuth={isAuth}/>,
        },
        {
          path: "/products",
          element: <RouteProtection><Products /></RouteProtection>,
        },
        {
          path: "/add-product",
          element: <RouteProtection><AddProduct /></RouteProtection>,
        },
        {
          path: "/cart",
          element: <RouteProtection><Cart /></RouteProtection>,
        },
        {
          path: "/orders",
          element: <RouteProtection><Orders /></RouteProtection>,
        },
        {
          path: "/wishlist",
          element: <RouteProtection><Wishlist /></RouteProtection>,
        },
        {
          path: "/checkout",
          element: <RouteProtection><Checkout /></RouteProtection>,
        },
        {
          path: '/checkout/success',
          element: <RouteProtection><CheckoutSuccess /></RouteProtection>,
        },
        {
          path: '/checkout/cancel',
          element: <RouteProtection><CheckoutFail /></RouteProtection>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} /> 
}

export default App;
