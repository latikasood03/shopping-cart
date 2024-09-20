import Button from "../../components/Button/Button"

const LoginPage = ({onLogin}) => {
    return (
        <div>
            <h1>Login</h1>
            <Button onClick={onLogin} className="auth">Login</Button>
        </div>
    )
}

export default LoginPage
