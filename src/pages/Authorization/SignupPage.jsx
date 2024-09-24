import Button from "../../components/Button/Button";
import "./auth.css"

const SignupPage = () => {
    return (
        <section className="auth-section">
        <h1>Sign Up</h1>
        <form className="auth-form" >
            <label for="name">Name</label>
            <input
                className="input"
                id="name"
                type="text"
                placeholder="Enter your name"
                // value=""
            />
            <label for="email">E-mail</label>
            <input
                className="input"
                id="email"
                type="email"
                placeholder="Enter your email"
                // value=""
            />
            <label for="password">Password</label>
            <input
                className="input"
                id="password"
                label="Password"
                type="password"
                placeholder="Enter a password"
                // value=""
            />
            <Button type="submit" className="authBtn">Sign up</Button>
        </form>
    </section>
    )
}

export default SignupPage
