import { useTheme } from "@/context/ThemeContext"
import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "../ui/switch"

const ThemeButton = () => {
    const themeContext = useTheme()
    return (
        <label className="flex items-center gap-2 select-none w-fit">
            <SunIcon className="size-4" />
            <Switch
                checked={themeContext?.theme === 'dark'}
                onCheckedChange={themeContext?.toggleTheme}
            />
            <MoonIcon className="size-4" />
        </label>
    )
}

export default ThemeButton