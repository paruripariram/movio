import NavMenuLink from "../Ui/NavMenuLink";

function Navbar() {
    return (
        <nav >
            <ul className="flex flex-col gap-20">
                <li>
                    <NavMenuLink to={"/"}>Home</NavMenuLink>
                </li>
                <li>
                    <NavMenuLink to={"/registration"}>Sign Up</NavMenuLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
