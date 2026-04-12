import NavMenuLink from "./Ui/NavMenuLink";
import { useAuthContext } from "../context/AuthContext";
import logoMovio from "../assets/logoMovio.png";
import {
    CircleUser,
    Clapperboard,
    House,
    LoaderCircle,
    Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
    to: string;
    icon: LucideIcon;
    label: string;
};

const navItems: NavItem[] = [
    { to: "/", icon: House, label: "Home" },
    { to: "/collection", icon: Clapperboard, label: "Collection" },
    { to: "/search", icon: Search, label: "Search" },
];

function Navbar() {
    const { user, isLoading } = useAuthContext();

    return (
        <nav className="flex flex-col items-center p-5 w-70 bg-form-color shadow-[4px_4px_10px_0px_rgba(0,0,0,0.15)] fixed">
            <img className="w-25" src={logoMovio} alt="logo" />
            <h1 className="text-primary text-6xl font-extrabold text-center mb-20">
                Movio
            </h1>
            <ul className="flex flex-col gap-6 w-full">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <li className="nav-li" key={to}>
                        <NavMenuLink to={to}>
                            <Icon />
                            {label}
                        </NavMenuLink>
                    </li>
                ))}
                {isLoading && (
                    <li className="nav-li">
                        <div className="p-3 w-full flex gap-2 rounded-2xl text-gray-500">
                            <LoaderCircle className="animate-spin" />
                            Loading...
                        </div>
                    </li>
                )}
                {!isLoading && !user && (
                    <li className="nav-li">
                        <NavMenuLink to={"/login"}>
                            <CircleUser />
                            Sign In
                        </NavMenuLink>
                    </li>
                )}
                {!isLoading && user && (
                    <li className="nav-li">
                        <NavMenuLink to={"/profile"}>
                            {({ isActive }: { isActive: boolean }) => (
                                <>
                                    <div
                                        className={`w-12 h-12 rounded-full bg-gray-500 text-form-color flex items-center justify-center text-3xl ${
                                            isActive
                                                ? "bg-primary text-white"
                                                : "bg-gray-500 text-form-color"
                                        }`}
                                    >
                                        {(user.displayName
                                            ? user.displayName.charAt(0)
                                            : user.email?.charAt(0) || "?"
                                        ).toUpperCase()}
                                    </div>
                                    <span className="truncate">
                                        {user.displayName || user.email}
                                    </span>
                                </>
                            )}
                        </NavMenuLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
