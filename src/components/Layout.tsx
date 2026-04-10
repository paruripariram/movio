import { Outlet } from "react-router";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div className="flex flex-column">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
