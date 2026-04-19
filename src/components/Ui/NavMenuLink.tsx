import { NavLink } from "react-router";
import type { ReactNode } from "react";

type ChildrenProps = { isActive: boolean };
type ChildrenFunction = (props: ChildrenProps) => ReactNode;

interface NavMenuLinkProps {
    to: string;
    children: ReactNode | ChildrenFunction;
}

function NavMenuLink({ to, children }: NavMenuLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `p-3 w-full flex gap-2 rounded-2xl items-center transition-all duration-300 ease-in-out hover:bg-bgcolor ${isActive ? "text-primary bg-back-link-color" : "text-gray-500"} `
            }
        >
            {(state) =>
                typeof children === "function"
                    ? (children as ChildrenFunction)(state)
                    : children
            }
        </NavLink>
    );
}

export default NavMenuLink;
