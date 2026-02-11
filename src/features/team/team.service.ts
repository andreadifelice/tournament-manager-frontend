import { myFetch } from "@/lib/backend";
import myEnv from "@/lib/env";
import type { ServerTeam, Team } from "./team.type";

export class TeamService {
    static async list(id?: number): Promise<Team[]> {
        console.log(myEnv.backendApiUrl)
        const teams = await myFetch<ServerTeam[]>(`${myEnv.backendApiUrl}/teams${id ? "?id=" + id : ""}`);
        return teams;
    }

    static async get(id: number): Promise<Team | undefined> {
        const team = await myFetch<ServerTeam>(`${myEnv.backendApiUrl}/teams/${id}`);
        return team;
    }

    static async create(team: Omit<Team, 'id'>): Promise<Team> {
        const newTeam = await myFetch<Team>(`${myEnv.backendApiUrl}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });
        return newTeam;
    }

    static async update(id: number, team: Partial<Team>): Promise<Team> {
        const updatedTeam = await myFetch<Team>(`${myEnv.backendApiUrl}/teams/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(team),
        });
        return updatedTeam;
    }

    static async delete(id: number): Promise<void> {
        await myFetch<void>(`${myEnv.backendApiUrl}/teams/${id}`, {
            method: 'DELETE',
        });
    }
}