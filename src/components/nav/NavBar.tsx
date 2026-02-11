import { NavLink } from "react-router"
import HamburgerButton from "./HamburgerButton"
import NavMenus from "./NavMenus"
import ThemeButton from "./ThemeButton"

const NavBar = () => {
    return (
        <header className="px-4 w-full md:max-w-4xl mx-auto">
            <div className="p-2 mt-4 border-2 shadow-gray-100 shadow-sm rounded-2xl flex items-center justify-between">

                {/* logo */}
                <div className="flex items-center">
                    <NavLink to={'/'}>
                        <img src="../public/logo_soccer.svg" className="w-18 hover:inset-shadow-sm rounded-4xl p-2 logo-soccer"/>
                    </NavLink>
                    <p className="font-bold text-xl pl-2 hidden md:flex">SoccerBall</p>
                </div>

                {/* voci del menu */}
                <NavMenus className="hidden md:flex gap-2"/>

                {/* toggle per cambio del tema: si vede solo su desktop */}
                <div className="hidden md:flex">
                    <ThemeButton />
                </div>

                {/* hamburger menu: si mostra solo su mobile */}
                <div className="flex md:hidden px-4">
                    <HamburgerButton />
                </div>
                
            </div>
        </header>
    )
}

export default NavBar