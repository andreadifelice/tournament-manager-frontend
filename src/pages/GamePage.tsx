import DivMax4 from "@/components/div/DivMax4"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"
import GameCard from "@/features/game/GameCard"
import { TournamentService } from "@/features/tournament/tournament.service"
import { useEffect, useState } from "react"

const GamePage = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>()
    const [tournamentName, setTournamentName] = useState<string | null>(null)
    const [loadError, setLoadError] = useState<string | null>(null)
    
    /* gestione errore per ricerca torneo */
    if (!tournamentId) {
        return (
            <DivMax4 className="my-5 md:my-10">
                <div className="flex flex-wrap-reverse gap-3 md:flex-nowrap items-center justify-between">
                    <p className="text-red-500">Torneo non trovato</p>
                    <Link to={'/tournaments'}  className="flex w-full md:w-fit">
                        <Button className={"w-full"}>
                            <ArrowLeft />
                            Torna ai tornei
                        </Button>
                    </Link>
                </div>
            </DivMax4>
        )
    }

    const numTournamentId = parseInt(tournamentId, 10)

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const tournament = await TournamentService.get(numTournamentId)
                setTournamentName(tournament?.name ?? null)
            } catch (err) {
                setLoadError(err instanceof Error ? err.message : "Errore nel caricamento del torneo")
            }
        }

        fetchTournament()
    }, [numTournamentId])

    return (
        <DivMax4 className="my-5 md:my-10 space-y-4">
            <div className="flex flex-wrap-reverse gap-3 md:flex-nowrap items-center justify-between">
                {/* nome del torneo */}
                <h1 className="text-3xl font-bold">
                    Partite{tournamentName ? ` ${tournamentName}` : ""}
                </h1>

                {/* Button per ritornare alla pagina tornei */}
                <Link to={'/tournaments'} className="flex w-full md:w-fit">
                    <Button variant="outline" className={"w-full "}>
                        <ArrowLeft size={18} />
                        Torna ai tornei
                    </Button>
                </Link>
            </div>
            {loadError && <p className="text-sm text-red-500">{loadError}</p>}
            {/* lista delle partite del torneo */}
            <GameCard tournamentId={numTournamentId} />
        </DivMax4>
    )
}

export default GamePage