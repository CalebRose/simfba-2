import { ReactNode } from "react";

// ✅ Define props interface
interface BorderProps {
  children: ReactNode;
  direction?: string;
  classes?: string;
}

// ✅ Define props interface
interface BorderHiddenProps {
  children: ReactNode;
}

export const Border: React.FC<BorderProps> = ({ children, direction="col", classes="" }) => {
  return (
    <div className={`flex flex-${direction} border-2 rounded-xl p-2 px-4 lg:px-6 mb-2 ${classes}`}>
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
