import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import "./auth.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

const LoginPage = ({setAutoLogout, loading, isAuth}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const loginHandler = async () => {
        dispatch(authActions.login());
        const authData = {
          email: loginForm.email,
          password: loginForm.password,
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
          });
    
          if (res.status === 422) {
            throw new Error('Validation failed.');
          }
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Could not authenticate you!');
          }
    
          const resData = await res.json();
          
          dispatch(authActions.loginSuccess({token: resData.token, userId: resData.userId}));
          
          localStorage.setItem('token', resData.token);
          localStorage.setItem('userId', resData.userId);
          
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
          localStorage.setItem('expiryDate', expiryDate.toISOString());
          
          setAutoLogout(remainingMilliseconds);
        } catch(err) {
            console.log(err);
            dispatch(authActions.loginFail(err.message));
        }
      }

    useEffect(() => {
        if (isAuth) {
            navigate('/products');
        }
    }, [isAuth, navigate]); 

    const handleInputChange = (input, value) => {
        setLoginForm((prev) => ({
            ...prev,
            [input]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginHandler();
    }


    return (
        <section className="auth-section">
            <h1>Login</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input
                    className="input"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter a password"
                    value={loginForm.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                />
                <Button type="submit" className="authBtn" disabled={loading}>Login</Button>
            </form>
        </section>
    )
}

export default LoginPage
