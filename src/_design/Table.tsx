import React, { ReactNode } from "react";
import { getTextColorBasedOnBg } from "../_utility/getBorderClass";
import { darkenColor } from "../_utility/getDarkerColor";

// ✅ Define Types for Columns
interface TableColumn {
  header: string;
  accessor: string;
}

// ✅ Define Props Interface for Table
interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  backgroundColor?: string;
  team: any;
  textColor?: string;
  rowRenderer: (item: T, index: number, backgroundColor: string) => ReactNode;
}

export const Table = <T,>({
  columns,
  data,
  team,
  rowRenderer,
}: TableProps<T>): JSX.Element => {
  const backgroundColor = team?.ColorOne || "#4B5563";
  const borderColor = team?.ColorTwo || "#4B5563";
  const darkerBackgroundColor = darkenColor(backgroundColor, -5) || "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);

  return (
    <div className="overflow-auto w-full">
      <div
        className={`table-fixed w-full min-w-max sm:max-w-[300px] border-b-2 ${textColorClass}`}
        style={{ backgroundColor, borderColor }}
      >
        <div className="table-header-group w-full">
          <div className={`table-row w-full text-left ${textColorClass}`}
               style={{ backgroundColor: darkerBackgroundColor, borderColor }}>
            {columns.map((col) => (
              <div
                key={col.accessor}
                className={`table-cell border-b-2 px-1 py-2 font-semibold whitespace-nowrap w-[15%] sm:w-full ${textColorClass}`}
                style={{ backgroundColor: darkerBackgroundColor, borderColor }}>
                {col.header}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group w-full">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {rowRenderer(item, index, index % 2 === 0 ? "transparent" : darkerBackgroundColor)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};