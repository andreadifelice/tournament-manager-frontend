import NavBar from "@/components/nav/NavBar"
import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default MainLayout