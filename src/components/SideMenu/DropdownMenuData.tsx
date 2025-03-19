import { useState } from "react";
import {
  League,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../../_constants/constants";
import routes from "../../_constants/routes";
import { useNavigate } from "react-router-dom";

// ✅ Types
interface DropdownItem {
  label: string;
  league: League;
  isRoute: boolean;
  route: string;
  toggle: () => void;
  click?: () => void;
}

export const useSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const dropdowns: Record<string, DropdownItem[]> = {
    SimCFB: [
      {
        label: "Team",
        isRoute: true,
        route: routes.CFB_TEAM,
        league: SimCFB,
        toggle: () => toggleMenu(),
        click: () => navigate(routes.CFB_TEAM),
      },
      {
        label: "Gameplan",
        isRoute: true,
        route: routes.CFB_GAMEPLAN,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Depth Chart",
        isRoute: true,
        route: routes.DEPTHCHART,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Recruiting Overview",
        isRoute: true,
        route: routes.CFB_RECRUITING,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Recruiting Board",
        isRoute: true,
        route: routes.CFB_TEAM_RECRUITING_BOARD,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: routes.CFB_STATS,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: routes.CFB_SCHEDULE,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Transfer Portal",
        isRoute: true,
        route: routes.CFB_TRANSFER,
        league: SimCFB,
        toggle: () => toggleMenu(),
      },
    ],
    SimNFL: [
      {
        label: "Roster",
        isRoute: true,
        route: routes.NFL_TEAM,
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Gameplan",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Depth Chart",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Trade Block",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Free Agency",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Draft Page",
        isRoute: true,
        route: "",
        league: SimNFL,
        toggle: () => toggleMenu(),
      },
    ],
    SimCBB: [
      {
        label: "Team",
        isRoute: true,
        route: routes.CBB_TEAM,
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Gameplan",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Recruiting Overview",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Recruiting Board",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
      {
        label: "Transfer Portal",
        isRoute: true,
        route: "",
        league: SimCBB,
        toggle: () => toggleMenu(),
      },
    ],
    SimNBA: [
      {
        label: "Team",
        isRoute: true,
        route: routes.NBA_TEAM,
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Gameplan",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Trade Block",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Free Agency",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
      {
        label: "Draft Page",
        isRoute: true,
        route: "",
        league: SimNBA,
        toggle: () => toggleMenu(),
      },
    ],
    SimCHL: [
      {
        label: "Team",
        isRoute: true,
        route: routes.CHL_TEAM,
        league: SimCHL,
        click: () => navigate(routes.CHL_TEAM),
        toggle: () => toggleMenu(),
      },
      {
        label: "Lineup",
        isRoute: true,
        route: routes.CHL_GAMEPLAN,
        league: SimCHL,
        click: () => navigate(routes.CHL_GAMEPLAN),
        toggle: () => toggleMenu(),
      },
      {
        label: "Recruiting",
        isRoute: true,
        route: "",
        league: SimCHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: "",
        league: SimCHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: "",
        league: SimCHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Transfer Portal",
        isRoute: true,
        route: "",
        league: SimCHL,
        toggle: () => toggleMenu(),
      },
    ],
    SimPHL: [
      {
        label: "Team",
        isRoute: true,
        route: routes.PHL_TEAM,
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Lineup",
        isRoute: true,
        route: routes.PHL_GAMEPLAN,
        league: SimPHL,
        click: () => navigate(routes.PHL_GAMEPLAN),
        toggle: () => toggleMenu(),
      },
      {
        label: "Trade Block",
        isRoute: true,
        route: "",
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Free Agency",
        isRoute: true,
        route: "",
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Schedule",
        isRoute: true,
        route: "",
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Statistics",
        isRoute: true,
        route: "",
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
      {
        label: "Draft Page",
        isRoute: true,
        route: "",
        league: SimPHL,
        toggle: () => toggleMenu(),
      },
    ],
  };

  return {
    toggleMenu,
    toggleDropdown,
    dropdowns,
    isOpen,
    isDropdownOpen,
  };
};
