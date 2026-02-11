import { myFetch } from "@/lib/backend";
import myEnv from "@/lib/env";
import type { Game, ServerGame, UpdateGameResponse } from "./game.type";

export class GameService {

    /**
     * GET /tournaments/{tournament_id}/games
     * Ottiene tutte le partite di un torneo
     */
    static async listByTournament(tournamentId: number): Promise<Game[]> {
        const games = await myFetch<ServerGame[]>(
            `${myEnv.backendApiUrl}/tournaments/${tournamentId}/games`
        );
        return games;
    }

    /**
     * Ottiene una singola partita per ID
     */
    static async get(id: number): Promise<Game | undefined> {
        const game = await myFetch<ServerGame>(`${myEnv.backendApiUrl}/games/${id}`);
        return game;
    }

    /**
     * Crea una nuova partita
     */
    static async create(game: Omit<Game, 'id'>): Promise<Game> {
        const newGame = await myFetch<Game>(`${myEnv.backendApiUrl}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        });
        return newGame;
    }

    /**
     * PATCH /tournaments/{tournament_id}/games/{game_id}
     * Aggiorna i risultati della partita, decreta il vincitore e carica le partite pronte del prossimo round
     */
    static async updateResults(
        tournamentId: number,
        gameId: number,
        team_a_score: number,
        team_b_score: number
    ): Promise<UpdateGameResponse> {
        const response = await myFetch<UpdateGameResponse>(
            `${myEnv.backendApiUrl}/tournaments/${tournamentId}/games/${gameId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ team_a_score, team_b_score }),
            }
        );
        return response;
    }

    /**
     * Elimina una partita
     */
    static async delete(id: number): Promise<void> {
        await myFetch<void>(`${myEnv.backendApiUrl}/games/${id}`, {
            method: 'DELETE',
        });
    }
}