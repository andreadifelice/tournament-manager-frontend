import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Game } from "@/features/game/game.type"
import { LoaderCircle } from "lucide-react"

type GameEditFormProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedGame: Game | null
    getTeamName: (teamId: number | undefined) => string
    formData: { team_a_score: string; team_b_score: string }
    onFormChange: (values: { team_a_score: string; team_b_score: string }) => void
    updateError: string | null
    updating: boolean
    onSave: () => void
}

const GameEditForm = ({
    open,
    onOpenChange,
    selectedGame,
    getTeamName,
    formData,
    onFormChange,
    updateError,
    updating,
    onSave,
}: GameEditFormProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xs md:max-w-xl rounded-2xl">
                <DialogHeader className="text-start">
                    <DialogTitle>Aggiungi risultato partita</DialogTitle>
                    <DialogDescription>
                        Round {selectedGame?.round} - {getTeamName(selectedGame?.team_a_id)} vs {getTeamName(selectedGame?.team_b_id)}
                    </DialogDescription>
                </DialogHeader>

                {updateError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {updateError}
                    </div>
                )}

                <FieldGroup>
                    <FieldSet>
                        <Field>
                            <FieldLabel htmlFor="team_a_score">Punteggio {getTeamName(selectedGame?.team_a_id)}</FieldLabel>
                            <Input
                                id="team_a_score"
                                type="number"
                                min="0"
                                value={formData.team_a_score}
                                onChange={(e) =>
                                    onFormChange({ ...formData, team_a_score: e.target.value })
                                }
                                placeholder="0"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="team_b_score">Punteggio {getTeamName(selectedGame?.team_b_id)}</FieldLabel>
                            <Input
                                id="team_b_score"
                                type="number"
                                min="0"
                                value={formData.team_b_score}
                                onChange={(e) =>
                                    onFormChange({ ...formData, team_b_score: e.target.value })
                                }
                                placeholder="0"
                            />
                        </Field>
                    </FieldSet>
                </FieldGroup>

                <DialogFooter className="gap-2 md:justify-start">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={updating}
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={onSave}
                        disabled={updating}
                    >
                        {updating ? (
                            <>
                                Salvataggio...
                                <LoaderCircle className="mr-2 animate-spin" size={16} />
                            </>
                        ) : (
                            "Salva risultato"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GameEditForm