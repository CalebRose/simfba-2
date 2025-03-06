import { FC } from "react";
import { Table } from "../../_design/Table";
import { Text } from "../../_design/Typography";
import { CollegePlayer as CHLPlayer } from "../../models/hockeyModels";
import { useMobile } from "../../_hooks/useMobile";
import { getCHLAttributes } from "./TeamPageUtils";
import { CHLRosterMobilePlayerCard } from "../Common/Cards";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";

interface CHLRosterTableProps {
  roster: CHLPlayer[];
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
}

export const CHLRosterTable: FC<CHLRosterTableProps> = ({
  roster,
  colorOne,
  colorTwo,
  colorThree,
}) => {
  const backgroundColor = colorOne || "#4B5563";
  const borderColor = colorTwo || "#4B5563";
  const secondaryBorderColor = colorThree || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  const [isMobile] = useMobile();
  let rosterColumns = [
    { header: "ID", accessor: "" },
    { header: "Name", accessor: "Name" },
    { header: "Pos", accessor: "pos" },
    { header: "Archetype", accessor: "arch" },
    { header: "Yr", accessor: "yr" },
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

  const rowRenderer = (item: CHLPlayer, index: number) => {
    const attributes = getCHLAttributes(item, isMobile);
    return (
      <div
        key={item.ID}
        className="table-row border-b dark:border-gray-700 text-start"
      >
        {attributes.map((attr, idx) => (
          <div key={idx} className="table-cell px-2 py-1 whitespace-nowrap">
            <span className="text-sm">{attr.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Table
      columns={rosterColumns}
      data={roster}
      rowRenderer={rowRenderer}
      backgroundColor={secondaryBorderColor}
      textColor={colorTwo}
    />
  );
};
