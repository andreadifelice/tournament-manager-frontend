import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Trophy } from "lucide-react"

type GameWinnerDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onClose?: () => void
    winnerName: string
}

const GameWinnerDialog = ({ open, onOpenChange, winnerName, onClose }: GameWinnerDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={24} />
                        Partita completata!
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-center text-lg font-semibold text-green-600">
                        {winnerName}
                    </p>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            onOpenChange(false)
                            onClose?.()
                        }}
                    >
                        Chiudi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GameWinnerDialog
