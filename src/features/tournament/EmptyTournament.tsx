import { AlertCircle, BoxIcon, LoaderCircle } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

type EmptyTournamentProps = {
    type?: "empty" | "pending" | "error"
}

const EMPTY_VARIANTS = {
    empty: {
        icon: <BoxIcon className="text-gray-500" size={48}/>,
        title: "Lista dei tornei attualmente vuota",
    },
    pending: {
        icon: <LoaderCircle className="animate-spin text-gray-500" size={48} />,
        title: "Caricamento dei tornei in corso",
    },
    error: {
        icon: <AlertCircle className="text-red-600" size={48} />,
        title: "Errore nel caricamento dei tornei",
    },
}

const EmptyTournament = ({ type = "empty" }: EmptyTournamentProps) => {
    const variant = EMPTY_VARIANTS[type]
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {variant.icon}
                </EmptyMedia>
                <EmptyTitle>{variant.title}</EmptyTitle>
            </EmptyHeader>
        </Empty>
    )
}

export default EmptyTournament