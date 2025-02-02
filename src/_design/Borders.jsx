import React from "react";

export const Border = ({ children }) => {
  return <div className="flex flex-col border-2 rounded-xl p-2 px-4 lg:px-6 mb-2">{children}</div>;
};

export const BorderHidden = ({ children }) => {
  return <div className="hidden sm:flex sm:flex-col md:justify-between border-2 rounded-xl p-2 px-4 lg:px-6 mb-2">{children}</div>;
};
