import { FC, useEffect, useMemo, useState } from "react";
import { League, RecruitingCategory, RecruitingOverview, SimCBB, SimCFB, SimCHL } from "../../_constants/constants";
import { useLeagueStore } from "../../context/LeagueContext";
import { useSimHCKStore } from "../../context/SimHockeyContext";
import { useSimFBAStore } from "../../context/SimFBAContext";
import { useSimBBAStore } from "../../context/SimBBAContext";
import { PageContainer } from "../../_design/Container";
import { useAuthStore } from "../../context/AuthContext";
import { useModal } from "../../_hooks/useModal";
import { useTeamColors } from "../../_hooks/useTeamColors";
import { CHLRecruiting } from "./CHLRecruiting/CHLRecruiting";

interface RecruitingPageProps {
  league: League;
}

export const RecruitingPage: FC<RecruitingPageProps> = ({league}) => {
      const { selectedLeague, setSelectedLeague } = useLeagueStore();
      const { chlTeam } = useSimHCKStore();
      const {cfbTeam} = useSimFBAStore();
      const {cbbTeam} = useSimBBAStore();
    
      useEffect(() => {
        if (selectedLeague !== league) {
          setSelectedLeague(league);
        }
      }, [selectedLeague]);
    
      const isLoading = useMemo(() => {
        if (selectedLeague === SimCHL && chlTeam) {
          return false;
        }
        if (selectedLeague === SimCBB && cbbTeam) {
            return false;
        }
        if (selectedLeague === SimCFB && cfbTeam) {
            return false;
        }
        return true;
      }, [chlTeam, selectedLeague]);

      return (
        <>
            <PageContainer direction="col" isLoading={isLoading} title="Recruiting">
                {selectedLeague === SimCHL && chlTeam && <CHLRecruiting/>}
                {selectedLeague === SimCBB && cbbTeam && <></>}
                {selectedLeague === SimCFB && cfbTeam && <></>}
            </PageContainer>
        </>
      );
}