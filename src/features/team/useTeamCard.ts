import { useEffect, useState } from "react"
import { Pen, Trash2Icon } from "lucide-react"
import { TeamService } from "@/features/team/team.service"
import type { Team } from "@/features/team/team.type"
import { teamFormSchema } from "@/lib/utils_schema/teamSchema"

type FieldErrors = { name?: string; power?: string }

type FormData = {
    name: string
    power: number
}


/* bottoni per l'edit e l'eliminazione del team */
type ActionItem = {
    key: "edit" | "delete"
    label: string
    variant: "secondary" | "destructive"
    icon: typeof Pen
    onClick: (team: Team) => void
}

/* input dinamici per il form di editing della squadra */
type EditField = {
    htmlFor: "name" | "power"
    label: string
    type: "text" | "number"
    value: string | number
    placeholder: string
}

/* Bottone annulla, salva e conferma */
type FooterButton = {
    key: "cancel" | "save" | "confirm"
    label: string
    variant: "secondary" | "default" | "outline" | "destructive"
    onClick: () => void
}

export const useTeamCard = () => {
    /* States & Setters */
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [editing, setEditing] = useState<Team | null>(null)
    const [deleting, setDeleting] = useState<Team | null>(null)
    const [formData, setFormData] = useState<FormData>({ name: "", power: 0 })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteError, setDeleteError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

    /* state degli empty */
    const emptyState: "pending" | "error" | "empty" | null =
        loading ? "pending" :
        error ? "error" :
        teams.length === 0 ? "empty" :
        null


    /* recupero dati e caricamento */
    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await TeamService.list()
                /* Filtro le squadre per creata più recente in alto */
                const sorted = data.sort((a, b) => {
                    const dateA = new Date(a.created_at || 0).getTime()
                    const dateB = new Date(b.created_at || 0).getTime()
                    return dateB - dateA
                })
                setTeams(sorted)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nel caricamento")
            }
            setLoading(false)
        }
        fetch()
    }, [])

    /* modifica la squadra */
    const handleEdit = (team: Team) => {
        setEditing(team)
        setFormData({ name: team.name, power: team.power || 0 })
        setFieldErrors({})
        setIsModalOpen(true)
    }

    /* salvo le modifiche */
    const handleSave = async () => {
        if (!editing) return
        const validation = teamFormSchema.safeParse({
            name: formData.name,
            power: formData.power,
        })

        /* validazione form che riporta un errore*/
        if (!validation.success) {
            const newErrors: FieldErrors = {}
            validation.error.issues.forEach((issue) => {
                const field = issue.path[0]
                if (field === "name" || field === "power") {
                    newErrors[field] = issue.message
                }
            })
            setFieldErrors(newErrors)
            return
        }

        /* aggiornamento dei dati una volta confermato il salvataggio */
        try {
            await TeamService.update(editing.id, {
                name: validation.data.name,
                power: validation.data.power,
            })
            setTeams(
                teams.map((t) =>
                    t.id === editing.id ? { ...t, name: validation.data.name, power: validation.data.power } : t
                )
            )
            setIsModalOpen(false)
            setEditing(null)
        } catch (err) {
            console.error("Errore nell'aggiornamento:", err)
        }
    }

    /* elimino la squadra */
    const handleDelete = (team: Team) => {
        setDeleting(team)
        setDeleteError(null)
        setIsDeleteModalOpen(true)
    }

    /* confermo l'eliminazione della squadra*/
    const handleDeleteConfirm = async () => {
        if (!deleting) return
        try {
            await TeamService.delete(deleting.id)
            setTeams(teams.filter((t) => t.id !== deleting.id))
            setIsDeleteModalOpen(false)
            setDeleting(null)
        } catch (err) {
            if (err instanceof Error) {
                setDeleteError(err.message)
            } else {
                setDeleteError("Si e verificato un errore sconosciuto.")
            }
        }
    }

    /* validazione form completa*/
    const validateField = (fieldName: "name" | "power", value: string) => {
        const fieldSchema = teamFormSchema.shape[fieldName]
        const result = fieldSchema.safeParse(value)
        setFieldErrors((prev) => ({
            ...prev,
            [fieldName]: result.success ? undefined : (result.error.issues[0]?.message ?? "Valore non valido"),
        }))
    }

    /* onchange dinamico per i vari input */
    const handleFieldChange = (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const nextValue = fieldName === "power" ? Number(value) : value
        setFormData({ ...formData, [fieldName]: nextValue })
        if (fieldName === "name" || fieldName === "power") {
            validateField(fieldName, value)
        }
    }


    /* array di oggetti */
    const actionItems: ActionItem[] = [
        {
            key: "edit",
            label: "Modifica",
            variant: "secondary",
            icon: Pen,
            onClick: handleEdit,
        },
        {
            key: "delete",
            label: "Elimina",
            variant: "destructive",
            icon: Trash2Icon,
            onClick: handleDelete,
        },
    ]
    const editFields: EditField[] = [
        {
            htmlFor: "name",
            label: "Nome",
            type: "text",
            value: formData.name,
            placeholder: "Nome della squadra",
        },
        {
            htmlFor: "power",
            label: "Potenza",
            type: "number",
            value: formData.power,
            placeholder: "Potenza della squadra",
        },
    ]
    const editFooterButtons: FooterButton[] = [
        {
            key: "cancel",
            label: "Annulla",
            variant: "secondary",
            onClick: () => setIsModalOpen(false),
        },
        {
            key: "save",
            label: "Salva",
            variant: "default",
            onClick: handleSave,
        },
    ]
    const deleteFooterButtons: FooterButton[] = [
        {
            key: "cancel",
            label: "Annulla",
            variant: "outline",
            onClick: () => setIsDeleteModalOpen(false),
        },
        {
            key: "confirm",
            label: "Elimina",
            variant: "destructive",
            onClick: handleDeleteConfirm,
        },
    ]

    return {
        teams,
        loading,
        error,
        editing,
        deleting,
        formData,
        isModalOpen,
        isDeleteModalOpen,
        deleteError,
        fieldErrors,
        setIsModalOpen,
        setIsDeleteModalOpen,
        handleEdit,
        handleSave,
        handleDelete,
        handleDeleteConfirm,
        handleFieldChange,
        emptyState,
        actionItems,
        editFields,
        editFooterButtons,
        deleteFooterButtons,
    }
}
