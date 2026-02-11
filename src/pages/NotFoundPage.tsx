import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-100 flex flex-col justify-center items-center gap-4">
                <img src="./public/404_image.jpg" className="w-full animate-wiggle" />
                <h1 className="text-5xl font-bold text-primary animate-pulse text-center">Errore! pagina non trovata</h1>
                <Button variant={'outline'} asChild>
                    <Link to={'/'}>Torna alla home</Link>
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage