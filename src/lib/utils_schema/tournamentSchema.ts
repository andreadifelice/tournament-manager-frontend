import { z } from "zod"
export const tournamentFormSchema = z.object({
    name: z.string().min(2, { error: "Almeno 2 caratteri" }).regex(/[A-Z]/, 'Almeno una maiuscola'),
    location: z.string().min(2, { error: "Almeno 2 caratteri" }).regex(/[A-Z]/, 'Almeno una maiuscola'),
    date: z
        .string()
        .min(1, { message: "Seleziona una data" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato data non valido"),
    teamIds: z.array(z.string()).min(1, { message: "Seleziona almeno una squadra" }),
})

export type TournamentFormValues = z.infer<typeof tournamentFormSchema>
