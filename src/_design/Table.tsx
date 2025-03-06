import React, { ReactNode } from "react";

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
  textColor?: string;
  rowRenderer: (item: T, index: number) => ReactNode;
}

export const Table = <T,>({
  columns,
  data,
  rowRenderer,
}: TableProps<T>): JSX.Element => {
  return (
    <div className="overflow-x-auto w-full">
      <div className="table table-fixed min-w-max sm:max-w-[300px] border-collapse bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="table-header-group">
          <div className="table-row bg-gray-100 dark:bg-gray-900 text-left">
            {columns.map((col) => (
              <div
                key={col.accessor}
                className="table-cell px-1 py-2 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap"
              >
                {col.header}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {rowRenderer(item, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
