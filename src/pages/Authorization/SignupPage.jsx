import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import "./auth.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";

const SignupPage = ({error, loading, isAuth}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const signupHandler = async () => {
    
        const authData = {
          email: signupForm.email,
          name: signupForm.name,
          password: signupForm.password,
        };
        
        dispatch(authActions.signup());
    
        try {
          const res = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
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
          dispatch(authActions.signupSuccess());
        } catch(err) {
            console.log(err);
            dispatch(authActions.signupFail(err.message));
        }
      }

    useEffect(() => {
        if(isAuth) {
            navigate('/products')
        }
    }, [isAuth, navigate]); 

    const handleInputChange = (input, value) => {
        setSignupForm((prev) => ({
            ...prev,
            [input]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signupHandler();
    }

    return (
        <section className="auth-section">
        <h1>Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit} >
            <label htmlFor="name">Name</label>
            <input
                className="input"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={signupForm.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
            />
            <label htmlFor="email">E-mail</label>
            <input
                className="input"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                className="input"
                id="password"
                label="Password"
                type="password"
                placeholder="Enter a password"
                value={signupForm.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
            />
            <Button type="submit" className="authBtn" disabled={loading}>Sign up</Button>
        </form>
        {error && <p className="error">{error.message}</p>}
    </section>
    )
}

export default SignupPage
