import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import { useTeamCard } from "@/features/team/useTeamCard"
import EmptyTeam from "./EmptyTeam"

const TeamCard = () => {
    /* gestione dinamica delle funzioni in file useTeamCard.ts */
    const {
        teams,
        formData,
        isModalOpen,
        isDeleteModalOpen,
        deleteError,
        fieldErrors,
        setIsModalOpen,
        setIsDeleteModalOpen,
        handleFieldChange,
        emptyState,
        actionItems,
        editFields,
        editFooterButtons,
        deleteFooterButtons,
    } = useTeamCard()


    /* gestione dinamica dell'empty */
    if (emptyState) {
        return <EmptyTeam type={emptyState} />
    }

    return (
        <>
            <ItemGroup className="w-full gap-2">
                {teams.map((team) => (
                    <Item key={team.id} variant="outline" className="border-2 shadow-gray-100 shadow-sm rounded-2xl">
                        <ItemContent className="gap-1">
                            <ItemTitle>{team.name}</ItemTitle>
                            <ItemDescription>Potenza: {team.power}</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            {actionItems.map((action) => (
                                <Button
                                    key={action.key}
                                    variant={action.variant}
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => action.onClick(team)}
                                    aria-label={action.label}
                                >
                                    <action.icon />
                                </Button>
                            ))}
                        </ItemActions>
                    </Item>
                ))}
            </ItemGroup>


            {/* Modal di modifica */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifica squadra</DialogTitle>
                        <DialogDescription>Aggiorna i dettagli della squadra</DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                {/* campi nome e potenza da modificare */}
                                {editFields.map((field) => (
                                    <Field key={field.htmlFor} className="flex flex-col gap-2">
                                        <FieldLabel htmlFor={field.htmlFor}>{field.label}</FieldLabel>
                                        <Input
                                            id={field.htmlFor}
                                            type={field.type}
                                            value={field.value}
                                            onChange={handleFieldChange(field.htmlFor as keyof typeof formData)}
                                            placeholder={field.placeholder}
                                        />
                                        {fieldErrors[field.htmlFor as "name" | "power"] && (
                                            <p className="text-xs text-red-500">
                                                {fieldErrors[field.htmlFor as "name" | "power"]}
                                            </p>
                                        )}
                                    </Field>
                                ))}
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                    <DialogFooter>
                        {editFooterButtons.map((button) => (
                            <Button
                                key={button.key}
                                type="button"
                                variant={button.variant}
                                onClick={button.onClick}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Modal di eliminazione */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Conferma Eliminazione</DialogTitle>
                        <DialogDescription>
                            Sei sicuro di voler eliminare la squadra? L'azione è irreversibile.
                        </DialogDescription>
                        {deleteError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">Errore! </strong>
                                <span className="block sm:inline">{deleteError}</span>
                            </div>
                        )}
                    </DialogHeader>
                    <DialogFooter>
                        {deleteFooterButtons.map((button) => (
                            <Button
                                key={button.key}
                                variant={button.variant}
                                onClick={button.onClick}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TeamCard