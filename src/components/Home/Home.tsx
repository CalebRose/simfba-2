import React, { useEffect, useMemo, useState } from "react";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamLandingPage } from "../../LandingPage/TeamLandingPage";
import { Text } from "../../_design/Typography";
import {
  League,
  SimCBB,
  SimCFB,
  SimNBA,
  SimNFL,
  SimCHL,
  SimPHL,
} from "../../_constants/constants";
import { Logo } from "../../_design/Logo";
import { getLogo } from "../../_utility/getLogo";
import { GetTeamLabel } from "../../_helper/teamHelper";
import { useAuthStore } from "../../context/AuthContext";
import { useSimBBAStore } from "../../context/SimBBAContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { useLeagueStore } from "../../context/LeagueContext";

export const Home = () => {
  const { currentUser } = useAuthStore();
  const { setSelectedLeague, selectedLeague, ts } = useLeagueStore();
  const fbStore = useSimFBAStore();
  const bkStore = useSimBBAStore();
  const hkStore = useSimHCKStore();
  const { chlTeam, phlTeam } = hkStore;
  const hkLoading = hkStore.isLoading;
  const { cfbTeam, nflTeam, isLoadingTwo, isLoadingThree } = fbStore;
  const fbLoading = fbStore.isLoading;
  const { cbbTeam, nbaTeam } = bkStore;
  const bkLoading = bkStore.isLoading;
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const logoUrl =
    selectedTeam &&
    getLogo(selectedLeague as League, selectedTeam?.ID, currentUser?.isRetro);
  const teamName =
    selectedTeam && GetTeamLabel(selectedLeague as League, selectedTeam);

  const isLoadingData = useMemo(() => {
    if (selectedLeague === SimCFB && cfbTeam) {
      return false;
    }
    if (selectedLeague === SimNFL && nflTeam) {
      return false;
    }
    if (selectedLeague === SimCBB && cbbTeam) {
      return false;
    }
    if (selectedLeague === SimNBA && nbaTeam) {
      return false;
    }
    if (selectedLeague === SimCHL && chlTeam) {
      return false;
    }
    if (selectedLeague === SimPHL && phlTeam) {
      return false;
    }
    return true;
  }, [selectedLeague, cfbTeam, nflTeam, cbbTeam, nbaTeam]);

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
    <PageContainer isLoading={isLoadingData}>
      <div className="flex flex-col px-2 mt-1">
        <div className="flex flex-row mb-1">
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
            {chlTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimCHL}
                onClick={() => SetTeam(SimCHL, chlTeam)}
              >
                {chlTeam.TeamName}
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
        {selectedTeam && <TeamLandingPage team={selectedTeam} league={selectedLeague} ts={ts} />}
      </div>
    </PageContainer>
  );
};
