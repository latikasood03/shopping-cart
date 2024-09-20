import { Outlet } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"

const Layout = ({isAuth, onLogout}) => {
    return (
        <div>
            <>
            <Dashboard isAuth={isAuth} onLogout={onLogout} />  
            <Outlet />
            </>
        </div>
    )
}

export default Layout
