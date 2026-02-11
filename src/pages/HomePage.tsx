import DivFlex from "@/components/div/DivFlex";
import DivGrid from "@/components/div/DivGrid";
import DivMax4 from "@/components/div/DivMax4";
import TeamCard from "@/features/team/TeamCard";
import LinkToTeamButton from "@/features/team/LinkToTeamButton";
import TournamentCard from "@/features/tournament/TournamentCard";

const HomePage = () => {
    return (
        <>
            {/* contenitore principale */}
            <DivMax4>
                <DivGrid>
                    <DivFlex>
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Storico Tornei</p>
                        </div>
                        {/* contenitore scrollabile */}
                        <div className="overflow-auto py-1 pe-1 h-100 w-full">
                            <TournamentCard status="completed"/>
                        </div>
                    </DivFlex>

                    <DivFlex>
                        <div className="flex justify-between items-center">
                            <p className="text-xl text-primary font-bold">Lista delle squadre</p>
                            <LinkToTeamButton />
                        </div>
                        {/* lista delle squadre */}
                        <div className="overflow-auto py-1 pe-1 h-100 w-full">
                            <TeamCard/>
                        </div>
                    </DivFlex>
                </DivGrid>
            </DivMax4>
        </>
    );
};

export default HomePage;
