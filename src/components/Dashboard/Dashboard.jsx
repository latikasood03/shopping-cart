import './Dashboard.css';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { authActions } from "../../store/authSlice";
import { useNavigate } from 'react-router-dom';

function Dashboard({isAuth}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiryDate');
        navigate('/login');
      }

    return (
        <div className="dashboard-item">
            {isAuth ? (
                <>
                <Button to='/add-product'>Add Product</Button>
                <Button to="/products">Products</Button>
                <Button to="/cart">Cart</Button>
                <Button to="/orders">Orders</Button>
                <Button onClick={logoutHandler} className="auth">Logout</Button>
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