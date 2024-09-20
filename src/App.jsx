import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/Login/LoginPage";
import Layout from "./components/Layout/Layout";
import Cart from "./pages/Cart/Cart";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    setIsAuth(true);
  }, []);

  const logoutHandler = () => {
    setIsAuth(false);
  }

  const loginHandler = (e) => {
    e.preventDefault();
    
    setIsAuth(true);
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isAuth={isAuth} onLogout={logoutHandler} />,
      children: [
        {
          path: "/login",
          element: <LoginPage onLogin={loginHandler} />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
