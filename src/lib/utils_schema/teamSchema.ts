import { z } from "zod"
export const teamFormSchema = z.object({
    name: z.string().min(2, { message: "Almeno 2 caratteri" }).regex(/[A-Z]/, "Almeno una maiuscola"),
    power: z.coerce.number().min(1, { message: "Inserisci una potenza valida" })
})

export type TeamFormValues = z.infer<typeof teamFormSchema>
