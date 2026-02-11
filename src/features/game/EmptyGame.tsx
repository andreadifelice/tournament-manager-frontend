import { AlertCircle, Check, LoaderCircle } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

type EmptyGameProps = {
    type?: "completed" | "pending" | "error"
}

const EMPTY_VARIANTS = {
    completed: {
        icon: <Check className="text-green-600" size={48} />,
        title: "Torneo concluso!",
        description: "Tutte le partite sono state completate",
    },
    pending: {
        icon: <LoaderCircle className="animate-spin" size={48} />,
        title: "Caricamento delle partite in corso",
        description: "Stiamo recuperando le partite",
    },
    error: {
        icon: <AlertCircle className="text-red-600" size={48} />,
        title: "Errore nel caricamento delle partite",
        description: "Si e verificato un errore. Riprova piu tardi",
    }
}

const EmptyGame = ({ type = "completed" }: EmptyGameProps) => {
    const variant = EMPTY_VARIANTS[type]
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {variant.icon}
                </EmptyMedia>
                <EmptyTitle>{variant.title}</EmptyTitle>
                <EmptyDescription>{variant.description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}

export default EmptyGame