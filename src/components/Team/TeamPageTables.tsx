import { FC } from "react";
import { Table } from "../../_design/Table";
import { Text } from "../../_design/Typography";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";
import { CollegePlayer } from "../../models/footballModels";
import { useMobile } from "../../_hooks/useMobile";
import { getCHLAttributes, getCFBAttributes } from "./TeamPageUtils";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { Button, ButtonGroup } from "../../_design/Buttons";
import {
  Info,
  ScissorIcon,
  ShieldCheck,
  ShieldExclamation,
  User,
  UserPlus,
} from "../../_design/Icons";
import { useModal } from "../../_hooks/useModal";
import {
  Cut,
  InfoType,
  ModalAction,
  Promise,
  Redshirt,
} from "../../_constants/constants";

interface CHLRosterTableProps {
  roster: CHLPlayer[];
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
  team?: any;
  category?: string;
  openModal: (action: ModalAction, player: CHLPlayer) => void;
}

export const CHLRosterTable: FC<CHLRosterTableProps> = ({
  roster,
  colorOne,
  colorTwo,
  colorThree,
  team,
  category,
  openModal,
}) => {
  const backgroundColor = colorOne;
  const borderColor = colorTwo;
  const secondaryBorderColor = colorThree;
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const [isMobile] = useMobile();

  let rosterColumns = [
    { header: "ID", accessor: "" },
    { header: "Name", accessor: "Name" },
    { header: "Pos", accessor: "pos" },
    { header: "Archetype", accessor: "arch" },
    { header: "Yr", accessor: "yr" },
    { header: "Stars", accessor: "stars" },
    { header: "Ht", accessor: "ht" },
    { header: "Wt (lbs)", accessor: "wt" },
    { header: "Ovr", accessor: "ovr" },
  ];

  if (!isMobile) {
    rosterColumns = rosterColumns.concat([
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
      { header: "Sta", accessor: "sta" },
      { header: "Inj", accessor: "inj" },
    ]);
  }
  rosterColumns.push({ header: "Actions", accessor: "actions" });

  const rowRenderer = (item: CHLPlayer, index: number, backgroundColor: string) => {
    const attributes = getCHLAttributes(item, isMobile, category!);
    return (
      <div
        key={item.ID}
        className="table-row border-b dark:border-gray-700 text-start"
        style={{ backgroundColor }}
      >
        {attributes.map((attr, idx) => (
          <div key={idx} className="table-cell px-2 py-1 whitespace-nowrap">
            <span className="text-sm">{attr.value}</span>
          </div>
        ))}
        <div className="table-cell px-2 py-1 whitespace-nowrap">
          <ButtonGroup>
            <Button size="sm" onClick={() => openModal(InfoType, item)}>
              <Info />
            </Button>
            <Button size="sm" onClick={() => openModal(Cut, item)}>
              <ScissorIcon />
            </Button>
            <Button
              size="sm"
              variant={`${item.IsRedshirting ? "danger" : "primary"}`}
              disabled={item.IsRedshirting}
              onClick={() => openModal(Redshirt, item)}
            >
              {item.IsRedshirt ? <User /> : <UserPlus />}
            </Button>
            <Button
              size="sm"
              variant={item.TransferStatus === 0 ? "success" : "warning"}
              onClick={() => openModal(Promise, item)}
              disabled={item.TransferStatus === 0}
            >
              <ShieldCheck />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  return (
    <Table
      columns={rosterColumns}
      data={roster}
      rowRenderer={rowRenderer}
      backgroundColor={backgroundColor}
      team={team}
    />
  );
};

interface CFBRosterTableProps {
  roster: CollegePlayer[];
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
  team?: any;
  category?: string;
  openModal: (action: ModalAction, player: CollegePlayer) => void;
}

export const CFBRosterTable: FC<CFBRosterTableProps> = ({
  roster,
  colorOne,
  colorTwo,
  colorThree,
  team,
  category,
  openModal,
}) => {
  const backgroundColor = colorOne;
  const borderColor = colorTwo;
  const secondaryBorderColor = colorThree;
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const [isMobile] = useMobile();

  let rosterColumns = [
    { header: "ID", accessor: "" },
    { header: "Name", accessor: "Name" },
    { header: "Pos", accessor: "pos" },
    { header: "Archetype", accessor: "arch" },
    { header: "Yr", accessor: "yr" },
    { header: "Stars", accessor: "stars" },
    { header: "Ht", accessor: "ht" },
    { header: "Wt (lbs)", accessor: "wt" },
    { header: "Ovr", accessor: "ovr" },
  ];

  if (!isMobile) {
    rosterColumns = rosterColumns.concat([
      { header: "FIQ", accessor: "FootballIQ" },
      { header: "SPD", accessor: "Speed" },
      { header: "AGI", accessor: "Agility" },
      { header: "CAR", accessor: "Carrying" },
      { header: "CAT", accessor: "Catching" },
      { header: "RR", accessor: "RouteRunning" },
      { header: "ZCOV", accessor: "ZoneCoverage" },
      { header: "MCOV", accessor: "ManCoverage" },
      { header: "STR", accessor: "Strength" },
      { header: "TKL", accessor: "Tackle" },
      { header: "PBL", accessor: "PassBlock" },
      { header: "RBL", accessor: "RunBlock" },
      { header: "RUSH", accessor: "PassRush" },
      { header: "RUND", accessor: "RunDefense" },
      { header: "THP", accessor: "ThrowPower" },
      { header: "THA", accessor: "ThrowAccuracy" },
      { header: "KP", accessor: "KickPower" },
      { header: "KA", accessor: "KickAccuracy" },
      { header: "PP", accessor: "PuntPower" },
      { header: "PA", accessor: "PuntAccuracy" },
      { header: "STAM", accessor: "Stamina" },
      { header: "INJ", accessor: "Injury" },
    ]);
  }
  rosterColumns.push({ header: "Actions", accessor: "actions" });

  const rowRenderer = (item: CollegePlayer, index: number, backgroundColor: string) => {
    const attributes = getCFBAttributes(item, isMobile, category!);
    return (
      <div
        key={item.ID}
        className="table-row border-b dark:border-gray-700 text-start"
        style={{ backgroundColor }}
      >
        {attributes.map((attr, idx) => (
          <div key={idx} className="table-cell px-2 py-1 whitespace-nowrap">
            <span className="text-sm">{attr.value}</span>
          </div>
        ))}
        <div className="table-cell px-2 py-1 whitespace-nowrap">
          <ButtonGroup>
            <Button size="sm" onClick={() => openModal(InfoType, item)}>
              <Info />
            </Button>
            <Button size="sm" onClick={() => openModal(Cut, item)}>
              <ScissorIcon />
            </Button>
            <Button
              size="sm"
              variant={`${item.IsRedshirting ? "danger" : "primary"}`}
              disabled={item.IsRedshirting}
              onClick={() => openModal(Redshirt, item)}
            >
              {item.IsRedshirt ? <User /> : <UserPlus />}
            </Button>
            <Button
              size="sm"
              variant={item.TransferStatus === 0 ? "success" : "warning"}
              onClick={() => openModal(Promise, item)}
              disabled={item.TransferStatus === 0}
            >
              <ShieldCheck />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };

  return (
    <Table
      columns={rosterColumns}
      data={roster}
      rowRenderer={rowRenderer}
      backgroundColor={backgroundColor}
      team={team}
    />
  );
};
