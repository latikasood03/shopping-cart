import { Outlet } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"

const Layout = ({isAuth, onLogout}) => {
    return (
        <div>
            <>
            <header>
                <Dashboard isAuth={isAuth} onLogout={onLogout} />  
            </header>
            <main>
                <Outlet />
            </main>
            </>
        </div>
    )
}

export default Layout
