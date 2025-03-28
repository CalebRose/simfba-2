import { FC, ReactNode } from "react";
import {
  Attributes,
  InfoType,
  League,
  ModalAction,
  Preferences,
  SimCHL,
} from "../../../_constants/constants";
import { useMobile } from "../../../_hooks/useMobile";
import { getTextColorBasedOnBg } from "../../../_utility/getBorderClass";
import { Croot as BasketballCroot } from "../../../models/basketballModels";
import { Croot as FootballCroot } from "../../../models/footballModels";
import {
  CollegePlayer,
  Croot as HockeyCroot,
} from "../../../models/hockeyModels";
import {
  getCHLAttributes,
  getCHLCrootAttributes,
} from "../../Team/TeamPageUtils";
import { Button, ButtonGroup } from "../../../_design/Buttons";
import { Info } from "../../../_design/Icons";
import { Table } from "../../../_design/Table";

const getRecruitingColumns = (league: League, category: string) => {
  if (league !== SimCHL) return [];

  let columns: { header: string; accessor: string }[] = [
    { header: "ID", accessor: "" },
    { header: "Name", accessor: "Name" },
    { header: "Pos", accessor: "pos" },
    { header: "Archetype", accessor: "arch" },
    { header: "Stars", accessor: "stars" },
    { header: "Ht", accessor: "ht" },
    { header: "Wt (lbs)", accessor: "wt" },
    { header: "Country", accessor: "ct" },
    { header: "Region", accessor: "re" },
    { header: "Ovr", accessor: "ovr" },
  ];

  if (category === Attributes) {
    columns = columns.concat([
      { header: "Agi", accessor: "agi" },
      { header: "FO", accessor: "fo" },
      { header: "LSA", accessor: "lsa" },
      { header: "LSP", accessor: "lsp" },
      { header: "CSA", accessor: "csa" },
      { header: "CSP", accessor: "csp" },
      { header: "Pass", accessor: "pass" },
      { header: "PH", accessor: "ph" },
      { header: "Str", accessor: "str" },
      { header: "BChk", accessor: "bchk" },
      { header: "SChk", accessor: "schk" },
      { header: "SB", accessor: "sb" },
      { header: "GK", accessor: "gk" },
      { header: "GV", accessor: "gv" },
    ]);
  } else if (category === Preferences) {
    columns = columns.concat([
      { header: "Program", accessor: "pro" },
      { header: "Prof. Dev.", accessor: "prd" },
      { header: "Trad.", accessor: "tra" },
      { header: "Fac.", accessor: "fac" },
      { header: "Atm.", accessor: "atm" },
      { header: "Aca.", accessor: "aca" },
      { header: "Conf.", accessor: "con" },
      { header: "Coach", accessor: "coa" },
      { header: "Season", accessor: "sea" },
    ]);
  }
  columns.push({ header: "Status", accessor: "status" });
  columns.push({ header: "Leaders", accessor: "lead" });
  columns.push({ header: "Actions", accessor: "actions" });

  return columns;
};

interface RecruitTableProps {
  croots: HockeyCroot[] | FootballCroot[] | BasketballCroot[];
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
  teamMap: any;
  team: any;
  category: string;
  openModal: (
    action: ModalAction,
    player: HockeyCroot | FootballCroot | BasketballCroot
  ) => void;
  league: League;
}

export const RecruitTable: FC<RecruitTableProps> = ({
  croots,
  colorOne,
  colorTwo,
  colorThree,
  teamMap,
  team,
  category,
  openModal,
  league,
}) => {
  const backgroundColor = colorOne;
  const borderColor = colorTwo;
  const secondaryBorderColor = colorThree;
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const [isMobile] = useMobile();
  const columns = getRecruitingColumns(league, category);

  const CFBRowRenderer = (
    item: FootballCroot,
    index: number,
    backgroundColor: string
  ) => <></>;

  const CHLRowRenderer = (
    item: HockeyCroot,
    index: number,
    backgroundColor: string
  ) => {
    const selection = getCHLCrootAttributes(item, isMobile, category!);
    return (
      <div
        key={item.ID}
        className="table-row border-b dark:border-gray-700 text-start"
        style={{ backgroundColor }}
      >
        {selection.map((attr, idx) => (
          <div key={idx} className="table-cell px-2 py-1 whitespace-nowrap">
            <span className="text-sm">{attr.value}</span>
          </div>
        ))}
        <div className="table-cell px-2 py-1 whitespace-nowrap">
          {item.RecruitingStatus === "" ? "None" : item.RecruitingStatus}
        </div>
        <div className="table-cell px-2 py-1 whitespace-nowrap">GUAM</div>
        <div className="table-cell px-2 py-1 whitespace-nowrap">
          <ButtonGroup>
            <Button size="sm" onClick={() => openModal(InfoType, item)}>
              <Info />
            </Button>
            <Button size="sm" onClick={() => openModal(InfoType, item)}>
              Plus
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  const rowRenderer = (
    league: League
  ): ((item: any, index: number, backgroundColor: string) => ReactNode) => {
    if (league === SimCHL) {
      return CHLRowRenderer;
    }
    return CFBRowRenderer;
  };

  return (
    <Table
      columns={columns}
      data={croots as HockeyCroot[]}
      rowRenderer={rowRenderer(SimCHL)}
      backgroundColor={backgroundColor}
      team={team}
    />
  );
};
