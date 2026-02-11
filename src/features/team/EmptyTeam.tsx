import { AlertCircle, BoxIcon, LoaderCircle } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

type EmptyTeamProps = {
    type?: "empty" | "pending" | "error"
}

const EMPTY_VARIANTS = {
    empty: {
        icon: <BoxIcon className="text-gray-500" size={48} />,
        title: "Lista delle squadre attualmente vuota",
    },
    pending: {
        icon: <LoaderCircle className="animate-spin text-gray-500" size={48} />,
        title: "Caricamento delle squadre in corso",
    },
    error: {
        icon: <AlertCircle className="text-red-600" size={48} />,
        title: "Errore nel caricamento delle squadre",
    }
}

const EmptyTeam = ({ type = "empty" }: EmptyTeamProps) => {
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

export default EmptyTeam