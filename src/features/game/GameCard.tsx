import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import EmptyGame from "@/features/game/EmptyGame"
import GameEditForm from "@/features/game/GameEditForm"
import GameWinnerDialog from "@/features/game/GameWinnerDialog"
import useGameCard from "@/features/game/useGameCard"
import TournamentWinnerDialog from "@/features/tournament/TournamentWinnerDialog"
import { ChevronRight, LoaderCircle, Plus } from "lucide-react"

type GameCardProps = {
    tournamentId: number
    onTournamentComplete?: () => void
}

const GameCard = ({ tournamentId, onTournamentComplete }: GameCardProps) => {
    const {
        readyGamesNextRound,
        showNextRound,
        emptyState,
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
        setIsModalOpen,
        setShowSuccessDialog,
        setFormData,
        getTeamName,
        handleWinnerDialogChange,
        handleUpdateResults,
        handleSaveResults,
        handleProceedToNextRound,
    } = useGameCard({ tournamentId, onTournamentComplete })

    /* gestione dinamica dell'empty */
    if (emptyState) {
        return <EmptyGame type={emptyState} />
    }

    return (
        <div className="space-y-6">
            {currentRoundGames.length === 0 && readyGamesNextRound.length === 0 ? 
                isTournamentComplete ? (
                    /* se il torneo è concluso mostra questo empty */
                    <EmptyGame type="completed"/>
                ) : (
                    /* se non non lo è mostra questo empty */
                    <EmptyGame type="completed"/>
                )
                : (
                <>
                    {/* Partite attuali */}
                    {currentRoundGames.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Round {currentRound}</h3>
                            <ItemGroup className="space-y-3">
                                {currentRoundGames.map((game) => (
                                    <Item key={game.id} variant={"outline"} className="shadow-gray-200 shadow-sm rounded-2xl">
                                        <ItemContent className="flex items-center">
                                            <div className="flex-wrap md:flex space-y-3 justify-between items-center w-full">
                                                <div className="flex-1 space-y-1 md:m-0">
                                                    <ItemTitle className="text-lg">{getTeamName(game.team_a_id)} vs {getTeamName(game.team_b_id)}</ItemTitle>
                                                    <ItemDescription>
                                                        {game.team_a_score !== undefined && game.team_b_score !== undefined && (
                                                            <div className="text-sm font-semibold text-green-600">
                                                                Risultato: {game.team_a_score} - {game.team_b_score}
                                                            </div>
                                                        )}
                                                    </ItemDescription>
                                                </div>
                                                {!game.team_a_score && !game.team_b_score && (
                                                    <Button
                                                        onClick={() => handleUpdateResults(game)}
                                                        variant="default"
                                                        className="w-full md:w-fit"
                                                    >
                                                        Aggiungi risultato
                                                        <Plus/>
                                                    </Button>
                                                )}
                                            </div>
                                        </ItemContent>
                                    </Item>
                                ))}
                            </ItemGroup>
                        </div>
                    )}

                    {/* Bottone con lista per le prossime partite che si mostra solo quando finisce il round */}
                    {showNextRound && readyGamesNextRound.length > 0 && (
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Partite pronte - Prossimo round</h3>
                                <Button
                                    onClick={handleProceedToNextRound}
                                    disabled={loadingNextRound}
                                    className="flex gap-2"
                                >
                                    Procedi al prossimo round
                                    {loadingNextRound ? (
                                        <LoaderCircle className="animate-spin" size={18} />
                                    ) : (
                                        <ChevronRight size={18} />
                                    )}
                                </Button>
                            </div>
                            <ItemGroup>
                                {readyGamesNextRound.map((game) => (
                                    <Item key={game.id}>
                                        <ItemContent>
                                            <ItemTitle>Round {game.round}</ItemTitle>
                                            <ItemDescription>
                                                <div className="space-y-1">
                                                    <div className="text-sm">
                                                        <span className="font-medium">{game.team_a_name || "In attesa"}</span>
                                                        {" vs "}
                                                        <span className="font-medium">{game.team_b_name || "In attesa"}</span>
                                                    </div>
                                                </div>
                                            </ItemDescription>
                                        </ItemContent>
                                    </Item>
                                ))}
                            </ItemGroup>
                        </div>
                    )}
                </>
            )}

            {/* Dialog per mostrare vincitore del torneo */}
            <TournamentWinnerDialog
                open={showWinnerDialog}
                onOpenChange={handleWinnerDialogChange}
                winnerName={tournamentWinnerId ? getTeamName(tournamentWinnerId) : "Squadra sconosciuta"}
            />

            {/* Dialog per mostrare vincitore della partita*/}
            <GameWinnerDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                winnerName={successMessage ?? ""}
                onClose={() => {setShowSuccessDialog(false)}}
            />

            {/* Dialog per inserire i risultati della partita */}
            <GameEditForm
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                selectedGame={selectedGame}
                getTeamName={getTeamName}
                formData={formData}
                onFormChange={setFormData}
                updateError={updateError}
                updating={updating}
                onSave={handleSaveResults}
            />
        </div>
    )
}

export default GameCard
