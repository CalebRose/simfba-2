import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, PillButton } from "../../_design/Buttons";
import { PageContainer } from "../../_design/Container";
import { Text } from "../../_design/Typography";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import routes from "../../_constants/routes";
import { ReactNode, useEffect, useState } from "react";
import { Border, BorderHidden } from "../../_design/Borders";
import { ToggleSwitch } from "../../_design/Inputs";
import { Tab, TabGroup } from "../../_design/Tabs";
import {
  CollegeRequests,
  CollegeTeams,
  League,
  ProRequests,
  ProTeams,
  SimBBA,
  SimCBB,
  SimCFB,
  SimCHL,
  SimFBA,
  SimHCK,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../../_constants/constants";
import { useLeagueStore } from "../../context/LeagueContext";
import { useAdminPage } from "./useAdminPage";

interface UnAuthPageProps {
  navigate: NavigateFunction;
}

const UnAuthAdminPage: React.FC<UnAuthPageProps> = ({ navigate }) => {
  return (
    <PageContainer isLoading={false}>
      <div className="flex flex-col justify-center relative h-[100%] mt-[10rem]">
        <Text variant="h3">Warning! Please return to Dashboard</Text>
        <Text variant="body" classes="mb-4">
          You are not an admin.
        </Text>
        <PillButton variant="danger" onClick={() => navigate(routes.HOME)}>
          Return to dashboard
        </PillButton>
      </div>
    </PageContainer>
  );
};

export const AdminPage = () => {
  const authStore = useAuthStore();
  const { currentUser } = authStore;
  const navigate = useNavigate();
  if (currentUser && currentUser.roleID && currentUser.roleID !== "Admin") {
    return <UnAuthAdminPage navigate={navigate} />;
  }
  const leagueStore = useLeagueStore();
  const { ts, setSelectedLeague } = leagueStore;
  const fbStore = useSimFBAStore();
  const hkStore = useSimHCKStore();
  const { selectedSport, setSelectedSport, selectedTab, setSelectedTab } =
    useAdminPage();

  useEffect(() => {
    if (selectedSport === SimFBA) {
      setSelectedLeague(SimCFB);
    }
    if (selectedSport === SimBBA) {
      setSelectedLeague(SimCBB);
    }
    if (selectedSport === SimHCK) {
      setSelectedLeague(SimCHL);
    }
  }, [selectedSport]);

  return (
    <>
      <PageContainer direction="col" isLoading={false}>
        <div className="flex flex-row mb-2">
          <div className="flex flex-start justify-start mb-2">
            <Text variant="h5">Admin</Text>
          </div>
        </div>
        <div className="flex flex-row">
          <Border classes="w-full">
            <Text variant="h6" className="text-start">
              Leagues
            </Text>
            <ButtonGroup classes="justify-between">
              <PillButton
                isSelected={selectedSport === SimFBA}
                classes="w-[8rem]"
                onClick={() => setSelectedSport(SimFBA)}
              >
                {SimFBA}
              </PillButton>
              <PillButton
                isSelected={selectedSport === SimBBA}
                variant="basketball"
                classes="w-[8rem]"
                onClick={() => setSelectedSport(SimBBA)}
              >
                {SimBBA}
              </PillButton>
              <PillButton
                isSelected={selectedSport === SimHCK}
                variant="hockey"
                classes="w-[8rem]"
                onClick={() => setSelectedSport(SimHCK)}
              >
                {SimHCK}
              </PillButton>
            </ButtonGroup>
          </Border>
        </div>
        <div className="flex flex-row mb-2">
          <Border>
            <Text variant="h6">{selectedSport} Controls</Text>
            <div className="flex flex-row w-[78vw] justify-between pb-2">
              <div className="flex flex-col mx-1">
                <Text variant="body" className="text-start">
                  Run Cron
                </Text>
                <ToggleSwitch checked={ts!.RunCron} onChange={() => {}} />
              </div>
              <div className="flex flex-col mx-1">
                <Text variant="body" className="text-start">
                  Run Games
                </Text>
                <ToggleSwitch checked={ts!.RunGames} onChange={() => {}} />
              </div>
              <div className="flex flex-col mx-1">
                <Text variant="body" className="text-start">
                  Draft
                </Text>
                <ToggleSwitch checked={ts!.IsDraftTime} onChange={() => {}} />
              </div>
            </div>
          </Border>
        </div>
        <div className="flex flex-row mb-2">
          <Border>
            <div className="flex flex-row w-[78vw] justify-between pb-2 mb-2">
              <TabGroup classes="w-[100%]">
                <Tab
                  label={CollegeRequests}
                  selected={selectedTab === CollegeRequests}
                  setSelected={setSelectedTab}
                />
                <Tab
                  label={ProRequests}
                  selected={selectedTab === ProRequests}
                  setSelected={setSelectedTab}
                />
                <Tab
                  label={CollegeTeams}
                  selected={selectedTab === CollegeTeams}
                  setSelected={setSelectedTab}
                />
                <Tab
                  label={ProTeams}
                  selected={selectedTab === ProTeams}
                  setSelected={setSelectedTab}
                />
              </TabGroup>
            </div>
            <div className="w-[100%]">
              {/* Logic for league select & tab selected here */}
              <Border>
                <div className="flex flex-row h-[9rem] w-[9rem]">
                  <Border>
                    <div className="flex flex-col w-[6rem]">
                      <Text>Logo</Text>
                    </div>
                  </Border>
                  <div className="flex flex-col justify-center p-4 mx-auto mr-[2rem]">
                    <Text>Guam</Text>
                    <Text>Tritons</Text>
                  </div>
                  <div className="flex flex-col justify-center ml-[2rem] gap-4">
                    <Button variant="success">Accept</Button>
                    <Button variant="danger">Reject</Button>
                  </div>
                </div>
              </Border>
            </div>
          </Border>
        </div>
      </PageContainer>
    </>
  );
};
