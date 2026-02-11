import { myFetch } from "@/lib/backend";
import myEnv from "@/lib/env";
import type { ServerTournament, Tournament } from "./tournament.type";

export class TournamentService {
    static async list(id?: number): Promise<Tournament[]> {
        console.log(myEnv.backendApiUrl)
        const tournaments = await myFetch<ServerTournament[]>(`${myEnv.backendApiUrl}/tournaments${id ? "?id=" + id : ""}`);
        return tournaments;
    }

    static async get(id: number): Promise<Tournament | undefined> {
        const tournament = await myFetch<ServerTournament>(`${myEnv.backendApiUrl}/tournaments/${id}`);
        return tournament;
    }

    static async create(tournament: Omit<Tournament, 'id'>): Promise<Tournament> {
        const newTournament = await myFetch<Tournament>(`${myEnv.backendApiUrl}/tournaments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tournament),
        });
        return newTournament;
    }

    static async update(id: number, tournament: Partial<Tournament>): Promise<Tournament> {
        const updatedTournament = await myFetch<Tournament>(`${myEnv.backendApiUrl}/tournaments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tournament),
        });
        return updatedTournament;
    }
}