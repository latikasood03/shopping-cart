/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/Authorization/LoginPage";
import Layout from "./components/Layout/Layout";
import Cart from "./pages/Cart/Cart";
import AddProduct from "./pages/Products/AddProduct";
import SignupPage from "./pages/Authorization/SignupPage";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authSlice";

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
          element: <Products />,
        },
        {
          path: "/add-product",
          element: <AddProduct />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />
}

export default App;
