import { SimCBB, SimCFB, SimCHL, SimNBA, SimNFL, SimPHL } from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { PageContainer } from "../../_design/Container";
import { ToggleSwitch } from "../../_design/Inputs";
import { Text } from "../../_design/Typography";
import { CurrentUser } from "../../_hooks/currentUser";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { updateUserByUsername } from "../../firebase/firestoreHelper";
import { ProfileCHLTeamCard, ProfilePHLTeamCard,  } from "./ProfileTeamCard";


export const ProfilePage = () => {
    const {currentUser, setCurrentUser} = useAuthStore();
    const setDefaultLeague = (league: string) => {
        const payLoad = {
            username: currentUser?.username,
            DefaultLeague: league
        }
        updateUserByUsername(currentUser!.username, payLoad);
        const updatedCurrentUser = {...currentUser} as CurrentUser;
        updatedCurrentUser.DefaultLeague = league;
        setCurrentUser(updatedCurrentUser);
    }

    const setRetro = () => {
        const newRetro = !currentUser?.isRetro;
        const payload = {
            isRetro: newRetro
        };
        updateUserByUsername(currentUser!.username, payload);
        const updatedCurrentUser = {...currentUser} as CurrentUser;
        updatedCurrentUser.isRetro = newRetro;
        setCurrentUser(updatedCurrentUser);
    }
    
    const setTheme = () => {
        
    }
    return <>
        <PageContainer direction="col" isLoading={false}>
            <div className="flex flex-row mb-2">
                <div className="flex items-center mb-2">
                <Text variant="h5">Profile</Text>
                </div>
            </div>
            <div className="flex flex-row">
                <Border classes="w-full px-4">
                    <Text variant="h6">
                        Default League: {currentUser?.DefaultLeague || SimCFB}
                    </Text>
                    <ButtonGroup classes="justify-center">
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimCFB}
                            onClick={() => setDefaultLeague(SimCFB)}
                            variant="secondary"
                            classes="w-[8rem]"
                        >
                            {SimCFB}
                        </PillButton>
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimNFL} 
                            onClick={() => setDefaultLeague(SimNFL)}
                            variant="secondary"
                            classes="w-[8rem]"
                            >
                            {SimNFL}
                        </PillButton>
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimCBB} 
                            onClick={() => setDefaultLeague(SimCBB)}
                            variant="secondary"
                            classes="w-[8rem]"
                            >
                            {SimCBB}
                        </PillButton>
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimNBA} 
                            onClick={() => setDefaultLeague(SimNBA)}
                            variant="secondary"
                            classes="w-[8rem]"
                            >
                            {SimNBA}
                        </PillButton>
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimCHL} 
                            onClick={() => setDefaultLeague(SimCHL)}
                            variant="secondary"
                            classes="w-[8rem]"
                            >
                            {SimCHL}
                        </PillButton>
                        <PillButton 
                            isSelected={currentUser?.DefaultLeague === SimPHL} 
                            onClick={() => setDefaultLeague(SimPHL)}
                            variant="secondary"
                            classes="w-[8rem]"
                            >
                            {SimPHL}
                        </PillButton>
                    </ButtonGroup>
                </Border>
            </div>
            <Border classes="w-full px-4">
                <Text variant="h6" classes="mb-2">
                        Actions
                </Text>
                <div className="justify-center flex flex-row gap-x-8">
                    <div className="flex flex-col">
                        <Text variant="body-small" className="text-start">
                            Retro
                        </Text>
                        <ToggleSwitch 
                            checked={currentUser?.isRetro!!}
                            onChange={setRetro}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Text variant="body-small" className="text-start">
                            Dark Mode
                        </Text>
                        <ToggleSwitch 
                            checked={currentUser?.isRetro!!}
                            onChange={setRetro}
                        />
                    </div>
                </div>
            </Border>
            <Border classes="w-full p-4 mt-2">
                <Text variant="h6">Teams</Text>
                <div className="flex flex-row flex-wrap justify-between pb-2 gap-4">
                    {currentUser?.CHLTeamID && <>
                        <ProfileCHLTeamCard/>
                    </>}
                    {currentUser?.PHLTeamID && <>
                        <ProfilePHLTeamCard/>
                    </>}
                </div>
            </Border>
        </PageContainer>
        
        </>;
}