import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy } from "lucide-react"

type TournamentWinnerDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    winnerName: string
}

const TournamentWinnerDialog = ({ open, onOpenChange, winnerName }: TournamentWinnerDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm rounded-2xl md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-5 justify-center">
                        <Trophy className="text-yellow-500" size={32} />
                        <p className="text-yellow-500 text-3xl">Campione del torneo</p>
                        <Trophy className="text-yellow-500" size={32} />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-8 text-center space-y-4">
                    <p className="text-2xl font-semibold text-yellow-600 animate-bounce">
                        {winnerName}
                    </p>
                    <p className="text-sm text-gray-400">Ha vinto il torneo!</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TournamentWinnerDialog
