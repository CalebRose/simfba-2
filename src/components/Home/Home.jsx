import React, { useContext, useEffect, useMemo, useState } from "react";
import { SimFBAContext } from "../../context/SimFBAContext";
import { PageContainer } from "../../_design/Container";
import { ButtonGroup, PillButton } from "../../_design/Buttons";
import { TeamLandingPage } from "../Common/TeamLandingPage";
import { Text } from "../../_design/Text";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { Logo } from "../../_design/Logo";
import { getLogo } from "../../_utility/getLogo";
import { GetTeamLabel } from "../../_helper/teamHelper";

export const Home = () => {
  const {
    cfbTeam,
    cbbTeam,
    nflTeam,
    nbaTeam,
    isCFBLoading,
    isCBBLoading,
    isNFLLoading,
    isNBALoading,
    selectedLeague,
    currentUser,
    setSelectedLeague,
    ts,
  } = useContext(SimFBAContext);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const logoUrl =
    selectedTeam &&
    getLogo(selectedLeague, selectedTeam?.ID, currentUser.IsRetro);
  const teamName = selectedTeam && GetTeamLabel(selectedLeague, selectedTeam);
  useEffect(() => {
    if (cfbTeam && !isCFBLoading) {
      SetTeam(SimCFB, cfbTeam);
      return;
    } else if (nflTeam && !isNFLLoading) {
      SetTeam(SimNFL, nflTeam);
      return;
    } else if (cbbTeam && !isCBBLoading) {
      SetTeam(SimCBB, cbbTeam);
      return;
    } else if (nbaTeam && !isNBALoading) {
      SetTeam(SimNBA, nbaTeam);
      return;
    }
  }, [
    cfbTeam,
    cbbTeam,
    nflTeam,
    nbaTeam,
    isCFBLoading,
    isCBBLoading,
    isNFLLoading,
    isNBALoading,
  ]);

  const SetTeam = (league, team) => {
    setSelectedLeague(() => league);
    setSelectedTeam(() => team);
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
            {cbbTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimCBB}
                onClick={() => SetTeam(SimCBB, cbbTeam)}
              >
                {cbbTeam.Team}
              </PillButton>
            )}
            {nbaTeam && (
              <PillButton
                variant="primaryOutline"
                isSelected={selectedLeague === SimNBA}
                onClick={() => SetTeam(SimNBA, nbaTeam)}
              >
                {nbaTeam.Nickname}
              </PillButton>
            )}
          </ButtonGroup>
          <div className="flex ml-4">
            <Logo url={logoUrl} variant="tiny" />
            <Text as="headingMd" classes="ml-4 flex items-center">
              {teamName}
            </Text>
            {ts && (
              <Text as="headingMd" classes="ml-4 flex items-center">
                {ts.Season}, Week {ts.CollegeWeek}
              </Text>
            )}
          </div>
        </div>
        {selectedTeam && <TeamLandingPage team={selectedTeam} />}
      </div>
    </PageContainer>
  );
};
