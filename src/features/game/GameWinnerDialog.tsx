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
            <DialogContent className="max-w-sm rounded-2xl md:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Trophy className="text-yellow-500" size={24} />
                        Partita completata!
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <p className="text-start text-lg font-semibold text-green-600">
                        {winnerName}
                    </p>
                </div>
                <DialogFooter className="block">
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
