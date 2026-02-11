import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { TournamentService } from "@/features/tournament/tournament.service"
import { TournamentTeamService } from "@/features/tournament_teams/tournament_teams.service"
import { useEffect, useState } from "react"

type SelectTeamsProps = {
    selectedTeamIds: string[]
    onChange: (teamIds: string[]) => void
    isSubmitting: boolean
}

const SelectTeams = ({ selectedTeamIds, onChange, isSubmitting }: SelectTeamsProps) => {
    const anchorRef = useComboboxAnchor()
    const [availableTeams, setAvailableTeams] = useState<Team[]>([])

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teams = await TeamService.list()
                const tournaments = await TournamentService.list()
                const usedTeamIds = new Set<number>()

                const tournamentTeamsPromises = tournaments.map(t =>
                    TournamentTeamService.list(t.id).catch(() => [])
                )

                const allTournamentTeams = await Promise.all(tournamentTeamsPromises)

                for (const ttArray of allTournamentTeams) {
                    for (const tt of ttArray) {
                        if (tt.team_id) {
                            if (Array.isArray(tt.team_id)) {
                                tt.team_id.forEach((teamId: number) => usedTeamIds.add(teamId))
                            } else if (typeof tt.team_id === "number") {
                                usedTeamIds.add(tt.team_id)
                            }
                        }
                    }
                }

                const filtered = teams.filter((team) => !usedTeamIds.has(team.id))
                setAvailableTeams(filtered)
            } catch (err) {
                console.error("Errore nel caricamento delle squadre:", err)
            }
        }

        fetchTeams()
    }, [])

    return (
        <Field className="flex flex-col gap-2">
            <FieldLabel>Squadre partecipanti</FieldLabel>
            <Combobox
                multiple
                items={availableTeams.map(t => t.name)}
                value={availableTeams
                    .filter(t => selectedTeamIds.includes(t.id.toString()))
                    .map(t => t.name)
                }
                onValueChange={(values) => {
                    const newIds = values.map(name => {
                        const team = availableTeams.find(t => t.name === name)
                        return team?.id.toString() || ""
                    }).filter(id => id !== "")
                    onChange(newIds)
                }}
            >
                <ComboboxChips ref={anchorRef} className="w-full">
                    <ComboboxValue>
                        {(values) => (
                            <>
                                {values.map((value: string) => (
                                    <ComboboxChip key={value}>
                                        {value}
                                    </ComboboxChip>
                                ))}
                                <ComboboxChipsInput
                                    placeholder={selectedTeamIds.length === 0 ? "Seleziona squadre..." : ""}
                                    disabled={isSubmitting}
                                />
                            </>
                        )}
                    </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={anchorRef}>
                    <ComboboxEmpty>Nessuna squadra disponibile</ComboboxEmpty>
                    <ComboboxList>
                        {(item) => (
                            <ComboboxItem key={item} value={item}>
                                {item}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </Field>
    )
}

export default SelectTeams
