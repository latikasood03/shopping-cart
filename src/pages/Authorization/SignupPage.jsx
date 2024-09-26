import { useState } from "react";
import Button from "../../components/Button/Button";
import "./auth.css"

const SignupPage = ({error, loading, onSignup}) => {

    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleInputChange = (input, value) => {
        setSignupForm((prev) => ({
            ...prev,
            [input]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(signupForm);
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
