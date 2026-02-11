import { cn } from "@/lib/utils"
import { NavLink } from "react-router"
import { buttonVariants } from "../ui/button"

type NavMenusProps = {
    className?: string;
    onNavigate?: () => void;
}

const NavMenus = ({className, onNavigate}:NavMenusProps) => {
    // array di oggetti
    const Items = [
        {
            link: '/',
            name: 'Home'
        },
        {
            link: '/teams',
            name: 'Squadre'
        },
        {
            link: '/tournaments',
            name: 'Tornei'
        }
    ]

    return (
        <>
            <div className="flex flex-1 items-start justify-end px-4">
                <nav className={className}>
                    {/* array map per generare dinamicamente le voci delle pagine */}
                    {Items.map((item) => (
                        <NavLink
                            key={item.link}
                            to={item.link}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                isActive
                                    ? cn(
                                        // cambia la variante in default se è active, togliendo anche l'hover
                                        buttonVariants({ variant: "default" }),
                                        "hover:bg-primary hover:text-primary-foreground flex justify-end"
                                    )
                                    // se non è active diventa "ghost" 
                                    : cn(
                                        buttonVariants({ variant: "ghost" }),
                                        "justify-end"
                                    )
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default NavMenus