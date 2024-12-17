import React from "react";

export const Table = ({ columns, data, rowRenderer }) => {
  return (
    <div className="overflow-x-auto border rounded-lg dark:border-gray-600 lg:w-[24rem]">
      <table className="min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <thead>
          <tr className="w-full bg-gray-100 dark:bg-gray-900 text-left">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-1 py-2 text-gray-600 dark:text-gray-300 font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <>{rowRenderer(item, index)}</>
          ))}
        </tbody>
      </table>
    </div>
  );
};
