import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, PillButton } from "../../_design/Buttons";
import { PageContainer } from "../../_design/Container";
import { Text } from "../../_design/Typography";
import { useAuthStore } from "../../context/AuthContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import routes from "../../_constants/routes";
import { ReactNode, useEffect, useState } from "react";
import { Border } from "../../_design/Borders";
import { ToggleSwitch } from "../../_design/Inputs";
import { Tab, TabGroup } from "../../_design/Tabs";
import {
  Requests,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
  Teams,
} from "../../_constants/constants";
import { useLeagueStore } from "../../context/LeagueContext";
import { useAdminPage } from "../../context/AdminPageContext";
import { getLogo } from "../../_utility/getLogo";
import { Logo } from "../../_design/Logo";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { CHLRequestCard, PHLRequestCard } from "./RequestCards";
import { CollegeTeamRequest } from "../../models/hockeyModels";
import { AdminTeamsTab } from "./AdminTeamsTab";

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
  const { ts, selectedLeague, setSelectedLeague } = leagueStore;
  const fbStore = useSimFBAStore();
  const hkStore = useSimHCKStore();
  const { chlTeamMap, phlTeamMap, chlTeams, phlTeams } = hkStore;
  const hkLoading = hkStore.isLoading;
  const { selectedTab, setSelectedTab, hckCHLRequests, hckPHLRequests } =
    useAdminPage();

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
                isSelected={selectedLeague === SimCFB}
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimCFB)}
              >
                {SimCFB}
              </PillButton>
              <PillButton
                isSelected={selectedLeague === SimNFL}
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimNFL)}
              >
                {SimNFL}
              </PillButton>
              <PillButton
                isSelected={selectedLeague === SimNBA}
                variant="basketball"
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimNBA)}
              >
                {SimCBB}
              </PillButton>
              <PillButton
                isSelected={selectedLeague === SimCBB}
                variant="basketball"
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimNBA)}
              >
                {SimNBA}
              </PillButton>
              <PillButton
                isSelected={selectedLeague === SimCHL}
                variant="hockey"
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimCHL)}
              >
                {SimCHL}
              </PillButton>
              <PillButton
                isSelected={selectedLeague === SimPHL}
                variant="hockey"
                classes="w-[8rem]"
                onClick={() => setSelectedLeague(SimPHL)}
              >
                {SimPHL}
              </PillButton>
            </ButtonGroup>
          </Border>
        </div>
        {ts && (
          <div className="flex flex-row mb-2">
            <Border classes="w-full">
              <Text variant="h6">{selectedLeague} Controls</Text>
              <div className="flex flex-row justify-between pb-2">
                <div className="flex flex-col mx-1">
                  <Text variant="body-small" className="text-start">
                    Run Cron
                  </Text>
                  <ToggleSwitch checked={ts!.RunCron} onChange={() => {}} />
                </div>
                <div className="flex flex-col mx-1">
                  <Text variant="body-small" className="text-start">
                    Run Games
                  </Text>
                  <ToggleSwitch checked={ts!.RunGames} onChange={() => {}} />
                </div>
                <div className="flex flex-col mx-1">
                  <Text variant="body-small" className="text-start">
                    Draft
                  </Text>
                  <ToggleSwitch checked={ts!.IsDraftTime} onChange={() => {}} />
                </div>
              </div>
            </Border>
          </div>
        )}
        <div className="flex flex-row mb-2">
          <Border classes="w-full">
            <div className="flex flex-row justify-between pb-2 mb-2">
              <TabGroup classes="w-[100%] justify-between">
                <Tab
                  label={Requests}
                  selected={selectedTab === Requests}
                  setSelected={setSelectedTab}
                />
                <Tab
                  label={Teams}
                  selected={selectedTab === Teams}
                  setSelected={setSelectedTab}
                />
              </TabGroup>
            </div>
            <div className="w-full max-h-[40vh] overflow-y-scroll">
              {/* Logic for league select & tab selected here */}
              {selectedTab === Requests && (
                <>
                  {selectedLeague === SimCHL &&
                    !hkLoading &&
                    hckCHLRequests.map((request) => (
                      <CHLRequestCard
                        request={request}
                        chlTeam={chlTeamMap[request.TeamID]}
                        key={request.ID}
                      />
                    ))}

                  {selectedLeague === SimPHL &&
                    !hkLoading &&
                    hckPHLRequests.map((request) => (
                      <PHLRequestCard
                        request={request}
                        phlTeam={phlTeamMap[request.TeamID]}
                        key={request.ID}
                      />
                    ))}
                </>
              )}
              {selectedTab === Teams && (
                <AdminTeamsTab/>
              )}
            </div>
          </Border>
        </div>
      </PageContainer>
    </>
  );
};
