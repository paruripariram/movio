import NavMenuLink from "../Ui/NavMenuLink";

function Navbar() {
    return (
        <nav>
            <ul className="flex flex-col gap-20">
                <li>
                    <NavMenuLink to={"/"}>Home</NavMenuLink>
                </li>
                <li>
                    <NavMenuLink to={"/auth"}>
                        Authorization
                    </NavMenuLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
