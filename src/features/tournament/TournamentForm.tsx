import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TournamentService } from "@/features/tournament/tournament.service"
import { tournamentFormSchema } from "@/lib/utils_schema/tournamentSchema"
import { useState } from "react"
import SelectDate from "./SelectDate"
import SelectTeams from "./SelectTeams"

const TournamentForm = () => {
    const [formData, setFormData] = useState({ name: "", date: "", location: "" })
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; location?: string; date?: string }>({})


    const handleSubmit = async (e: React.FormEvent) => {
        //previene il reload della pagina
        e.preventDefault()

        const validation = tournamentFormSchema.safeParse({
            name: formData.name,
            date: formData.date,
            location: formData.location,
            teamIds: selectedTeamIds,
        })

        if (!validation.success) {
            setError(validation.error.issues[0]?.message ?? "Compila tutti i campi")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            await TournamentService.create({
                name: formData.name,
                date: formData.date,
                location: formData.location,
                teams: selectedTeamIds.map(id => parseInt(id, 10)),
            })
            setFormData({ name: "", date: "", location: "" })
            setSelectedTeamIds([])
            setSuccess("Torneo creato con successo!")
            setTimeout(() => setSuccess(null), 3000)
            // Ricarico la pagina una volta creato il torneo
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nella creazione")
        }

        setIsSubmitting(false)
    }

    const fieldData = [
        {
            htmlfor: "name",
            type:"text",
            label: "Nome",
            inputId: "name",
            inputValue: formData.name,
            inputPlaceholder: "Ex: Torneo Primavera"
        },
        {
            htmlfor: "location",
            type:"text",
            label: "Luogo",
            inputId: "location",
            inputValue: formData.location,
            inputPlaceholder: "Ex: Milano"
        },
    ]

    const validateField = (fieldName: "name" | "location" | "date", value: string) => {
        const fieldSchema = tournamentFormSchema.shape[fieldName]
        const result = fieldSchema.safeParse(value)
        setFieldErrors((prev) => ({
            ...prev,
            [fieldName]: result.success ? undefined : (result.error.issues[0]?.message ?? "Valore non valido"),
        }))
    }

    const handleFieldChange = (fieldName: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData({ ...formData, [fieldName]: value })
        if (fieldName === "name" || fieldName === "location") {
            validateField(fieldName, value)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        {/* Nome torneo + Luogo torneo */}
                        {fieldData.map((field) =>
                            <Field key={field.inputId} className="flex flex-col gap-2">
                                <FieldLabel htmlFor={field.htmlfor}>{field.label} torneo</FieldLabel>
                                <Input
                                    id={field.inputId}
                                    type={field.type}
                                    value={field.inputValue}
                                    onChange={handleFieldChange(field.inputId as keyof typeof formData)}
                                    disabled={isSubmitting}
                                    className={fieldErrors[field.inputId as "name" | "location"] ? "border-red-500" : undefined}
                                    placeholder={field.inputPlaceholder}
                                />
                                {/* testo errore individuale per i due campi */}
                                {fieldErrors[field.inputId as "name" | "location"] && (
                                    <p className="text-xs text-red-500">
                                        {fieldErrors[field.inputId as "name" | "location"]}
                                    </p>
                                )}
                            </Field>
                        )}
                        {/* Seleziona data */}
                        <SelectDate
                            date={formData.date}
                            onChange={(date) => {
                                setFormData({ ...formData, date })
                                validateField("date", date)
                            }}
                            isSubmitting={isSubmitting}
                        />
                        {fieldErrors.date && <p className="text-xs text-red-500">{fieldErrors.date}</p>}
                        {/* seleziona squadre */}
                        <SelectTeams
                            selectedTeamIds={selectedTeamIds}
                            onChange={setSelectedTeamIds}
                            isSubmitting={isSubmitting}
                        />
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-fit">
                {isSubmitting ? "Creazione..." : "Crea Torneo"}
            </Button>
        </form>
    )
}

export default TournamentForm