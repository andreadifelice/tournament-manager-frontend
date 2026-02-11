import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type SelectDateProps = {
    date: string
    onChange: (date: string) => void
    isSubmitting?: boolean
    label?: string
    inputId?: string
}

const SelectDate = ({ date, onChange, isSubmitting = false, label = "Data torneo", inputId = "date-picker-simple" }: SelectDateProps) => {
    /* gestione data selezionata */
    const selectedDate = date
        ? (() => {
                const [year, month, day] = date.split("-").map(Number)
                return new Date(year, month - 1, day)
            })()
        : undefined

    return (
        <Field className="flex flex-col gap-2">
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <Popover>
                {/* bottone trigger per popover con calendar */}
                <PopoverTrigger asChild>
                    <Button variant="outline" id={inputId} className="justify-start">
                        {/* traduco il formato della data selezionata in italiano */}
                        {date ? format(selectedDate as Date, "PPP", { locale: it }) : <span className="text-gray-400">Seleziona data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(selectedDate) => {
                            if (selectedDate) {
                                const year = selectedDate.getFullYear()
                                const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
                                const day = String(selectedDate.getDate()).padStart(2, "0")
                                onChange(`${year}-${month}-${day}`)
                            }
                        }}
                        defaultMonth={selectedDate}
                        //Imposto la lingua dei calendar in italiano
                        locale={it}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}

export default SelectDate
