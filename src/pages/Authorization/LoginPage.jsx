// import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./auth.css"

const LoginPage = ({onLogin}) => {
    // const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onLogin(); 
    //     navigate("/");  
    //   };

    return (
        <section className="auth-section">
            <h1>Login</h1>
            <form className="auth-form" onSubmit={onLogin}>
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
                <Button type="submit" className="authBtn">Login</Button>
            </form>
        </section>
    )
}

export default LoginPage
