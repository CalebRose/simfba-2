import { FC, useEffect, useMemo } from "react";
import { League, SimCHL, SimPHL } from "../../_constants/constants";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { PageContainer } from "../../_design/Container";
import { CHLLineupPage, PHLLineupPage } from "./HockeyLineups/LineupPage";

interface GameplanPageProps {
  league: League;
}

export const GameplanPage: FC<GameplanPageProps> = ({ league }) => {
  const leagueStore = useLeagueStore();
  const { selectedLeague, setSelectedLeague } = leagueStore;
  const { chlTeam, phlTeam } = useSimHCKStore();

  useEffect(() => {
    if (selectedLeague !== league) {
      setSelectedLeague(league);
    }
  }, [selectedLeague]);

  const isLoading = useMemo(() => {
    if (selectedLeague === SimCHL && chlTeam) {
      return false;
    }
    if (selectedLeague === SimPHL && phlTeam) {
      return false;
    }
    return true;
  }, [chlTeam, phlTeam, selectedLeague]);

  const title = useMemo(() => {
    if (selectedLeague === SimCHL && chlTeam) {
      return `${chlTeam.TeamName} Lineups`;
    }
    if (selectedLeague === SimPHL && phlTeam) {
      return `${phlTeam.TeamName} Lineups`;
    }
    return "Gameplan";
  }, [chlTeam, phlTeam, selectedLeague]);

  return (
    <>
      <PageContainer direction="col" isLoading={isLoading} title={title}>
        {selectedLeague === SimCHL && chlTeam && <CHLLineupPage />}
        {selectedLeague === SimPHL && phlTeam && <PHLLineupPage />}
      </PageContainer>
    </>
  );
};
