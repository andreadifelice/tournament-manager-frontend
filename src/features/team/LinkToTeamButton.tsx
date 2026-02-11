import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"


const LinkToTeamButton = () => {
    return (
        <Link to={'/teams'}>
            <Button className="w-fit">
                Aggiungi squadra
                <Plus size={'icon'}/>
            </Button>
        </Link>
    )
}

export default LinkToTeamButton