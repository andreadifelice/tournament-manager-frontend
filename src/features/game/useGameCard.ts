import { useEffect, useState } from "react"
import { GameService } from "@/features/game/game.service"
import type { FormattedGame, Game } from "@/features/game/game.type"
import { TeamService } from "@/features/team/team.service"
import { TournamentService } from "@/features/tournament/tournament.service"

interface UseGameCardProps {
    tournamentId: number
    onTournamentComplete?: () => void
}

const useGameCard = ({ tournamentId, onTournamentComplete }: UseGameCardProps) => {
    /* States & Setters */
    const [games, setGames] = useState<Game[]>([])
    const [readyGamesNextRound, setReadyGamesNextRound] = useState<FormattedGame[]>([])
    const [showNextRound, setShowNextRound] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState<string | null>(null)
    const [selectedGame, setSelectedGame] = useState<Game | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({ team_a_score: "", team_b_score: "" })
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [loadingNextRound, setLoadingNextRound] = useState(false)
    const [teamNames, setTeamNames] = useState<Map<number, string>>(new Map())
    const [isTournamentComplete, setIsTournamentComplete] = useState(false)
    const [tournamentWinnerId, setTournamentWinnerId] = useState<number | null>(null)
    const [showWinnerDialog, setShowWinnerDialog] = useState(false)

    /* valori dinamici */
    const unfinishedGames = games.filter((game) => !game.winner_id)
    const currentRound = unfinishedGames.reduce((min, game) => {
        if (!game.round) return min
        if (min === null) return game.round
        return Math.min(min, game.round)
    }, null as number | null)
    const currentRoundGames = currentRound
        ? unfinishedGames.filter((game) => game.round === currentRound)
        : []


    /* Empty dinamico */
    const emptyState: "pending" | "error" | null =
        loading ? "pending" :
        error ? "error" :
        null


    /* recupero dati e caricamento */
    useEffect(() => {
        const fetchGames = async () => {
            try {
                // Carica i team
                const teamData = await TeamService.list()
                
                // Crea una mappa veloce id -> nome
                const nameMap = new Map<number, string>()
                teamData.forEach(team => {
                    if (team.id) nameMap.set(team.id, team.name)
                })
                setTeamNames(nameMap)
                
                // Carica le partite
                const data = await GameService.listByTournament(tournamentId)
                setGames(data)
                
                // Carica il torneo per verificare lo stato
                const tournament = await TournamentService.get(tournamentId)
                if (tournament) {
                    // Se il torneo è completato, trova il vincitore
                    if (tournament.status === 'completed') {
                        // Trova il game con il round più alto che ha un winner_id
                        const finalGame = data.reduce((max, current) => {
                            if (!current.winner_id) return max
                            if (!max || (current.round && max.round && current.round > max.round)) {
                                return current
                            }
                            return max
                        }, null as Game | null)
                        
                        if (finalGame?.winner_id) {
                            setTournamentWinnerId(finalGame.winner_id)
                            setShowWinnerDialog(true)
                        }
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            }
            setLoading(false)
        }

        fetchGames()
    }, [tournamentId])


    /* Prende il nome del team dal suo id */
    const getTeamName = (teamId: number | undefined) => {
        if (!teamId) return "In attesa"
        return teamNames.get(teamId) || `Team #${teamId}`
    }


    /* funzione per modal che decreta il vincitore */
    const handleWinnerDialogChange = (open: boolean) => {
        setShowWinnerDialog(open)
        if (!open) {
            onTournamentComplete?.()
        }
    }


    /* inserisco i risultati */
    const handleUpdateResults = (game: Game) => {
        setSelectedGame(game)
        setFormData({ team_a_score: "", team_b_score: "" })
        setIsModalOpen(true)
        setUpdateError(null)
    }


    /* confermo il salvataggio */
    const handleSaveResults = async () => {
        if (!selectedGame) return
        
        const scoreA = parseInt(formData.team_a_score)
        const scoreB = parseInt(formData.team_b_score)
        
        if (isNaN(scoreA) || isNaN(scoreB)) {
            setUpdateError("I punteggi devono essere numeri interi")
            return
        }
        
        if (scoreA < 0 || scoreB < 0) {
            setUpdateError("I punteggi non possono essere negativi")
            return
        }

        if (scoreA === scoreB) {
            setUpdateError("Pareggio non consentito")
            return
        }

        try {
            setUpdating(true)
            const response = await GameService.updateResults(
                tournamentId,
                selectedGame.id!,
                scoreA,
                scoreB
            )
            
            const teamAName = getTeamName(selectedGame.team_a_id)
            const teamBName = getTeamName(selectedGame.team_b_id)
            const winnerTeam = scoreA > scoreB ? teamAName : teamBName
            const message = `🎉 ${winnerTeam} ha vinto con un punteggio di ${Math.max(scoreA, scoreB)} - ${Math.min(scoreA, scoreB)}!`
            
            // Rimuovi la partita aggiornata dalla lista corrente
            setGames(games.filter(g => g.id !== selectedGame.id))
            
            const winnerId = scoreA > scoreB ? selectedGame.team_a_id : selectedGame.team_b_id
            if (response.ready_games_next_round.length === 0 && unfinishedGames.length === 1) {
                setIsTournamentComplete(true)
                if (winnerId) {
                    setTournamentWinnerId(winnerId)
                }
                setShowWinnerDialog(true)
            } else {
                setSuccessMessage(message)
                setShowSuccessDialog(true)
                // Mostra le partite del prossimo round pronte
                setReadyGamesNextRound(response.ready_games_next_round)
                setShowNextRound(true)
            }
            
            setIsModalOpen(false)
            setSelectedGame(null)
        } catch (err) {
            setUpdateError(err instanceof Error ? err.message : "Errore nell'aggiornamento")
        }
        setUpdating(false)
    }


    /* metodo per procedere al prossimo round */
    const handleProceedToNextRound = async () => {
        try {
            setLoadingNextRound(true)
            const updatedGames = await GameService.listByTournament(tournamentId)
            setGames(updatedGames)
            setReadyGamesNextRound([])
            setShowNextRound(false)
            setShowSuccessDialog(false)
            setSuccessMessage(null)
            
            // Controlla se il torneo è concluso
            if (updatedGames.length === 0) {
                setIsTournamentComplete(true)
                setShowWinnerDialog(true)
            }
        } catch (err) {
            console.error("Errore nel caricamento del prossimo round", err)
        } 
        setLoadingNextRound(false)
    }


    return {
        /* States */
        games,
        readyGamesNextRound,
        showNextRound,
        loading,
        error,
        updating,
        updateError,
        selectedGame,
        isModalOpen,
        formData,
        successMessage,
        showSuccessDialog,
        loadingNextRound,
        isTournamentComplete,
        tournamentWinnerId,
        showWinnerDialog,
        currentRound,
        currentRoundGames,
        emptyState,
        /* Setters */
        setIsModalOpen,
        setShowSuccessDialog,
        setFormData,
        /* Handlers */
        getTeamName,
        handleWinnerDialogChange,
        handleUpdateResults,
        handleSaveResults,
        handleProceedToNextRound,
    }
}

export default useGameCard
