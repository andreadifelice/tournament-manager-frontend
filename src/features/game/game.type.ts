
export type Game = {
    id?: number;
    tournament_id: number;
    round?: number;
    team_a_id?: number;
    team_b_id?: number;
    team_a_score?: number;
    team_b_score?: number;
    winner_id?: number;
    next_match_id?: number;
}

export type ServerGame = {
    id?: number;
    tournament_id: number;
    round?: number;
    team_a_id?: number;
    team_b_id?: number;
    team_a_score?: number;
    team_b_score?: number;
    winner_id?: number;
    next_match_id?: number;
}

export type FormattedGame = {
    id: number;
    round: number;
    team_a_id: number | null;
    team_a_name: string | null;
    team_b_id: number | null;
    team_b_name: string | null;
    team_a_score: number | null;
    team_b_score: number | null;
    winner_id: number | null;
    next_match_id: number | null;
}

export type UpdateGameResponse = {
    message: string;
    completed_game: {
        id: number;
        winner_id: number;
        next_round: number;
    };
    ready_games_next_round: FormattedGame[];
}