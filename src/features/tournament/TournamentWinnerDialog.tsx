import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy } from "lucide-react"

type TournamentWinnerDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    winnerName: string
}

const TournamentWinnerDialog = ({ open, onOpenChange, winnerName }: TournamentWinnerDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 justify-center">
                        <Trophy className="text-yellow-500" size={32} />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-8 text-center space-y-4">
                    <p className="text-3xl font-bold text-yellow-600">🏆 CAMPIONE 🏆</p>
                    <p className="text-2xl font-semibold text-yellow-600">
                        {winnerName}
                    </p>
                    <p className="text-sm text-gray-400">Ha vinto il torneo!</p>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>
                        Chiudi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TournamentWinnerDialog
