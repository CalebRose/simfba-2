import { useEffect, useState } from "react";
import { CollegeTeamRequest, ProTeamRequest } from "../../models/hockeyModels";
import {
  NFLRequest,
  TeamRequest as CFBRequest,
} from "../../models/footballModels";
import {
  CollegeRequests,
  SimBBA,
  SimFBA,
  SimHCK,
} from "../../_constants/constants";
import {
  Request as CBBRequest,
  NBARequest,
} from "../../models/basketballModels";

export const useAdminPage = () => {
  const [selectedSport, setSelectedSport] = useState<String>(SimFBA);
  const [selectedTab, setSelectedTab] = useState(CollegeRequests);
  const [hckCHLRequests, setHCKCHLRequests] = useState<CollegeTeamRequest[]>(
    []
  );
  const [hckPHLRequests, setHCKPHLRequests] = useState<ProTeamRequest[]>([]);
  const [fbaCFBRequests, setFBACFBRequests] = useState<CFBRequest[]>([]);
  const [fbaNFLRequests, setFBANFLRequests] = useState<NFLRequest[]>([]);
  const [bbaCBBRequests, setBBACBBRequests] = useState<CBBRequest[]>([]);
  const [bbaNBARequests, setBBANBARequests] = useState<NBARequest[]>([]);

  useEffect(() => {
    if (
      (selectedSport === SimFBA && fbaCFBRequests.length === 0) ||
      fbaNFLRequests.length === 0
    ) {
      getFootballRequests();
    }
    if (
      (selectedSport === SimBBA && bbaCBBRequests.length === 0) ||
      bbaNBARequests.length === 0
    ) {
      getBasketballRequests();
    }
    if (
      (selectedSport === SimHCK && hckCHLRequests.length === 0) ||
      hckPHLRequests.length === 0
    ) {
      getHockeyRequests();
    }
  }, [selectedSport]);

  const getHockeyRequests = () => {};
  const getFootballRequests = () => {};
  const getBasketballRequests = () => {};

  return {
    hckCHLRequests,
    hckPHLRequests,
    fbaCFBRequests,
    fbaNFLRequests,
    selectedSport,
    setSelectedSport,
    selectedTab,
    setSelectedTab,
  };
};
