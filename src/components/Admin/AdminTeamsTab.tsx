import { League, SimCHL, SimPHL } from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { Button } from "../../_design/Buttons";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { getLogo } from "../../_utility/getLogo";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { CollegeTeam as CHLTeam, ProfessionalTeam, ProTeamRequest } from "../../models/hockeyModels";

export const AdminTeamsTab = () => {
    const {selectedLeague} = useLeagueStore();
    const {chlTeams, phlTeams, removeUserfromCHLTeamCall, removeUserfromPHLTeamCall} = useSimHCKStore();
    return <>
    {selectedLeague === SimCHL && chlTeams.map((team) => <AdminCHLTeamCard key={team.ID} team={team} removeUser={removeUserfromCHLTeamCall}/>)}
    {selectedLeague === SimPHL && phlTeams.map((team) => <AdminPHLTeamCard key={team.ID} team={team} removeUser={removeUserfromPHLTeamCall}/>)}
    </>
}

interface AdminCHLTeamCardProps {
    team: CHLTeam;
    removeUser: (teamID: number) => Promise<void>;
}

export const AdminCHLTeamCard: React.FC<AdminCHLTeamCardProps> = ({team, removeUser}) => {
    const {currentUser} = useAuthStore();
  const backgroundColor = team.ColorOne || "#4B5563";
  const borderColor = team.ColorTwo || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
    const logo = getLogo(
      SimCHL as League,
      team.ID,
      currentUser?.isRetro
    );
    return <Border>
            <div className="flex flex-row h-[8rem] w-[8rem]">
               <Border
                 classes="items-center justify-center mt-1"
                 styles={{ backgroundColor, borderColor }}
               >
                 <div className="flex flex-col w-[4.25rem] h-[4.25rem] items-center justify-center">
                   <Logo url={logo} variant="large" classes="" />
                 </div>
               </Border>
               <div className="flex flex-col justify-center p-4 mx-auto mr-[1rem] w-[25rem]">
                 <Text variant="small" classes="mb-2">
                   User: {team.Coach || 'AI'}
                 </Text>
                 <Text variant="small">
                   {team.TeamName} {team.Mascot}
                 </Text>
               </div>
               {team.Coach !== '' && team.Coach !== 'AI' && <div className="flex flex-col justify-center gap-4">
                 <Button variant="danger" size="sm" onClick={() => removeUser(team.ID)}>
                   Remove
                 </Button>
               </div>}
             </div>
    </Border>
}

interface AdminPHLTeamCardProps {
    team: ProfessionalTeam;
    removeUser: (request: ProTeamRequest) => Promise<void>;
}

export const AdminPHLTeamCard: React.FC<AdminPHLTeamCardProps> = ({team, removeUser}) => {

    return <Border>
        <div className="">

        </div>
    </Border>
}