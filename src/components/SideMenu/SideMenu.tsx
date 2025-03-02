import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthService } from "../../_services/auth";
import { getLogo } from "../../_utility/getLogo";
import routes from "../../_constants/routes";
import {
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../../_constants/constants";
import { SideMenuItem } from "../../_design/SideMenuItem";
import { NavDropdown, NavDropdownItem } from "../../_design/DropdownList";
import { useAuthStore } from "../../context/AuthContext";

// ✅ Types
interface DropdownItem {
  label: string;
  isRoute: boolean;
  route: string;
  click?: () => void;
}

export const SideMenu = ({}) => {
  const { currentUser, setCurrentUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  // ✅ Dropdown Menus
  const dropdowns: Record<string, DropdownItem[]> = {
    SimCFB: [
      { label: "Team", isRoute: true, route: routes.TEAM },
      { label: "Gameplan", isRoute: true, route: routes.CFB_GAMEPLAN },
      { label: "Depth Chart", isRoute: true, route: routes.DEPTHCHART },
      {
        label: "Recruiting Overview",
        isRoute: true,
        route: routes.CFB_RECRUITING,
      },
      {
        label: "Recruiting Board",
        isRoute: true,
        route: routes.CFB_TEAM_RECRUITING_BOARD,
      },
      { label: "Statistics", isRoute: true, route: routes.CFB_STATS },
      { label: "Schedule", isRoute: true, route: routes.CFB_SCHEDULE },
      { label: "Transfer Portal", isRoute: true, route: routes.CFB_TRANSFER },
    ],
    SimNFL: [
      { label: "Roster", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Depth Chart", isRoute: true, route: "" },
      { label: "Trade Block", isRoute: true, route: "" },
      { label: "Free Agency", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Draft Page", isRoute: true, route: "" },
    ],
    SimCBB: [
      { label: "Team", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Recruiting Overview", isRoute: true, route: "" },
      { label: "Recruiting Board", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Transfer Portal", isRoute: true, route: "" },
    ],
    SimNBA: [
      { label: "Team", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Trade Block", isRoute: true, route: "" },
      { label: "Free Agency", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Draft Page", isRoute: true, route: "" },
    ],
    SimCHL: [
      { label: "Team", isRoute: true, route: "" },
      { label: "Lineup", isRoute: true, route: "" },
      { label: "Recruiting", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Transfer Portal", isRoute: true, route: "" },
    ],
    SimPHL: [
      { label: "Team", isRoute: true, route: "" },
      { label: "Lineup", isRoute: true, route: "" },
      { label: "Trade Block", isRoute: true, route: "" },
      { label: "Free Agency", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Draft Page", isRoute: true, route: "" },
    ],
  };

  // ✅ Generate logos based on current user
  let logo = "";
  let cfbLogo = "";
  let cbbLogo = "";
  let nflLogo = "";
  let nbaLogo = "";
  let chlLogo = "";
  let phlLogo = "";
  if (currentUser) {
    if (currentUser.teamId) {
      cfbLogo = getLogo(SimCFB, currentUser.teamId!, currentUser.isRetro);
    }
    if (currentUser.NFLTeamID) {
      nflLogo = getLogo(SimNFL, currentUser.NFLTeamID!, currentUser.isRetro);
    }
    if (currentUser.cbb_id) {
      cbbLogo = getLogo(SimCBB, currentUser.cbb_id!, currentUser.isRetro);
    }
    if (currentUser.NBATeamID) {
      nbaLogo = getLogo(SimNBA, currentUser.NBATeamID!, currentUser.isRetro);
    }
    if (currentUser.CHLTeamID) {
      chlLogo = getLogo(SimCHL, currentUser.CHLTeamID!, currentUser.isRetro);
    }
    if (currentUser.PHLTeamID) {
      phlLogo = getLogo(SimPHL, currentUser.PHLTeamID!, currentUser.isRetro);
    }

    logo =
      getLogo(SimCFB, currentUser.teamId!, currentUser.isRetro) ||
      getLogo(SimCBB, currentUser.cbb_id!, currentUser.isRetro) ||
      getLogo(SimNFL, currentUser.NFLTeamID!, currentUser.isRetro) ||
      getLogo(SimNBA, currentUser.NBATeamID!, currentUser.isRetro) ||
      getLogo(SimCHL, currentUser.CHLTeamID!, currentUser.isRetro) ||
      getLogo(SimPHL, currentUser.PHLTeamID!, currentUser.isRetro) ||
      logo;
  }
  // ✅ Toggle the sidebar menu
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // ✅ Handle Logout
  const logout = async () => {
    setProcessing(true);
    try {
      const data = await AuthService.logout();
      if (data.status) {
        setCurrentUser(null);
        navigate(`/login`);
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setProcessing(false);
    }
  };

  const navigateToAvailableTeams = () => navigate(routes.AVAILABLE_TEAMS);
  const navigateToHelp = () => navigate(routes.HELP);

  return (
    <>
      {/* ✅ Top Navigation Bar */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex justify-between items-center">
          {/* Logo and Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
              </svg>
            </button>
            <button onClick={toggleMenu} className="flex ml-2">
              <img
                src="./simsn_icon.png"
                className="h-8 mr-3"
                alt="SimSNLogo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl dark:text-white">
                SimSN
              </span>
            </button>
          </div>
          {/* User Dropdown */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={logo}
                  alt="User Avatar"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700">
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {currentUser.email}
                    </p>
                  </div>
                  <NavDropdown>
                    <NavDropdownItem
                      label="Profile"
                      isRoute={true}
                      route="/profile"
                    />
                    {currentUser.roleID === "Admin" && (
                      <NavDropdownItem
                        label="Admin"
                        isRoute={true}
                        route="/admin"
                      />
                    )}
                    <NavDropdownItem label="Sign Out" click={logout} />
                  </NavDropdown>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Sidebar Menu */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <SideMenuItem
              label="Dashboard"
              click={() => navigate(routes.HOME)}
            />
            {currentUser && currentUser.teamId && (
              <SideMenuItem
                label="SimCFB"
                logo={cfbLogo}
                dropdown={dropdowns.SimCFB}
                isTop
              />
            )}
            {currentUser && currentUser.NFLTeamID && (
              <SideMenuItem
                label="SimNFL"
                logo={nflLogo}
                dropdown={dropdowns.SimNFL}
                isTop
              />
            )}
            {currentUser && currentUser.cbb_id && (
              <SideMenuItem
                label="SimCBB"
                logo={cbbLogo}
                dropdown={dropdowns.SimCBB}
                isTop
              />
            )}
            {currentUser && currentUser.NBATeamID && (
              <SideMenuItem
                label="SimNBA"
                logo={nbaLogo}
                dropdown={dropdowns.SimNBA}
                isTop
              />
            )}
            {/* Will need to add side menus for hockey */}
            {currentUser && currentUser.CHLTeamID && (
              <SideMenuItem
                label={SimCHL}
                logo={chlLogo}
                dropdown={dropdowns.SimCHL}
                isTop
              />
            )}
            {currentUser && currentUser.PHLTeamID && (
              <SideMenuItem
                label={SimPHL}
                logo={phlLogo}
                dropdown={dropdowns.SimPHL}
                isTop
              />
            )}
            <SideMenuItem
              click={navigateToAvailableTeams}
              label="Available Teams"
            />
            <SideMenuItem click={navigateToHelp} label="Help" />
          </ul>
        </div>
      </aside>
    </>
  );
};
