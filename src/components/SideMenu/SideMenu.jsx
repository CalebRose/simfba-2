import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthService } from "../../_services/auth";
import { getLogo } from "../../_utility/getLogo";
import routes from "../../_constants/routes";
import { SimCBB, SimCFB, SimNBA, SimNFL } from "../../_constants/constants";
import { SideMenuItem } from "../../_design/SideMenuItem";
import { NavDropdown, NavDropdownItem } from "../../_design/DropdownList";
import { useAuthStore } from "../../context/AuthContext";

export const SideMenu = ({}) => {
  const { currentUser, setCurrentUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cfbDropdown] = useState(() => {
    return [
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
    ];
  });
  const [nflDropdown] = useState(() => {
    return [
      { label: "Roster", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Depth Chart", isRoute: true, route: "" },
      { label: "Trade Block", isRoute: true, route: "" },
      { label: "Free Agency", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Draft Page", isRoute: true, route: "" },
    ];
  });
  const [cbbDropdown] = useState(() => {
    return [
      { label: "Team", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Recruiting Overview", isRoute: true, route: "" },
      { label: "Recruiting Board", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Transfer Portal", isRoute: true, route: "" },
    ];
  });
  const [nbaDropdown] = useState(() => {
    return [
      { label: "Team", isRoute: true, route: "" },
      { label: "Gameplan", isRoute: true, route: "" },
      { label: "Trade Block", isRoute: true, route: "" },
      { label: "Free Agency", isRoute: true, route: "" },
      { label: "Statistics", isRoute: true, route: "" },
      { label: "Schedule", isRoute: true, route: "" },
      { label: "Draft Page", isRoute: true, route: "" },
    ];
  });

  let logo = getLogo("", 0, false);
  let cfbLogo = "";
  let cbbLogo = "";
  let nflLogo = "";
  let nbaLogo = "";
  if (currentUser) {
    cfbLogo = getLogo(SimCFB, currentUser.teamId, currentUser.isRetro);
    cbbLogo = getLogo(SimCBB, currentUser.cbb_id, currentUser.isRetro);
    nflLogo = getLogo(SimNFL, currentUser.NFLTeamID, currentUser.isRetro);
    nbaLogo = getLogo(SimNBA, currentUser.NBATeamID, currentUser.isRetro);
    if (cfbLogo.length > 0) {
      logo = cfbLogo;
    } else if (cbbLogo.length > 0) {
      logo = cbbLogo;
    } else if (nflLogo.length > 0) {
      logo = nflLogo;
    } else if (nbaLogo.length > 0) {
      logo = nbaLogo;
    }
  }
  let navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = async () => {
    setProcessing(true);

    try {
      let data = await AuthService.logout();
      if (data.status) {
        setProcessing(false);
        setCurrentUser(null);
        navigate(`/login`);
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        setCurrentUser(null);
        setProcessing(false);
      }
    } catch (e) {
      setProcessing(false);
      enqueueSnackbar("Something went wrong.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const navigateToAvailableTeams = () => {
    navigate(routes.AVAILABLE_TEAMS);
  };
  const navigateToHelp = () => {
    navigate(routes.HELP);
  };
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 min-[320px]:w-full md:w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="flex ml-2 md:mr-24"
                onClick={toggleMenu}
              >
                <img
                  src="./simfba_icon.jpg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  SimFBA
                </span>
              </button>
            </div>
            <div className="flex items-center relative">
              {currentUser && (
                <div className="flex items-center ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                      onClick={toggleDropdown}
                    >
                      <img
                        className="w-8 h-8 rounded-full"
                        src={logo}
                        alt="user photo"
                      />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      className="z-50 absolute top-full right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                    >
                      <div className="px-4 py-3">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {currentUser && currentUser.username}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {currentUser && currentUser.email}
                        </p>
                      </div>
                      <NavDropdown>
                        <NavDropdownItem
                          label="Profile"
                          route="/profile"
                          isRoute={true}
                        />
                        <NavDropdownItem label="Sign Out" click={logout} />
                      </NavDropdown>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SideMenuItem
              label="Dashboard"
              click={() => navigate(routes.HOME)}
            />
            {currentUser && currentUser.teamId && (
              <SideMenuItem
                label="SimCFB"
                logo={cfbLogo}
                dropdown={cfbDropdown}
                isTop
              />
            )}
            {currentUser && currentUser.NFLTeamID && (
              <SideMenuItem
                label="SimNFL"
                logo={nflLogo}
                dropdown={nflDropdown}
                isTop
              />
            )}
            {currentUser && currentUser.cbb_id && (
              <SideMenuItem
                label="SimCBB"
                logo={cbbLogo}
                dropdown={cbbDropdown}
                isTop
              />
            )}
            {currentUser && currentUser.NBATeamID && (
              <SideMenuItem
                label="SimNBA"
                logo={nbaLogo}
                dropdown={nbaDropdown}
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
