
export type Tournament = {
    id: number;
    name: string;
    date?: string;
    location?: string;
    teams?: number[];
    status?: string;
}

export type ServerTournament = {
    id: number;
    name: string;
    date?: string;
    location?: string;
    teams?: number[];
    status?: string;
}
