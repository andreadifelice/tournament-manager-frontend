import DivFlex from "@/components/div/DivFlex"
import DivGrid from "@/components/div/DivGrid"
import DivMax4 from "@/components/div/DivMax4"
import TournamentCard from "@/features/tournament/TournamentCard"
import TournamentForm from "@/features/tournament/TournamentForm"

const Tournaments = () => {
    return (
        <DivMax4>
            <DivGrid>
                {/* form creazione tornei */}
                <DivFlex>
                    <p className="text-xl text-primary font-bold">Crea un torneo</p>
                    <div className="w-full h-full flex justify-center items-start">
                        <TournamentForm/>
                    </div>
                </DivFlex>
                
                {/* lista delle tornei */}
                <DivFlex>
                    <p className="text-xl text-primary font-bold">Lista dei tornei</p>
                    <div className="h-100 flex justify-start items-start">
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 px-1 h-100 w-full">
                            <TournamentCard />
                        </div>
                    </div>
                </DivFlex>
            </DivGrid>
        </DivMax4>
    )
}

export default Tournaments