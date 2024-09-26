// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import "./auth.css"

const LoginPage = ({onLogin, loading}) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (input, value) => {
        setLoginForm((prev) => ({
            ...prev,
            [input]: value,
        }))
    }

    const handleSubmit = (e) => {
        // console.log(e)
        e.preventDefault();
        onLogin(loginForm);
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
