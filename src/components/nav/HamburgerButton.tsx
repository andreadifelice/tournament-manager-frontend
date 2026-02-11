import { Drawer } from "@/components/ui/drawer"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from "../ui/drawer"
import NavMenus from "./NavMenus"
import ThemeButton from "./ThemeButton"



const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            {/* trigger di apertura */}
            <DrawerTrigger asChild>
                <Button variant="default" className="border-gray-200">
                    <Menu size={'icon'}/>
                </Button>
            </DrawerTrigger>
            {/* contenuto del drawer */}
            <DrawerContent>
                <DrawerHeader className="flex flex-row justify-between">
                    <ThemeButton />
                    {/* trigger di chiusura */}
                    <DrawerClose asChild>
                        <Button variant="outline" className="border-gray-200 w-10 h-10">
                            <X size={'icon'} className="text-primary"/>
                        </Button>
                    </DrawerClose>
                </DrawerHeader>
                <NavMenus className="flex md:hidden flex-col gap-3 flex-1" onNavigate={() => setIsOpen(false)}/>
            </DrawerContent>
        </Drawer>
    )
}

export default HamburgerButton