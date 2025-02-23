import { ReactNode } from "react";

// ✅ Define props interface
interface BorderProps {
  children: ReactNode;
}

// ✅ Define props interface
interface BorderHiddenProps {
  children: ReactNode;
}

export const Border: React.FC<BorderProps> = ({ children }) => {
  return (
    <div className="flex flex-col border-2 rounded-xl p-2 px-4 lg:px-6 mb-2">
      {children}
    </div>
  );
};

export const BorderHidden: React.FC<BorderHiddenProps> = ({ children }) => {
  return (
    <div className="hidden sm:flex sm:flex-col md:justify-between border-2 rounded-xl p-2 px-4 lg:px-6 mb-2">
      {children}
    </div>
  );
};
