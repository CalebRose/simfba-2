import { FC, useEffect, useMemo, useState } from "react";
import { League, SimCHL, SimPHL } from "../../_constants/constants";
import { Border } from "../../_design/Borders";
import { PageContainer } from "../../_design/Container";
import { useAuthStore } from "../../context/AuthContext";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { CapsheetInfo, TeamInfo } from "./TeamPageComponents";
import { CHLRosterTable } from "./TeamPageTables";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { SelectDropdown } from "../../_design/Select";
import { SingleValue } from "react-select";
import { SelectOption } from "../../_hooks/useSelectStyles";
import { Button } from "../../_design/Buttons";

interface TeamPageProps {
  league: League;
}

export const TeamPage: FC<TeamPageProps> = ({ league }) => {
  const { currentUser } = useAuthStore();
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
  return (
    <>
      <PageContainer direction="col" isLoading={isLoading} title="Team">
        {selectedLeague === SimCHL && chlTeam && <CHLTeamPage />}
        {selectedLeague === SimPHL && phlTeam && <PHLTeamPage />}
      </PageContainer>
    </>
  );
};

const CHLTeamPage = () => {
  const { currentUser } = useAuthStore();
  const hkStore = useSimHCKStore();
  const { chlTeam, chlTeamMap, chlRosterMap, chlTeamOptions, chlStandingsMap } =
    hkStore;

  const [selectedTeam, setSelectedTeam] = useState(chlTeam);
  const backgroundColor = selectedTeam?.ColorOne || "#4B5563";
  const borderColor = selectedTeam?.ColorTwo || "#4B5563";
  const secondaryBorderColor = selectedTeam?.ColorThree || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const selectedRoster = useMemo(() => {
    if (selectedTeam) {
      return chlRosterMap[selectedTeam.ID];
    }
  }, [chlRosterMap, selectedTeam]);
  const selectTeamOption = (opts: SingleValue<SelectOption>) => {
    console.log({ opts });
    const value = Number(opts?.value);
    const nextTeam = chlTeamMap[value];
    setSelectedTeam(nextTeam);
  };
  return (
    <>
      <div className="flex flex-row lg:flex-col w-full">
        <TeamInfo
          id={selectedTeam?.ID}
          isRetro={currentUser?.isRetro}
          League={SimCHL}
          isPro={false}
          TeamName={`${selectedTeam?.TeamName} ${selectedTeam?.Mascot}`}
          Coach={selectedTeam?.Coach}
          Conference={selectedTeam?.Conference}
          Arena={selectedTeam?.Arena}
          Capacity={selectedTeam?.ArenaCapacity}
          colorOne={selectedTeam?.ColorOne}
          colorTwo={selectedTeam?.ColorTwo}
          colorThree={selectedTeam?.ColorThree}
        />
      </div>
      <div className="flex flex-row md:flex-col w-full">
        <Border
          direction="row"
          classes="w-full px-4 gap-x-2"
          styles={{
            backgroundColor: secondaryBorderColor,
            borderColor,
          }}
        >
          <SelectDropdown
            options={chlTeamOptions}
            onChange={selectTeamOption}
          />
          <Button variant="primary">Export</Button>
        </Border>
      </div>
      {selectedRoster && (
        <Border
          classes="px-2 lg:w-full min-[320px]:w-[400px] min-[700px]:w-[775px] overflow-x-auto max-[500px]:h-[55vh]"
          styles={{
            backgroundColor: secondaryBorderColor,
            borderColor,
          }}
        >
          <CHLRosterTable
            roster={selectedRoster}
            colorOne={selectedTeam?.ColorOne}
            colorTwo={selectedTeam?.ColorTwo}
            colorThree={selectedTeam?.ColorThree}
          />
        </Border>
      )}
    </>
  );
};

const PHLTeamPage = () => {
  const hkStore = useSimHCKStore();
  const {
    phlTeam,
    phlTeamMap,
    phlTeamOptions,
    proRosterMap,
    capsheetMap,
    proStandingsMap,
  } = hkStore;
  return (
    <>
      <div className="flex flex-row lg:flex-col">
        <TeamInfo League={SimPHL} isPro />
        <CapsheetInfo />
      </div>
      <div className="flex flex-row md:flex-col">
        <Border classes="w-full px-4">TEST</Border>
      </div>
      <div className="flex flex-row md:flex-col">
        <Border classes="w-full px-4 overflow-y-auto">Player Table Here</Border>
      </div>
    </>
  );
};
