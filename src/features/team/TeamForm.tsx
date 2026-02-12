import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TeamService } from "@/features/team/team.service"
import { teamFormSchema } from "@/lib/utils_schema/teamSchema"
import { useState } from "react"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"


const TeamForm = () => {
    const [formData, setFormData] = useState({ name: "", power: 0 })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; power?: string }>({})

    //invio dei dati
    const handleSubmit = async (e: React.FormEvent) => {
        //previene il reload della pagina
        e.preventDefault()
        
        const validation = teamFormSchema.safeParse({
            name: formData.name,
            power: formData.power,
        })

        if (!validation.success) {
            const newErrors: { name?: string; power?: string } = {}
            validation.error.issues.forEach((issue) => {
                const field = issue.path[0]
                if (field === "name" || field === "power") {
                    newErrors[field] = issue.message
                }
            })
            setFieldErrors((prev) => ({ ...prev, ...newErrors }))
            setError(validation.error.issues[0]?.message ?? "Compila tutti i campi")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            await TeamService.create({
                name: validation.data.name,
                power: validation.data.power,
            })
            setFormData({ name: "", power: 0 })
            setFieldErrors({})
            setSuccess("Squadra creata con successo!")
            setTimeout(() => setSuccess(null), 10000)
            // Ricarico la pagina una volta creata la squadra
            window.location.reload()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nella creazione")
        }
        setIsSubmitting(false)
    }

    /* array degli input */
    const fieldData = [
        {
            htmlfor: "name",
            label: "Nome della",
            inputId: "name",
            inputValue: formData.name,
            inputPlaceholder: "Ex: Milan"
        },
        {
            htmlfor: "power",
            label: "Potenza della",
            inputId: "power",
            type:"number",
            inputValue: formData.power,
            inputPlaceholder: "Ex: 2, 4, 8, 16"
        },
    ]

    /* gestione validazione field */
    const validateField = (fieldName: "name" | "power", value: string) => {
        const fieldSchema = teamFormSchema.shape[fieldName]
        const result = fieldSchema.safeParse(value)
        setFieldErrors((prev) => ({
            ...prev,
            [fieldName]: result.success ? undefined : (result.error.issues[0]?.message ?? "Valore non valido"),
        }))
    }

    /* gestione onchange */
    const handleFieldChange = (fieldName: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData({ ...formData, [fieldName]: value })
        if (fieldName === "name" || fieldName === "power") {
            validateField(fieldName, value)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* campo nome e potenza della squadra */}
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        {fieldData.map((field) =>
                            <Field key={field.inputId} className="flex flex-col gap-2">
                                <FieldLabel htmlFor={field.htmlfor}>{field.label} squadra</FieldLabel>
                                <Input
                                    id={field.inputId}
                                    value={field.inputValue}
                                    type={field.type}
                                    onChange={handleFieldChange(field.inputId as keyof typeof formData)}
                                    disabled={isSubmitting}
                                    className={fieldErrors[field.inputId as "name" | "power"] ? "border-red-500" : undefined}
                                    placeholder={field.inputPlaceholder}
                                />
                                {fieldErrors[field.inputId as "name" | "power"] && (
                                    <p className="text-xs text-red-500">
                                        {fieldErrors[field.inputId as "name" | "power"]}
                                    </p>
                                )}
                            </Field>
                        )}
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-fit">
                {isSubmitting ? "Creazione..." : "Crea squadra"}
            </Button>
        </form>
    )
}

export default TeamForm