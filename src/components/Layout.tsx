import { Outlet } from "react-router";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 min-w-0  ml-70">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
