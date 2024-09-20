import './Dashboard.css';
import Button from '../Button/Button';

function Dashboard({isAuth, onLogout}) {
    return (
        <div className="dashboard-item">
            {isAuth ? (
                <>
                <Button to="/products">Products</Button>
                <Button to="/cart">Cart</Button>
                <Button to="/orders">Orders</Button>
                <Button onClick={onLogout} className="auth">Logout</Button>
                </>
            ) : (
                <>
                <Button to="/signup" className="auth">Sign Up</Button>
                <Button to="/login" >Login</Button>
                </>
            )}
        </div>
    )
}

export default Dashboard