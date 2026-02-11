import TeamForm from "@/features/team/TeamForm"
import TeamCard from "@/features/team/TeamCard"
import DivMax4 from "@/components/div/DivMax4"
import DivGrid from "@/components/div/DivGrid"
import DivFlex from "@/components/div/DivFlex"

const Teams = () => {
    return (
        <DivMax4>
            <DivGrid>
                {/* form creazione squadre */}
                <DivFlex className="h-fit">
                    <p className="text-xl text-primary font-bold">Crea la tua squadra</p>
                    <div className="w-full h-full flex justify-center items-start">
                        <TeamForm />
                    </div>
                </DivFlex>
                
                {/* lista delle squadre */}
                <DivFlex>
                    <p className="text-xl text-primary font-bold">Lista delle squadre</p>
                    {/* contenitore scrollabile */}
                    <div className="overflow-auto py-1 pe-1 h-100 w-full">
                        <TeamCard/>
                    </div>
                </DivFlex>
            </DivGrid>
        </DivMax4>
    )
}

export default Teams