import React, { useEffect, useState } from "react";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamLandingPage } from "../Common/TeamLandingPage";
import { Text } from "../../_design/Typography";
import {
  League,
  SimCBB,
  SimCFB,
  SimNBA,
  SimNFL,
} from "../../_constants/constants";
import { Logo } from "../../_design/Logo";
import { getLogo } from "../../_utility/getLogo";
import { GetTeamLabel } from "../../_helper/teamHelper";
import { useAuthStore } from "../../context/AuthContext";
import { useSimBBAStore } from "../../context/SimBBAContext";
import { useLeagueStore } from "../../context/LeagueContext";

export const Home = () => {
  const { currentUser } = useAuthStore();
  const { setSelectedLeague, selectedLeague, ts } = useLeagueStore();
  const fbStore = useSimFBAStore();
  const bkStore = useSimBBAStore();
  const { cfbTeam, nflTeam } = fbStore;
  const fbLoading = fbStore.isLoading;
  const { cbbTeam, nbaTeam } = bkStore;
  const bkLoading = bkStore.isLoading;
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const logoUrl =
    selectedTeam &&
    getLogo(selectedLeague as League, selectedTeam?.ID, currentUser?.isRetro);
  const teamName =
    selectedTeam && GetTeamLabel(selectedLeague as League, selectedTeam);

  useEffect(() => {
    if (cfbTeam && !fbLoading) {
      SetTeam(SimCFB, cfbTeam);
      return;
    } else if (nflTeam && !fbLoading) {
      SetTeam(SimNFL, nflTeam);
      return;
    } else if (cbbTeam && !bkLoading) {
      SetTeam(SimCBB, cbbTeam);
      return;
    } else if (nbaTeam && !bkLoading) {
      SetTeam(SimNBA, nbaTeam);
      return;
    }
  }, [cfbTeam, cbbTeam, nflTeam, nbaTeam, fbLoading, bkLoading]);

  const SetTeam = (league: League, team: any) => {
    setSelectedLeague(league);
    setSelectedTeam(team);
  };

  return (
    <PageContainer>
      <div className="flex flex-col px-2 mt-1">
        <div className="flex flex-row mb-2">
          <ButtonGroup>
            {cfbTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimCFB}
                onClick={() => SetTeam(SimCFB, cfbTeam)}
              >
                {cfbTeam.TeamName}
              </PillButton>
            )}
            {nflTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimNFL}
                onClick={() => SetTeam(SimNFL, nflTeam)}
              >
                {nflTeam.Mascot}
              </PillButton>
            )}
            {/* {cbbTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimCBB}
                onClick={() => SetTeam(SimCBB, cbbTeam)}
              >
                {cbbTeam.Team}
              </PillButton>
            )} */}
            {/* {nbaTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimNBA}
                onClick={() => SetTeam(SimNBA, nbaTeam)}
              >
                {nbaTeam.Nickname}
              </PillButton>
            )} */}
          </ButtonGroup>
          {/* Refactor below code into component by league -- Football, Basketball, Baseball, Hockey */}
          {/* <div className="flex ml-4">
            <Logo url={logoUrl} variant="tiny" />
            <Text variant="alternate" classes="ml-4 flex items-center">
              {teamName}
            </Text>
            {ts && (
              <Text variant="alternate" classes="ml-4 flex items-center">
                {ts.Season}, Week {ts.CollegeWeek}
              </Text>
            )}
          </div> */}
        </div>
        {selectedTeam && <TeamLandingPage team={selectedTeam} />}
      </div>
    </PageContainer>
  );
};
