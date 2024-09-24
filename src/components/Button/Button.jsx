import { Link } from "react-router-dom";
import "./Button.css"

function Button({ children, onClick, to, disabled, className }) {
    if (to)
    return (
      <Link to={to} className={['button-link', `${className}`].join(' ')}>
        {children}
      </Link>
    );

    if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={['button-click', `${className}`].join(' ')}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={['button-submit', `${className}`].join(' ')}>
      {children}
    </button>
  );
}
  
  export default Button;