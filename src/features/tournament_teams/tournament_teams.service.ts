import { myFetch } from "@/lib/backend";
import { type ServerTournamentTeam, type TournamentTeam } from "./tournament_teams.type";
import myEnv from "@/lib/env";

const tournamentTeams: TournamentTeam[] = [];

export class TournamentTeamService {

    static async create(data: Omit<TournamentTeam, 'id'>): Promise<TournamentTeam> {
        const newTournamentTeam = await myFetch<ServerTournamentTeam>(
            `${myEnv.backendApiUrl}/tournaments/${data.tournament_id}/teams`,
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        return newTournamentTeam;
    }

    static async list(tournamentId?: number): Promise<TournamentTeam[]> {
        const response = await myFetch<ServerTournamentTeam[]>(
            `${myEnv.backendApiUrl}/tournaments/${tournamentId}/teams`
        );
        return response;
    }
}