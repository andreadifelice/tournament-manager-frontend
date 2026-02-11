import { useEffect, useState } from "react"
import { TournamentService } from "@/features/tournament/tournament.service"
import type { Tournament } from "@/features/tournament/tournament.type"

interface UseTournamentCardProps {
    status?: string
}

const useTournamentCard = ({ status = 'active' }: UseTournamentCardProps) => {
    /* States & Setters */
    const [tournaments, setTournaments] = useState<Tournament[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    

    /* empty dinamico */
    const emptyState: "pending" | "empty" | "error" | null = 
        loading ? "pending" : 
        error ? "error" : 
        tournaments.length === 0 ? "empty" : 
        null


    /* recupero dati e caricamento */
    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await TournamentService.list()
                // Filtra i tornei in base allo status passato come prop
                const filteredTournaments = data.filter((tournament) => tournament.status === status)
                setTournaments(filteredTournaments)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            } 
            setLoading(false)
        }

        fetchTournaments()
    }, [status])

    /* status del torneo */
    const getStatusLabel = (status: string | undefined) => {
        const statusMap: Record<string, string> = {
            'active': 'Attivo',
            'completed': 'Completato',
            'pending': 'In sospeso',
            'cancelled': 'Annullato'
        }
        return statusMap[status || ''] || status || 'Sconosciuto'
    }


    return {
        /* State */
        tournaments,
        loading,
        error,
        /* empty dinamico */
        emptyState,
        /* status torneo */
        getStatusLabel,
    }
}

export default useTournamentCard
