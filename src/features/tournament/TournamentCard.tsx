import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import useTournamentCard from "@/features/tournament/useTournamentCard"
import { Link } from "react-router"
import EmptyTournament from "./EmptyTournament"
import { ChevronRight } from "lucide-react"

/* gestione dello status dinamica in base alla pagina in cui si trova */
type TournamentCardProps = {
    status?: string
}

const TournamentCard = ({ status = 'active' }: TournamentCardProps) => {
    const { tournaments, emptyState, getStatusLabel } = useTournamentCard({ status })

    /* gestione dinamica dell'empty */
    if (emptyState) {
        return <EmptyTournament type={emptyState} />
    }

    return (
        <ItemGroup className="w-full gap-2">
            {tournaments.map((tournament) => (
                <Link to={`/tournaments/${tournament.id}/games`} key={tournament.id}>
                    <Item
                        variant="outline"
                        className="border-2 shadow-gray-100 shadow-sm rounded-2xl cursor-pointer hover:bg-accent/50 dark:hover:text-primary transition"
                    >
                        <ItemContent className="gap-1">
                            <div className="flex gap-2 items-center justify-between">
                                <div className="flex flex-col justify-between">
                                    <ItemTitle className="text-xl font-bold">{tournament.name}</ItemTitle>
                                    <ItemDescription>{tournament.location}</ItemDescription>
                                    <ItemDescription>{getStatusLabel(tournament.date)}</ItemDescription>
                                    <ItemDescription>Stato: {getStatusLabel(tournament.status)}</ItemDescription>
                                </div>
                                <div className="border-2 shadow-sm shadow-gray-100 rounded-full p-2">
                                    <ChevronRight/>
                                </div>
                            </div>
                        </ItemContent>
                    </Item>
                </Link>
            ))}
        </ItemGroup>
    )
}

export default TournamentCard