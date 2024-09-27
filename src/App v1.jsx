/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./pages/Products/Products";
import LoginPage from "./pages/Authorization/LoginPage";
import Layout from "./components/Layout/Layout";
import Cart from "./pages/Cart/Cart";
import SignupPage from "./pages/Authorization/SignupPage";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();

    setIsAuth(true);
    setUserId(userId);
    setToken(token);
    setAutoLogout(remainingMilliseconds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  }

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
  }

  const loginHandler = async (event) => {
    // event.preventDefault();
    setAuthLoading(true);
    setError(null);
    const authData = {
      email: event.email,
      password: event.password,
    };
    
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        })
        // body: JSON.stringify({authData})
      });

      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Could not authenticate you!');
      }

      const resData = await res.json();
      
      setIsAuth(true);
      setToken(resData.token);
      setUserId(resData.userId);
      setAuthLoading(false);

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());

      setAutoLogout(remainingMilliseconds);
    } catch(err) {
      console.log(err);
      setError(err.message);
      setAuthLoading(false);
    }
    
  }

  const signupHandler = async (event) => {
    console.log(event)

    const authData = {
      email: event.email,
      name: event.name,
      password: event.password,
    };
    
    setAuthLoading(true);

    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(authData),
        body: JSON.stringify({
          email: authData.email,
          name: authData.name,
          password: authData.password
        })
      })

      if (res.status === 422) {
        throw new Error("Validation failed. Make sure the email address isn't used yet!");
      }
      if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating a user failed!');
      }

      const resData = await res.json();

      if (!res.ok) {
        const error = resData.errors ? resData.errors[0].message : 'Signup failed!';
        throw new Error(error);
      }
      console.log(resData);
      setIsAuth(false);
      setAuthLoading(false);
    } catch(err) {
      console.log(err);
      setError(err.message);
      setAuthLoading(false);
    }
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isAuth={isAuth} onLogout={logoutHandler} />,
      children: [
        {
          path: "/login",
          element: <LoginPage onLogin={loginHandler} loading={authLoading} />,
        },
        {
          path: "/signup",
          element: <SignupPage onSignup={signupHandler} loading={authLoading} error={error}/>,
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

//   let routes = (
//     <Routes>
//       <Route path="/login" element={<LoginPage onLogin={loginHandler} />} />
//        <Route
//           path="/signup"
//           element={<SignupPage onSignup={signupHandler} loading={authLoading} error={error} />}
//         />
//         <Navigate to="/login" replace />
//     </Routes>
//   );

//   if(isAuth) {
//     routes = (
//       <Routes>
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Navigate to="/products" replace />
//       </Routes>
//     )
//   }
  
//     return 
//         (
//         <>
//           <Layout isAuth={isAuth} onLogout={logoutHandler}>
//             {routes}
//           </Layout>
//         </>
// )
}

export default App;
