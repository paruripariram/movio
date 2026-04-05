import { NavLink } from "react-router"
import type { ReactNode } from "react"

interface NavMenuLinkProps {
    to: string,
    children: ReactNode,
}

function NavMenuLink({to , children}: NavMenuLinkProps) {
    return (
        <NavLink to = {to} className={({isActive})=>(isActive ? 'text-primary' : 'text-gray-500')}>
            {children}
        </NavLink>
    )
}

export default NavMenuLink
