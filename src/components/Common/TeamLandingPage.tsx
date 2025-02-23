import { ColFrame } from "./Frame";
import { useAuthStore } from "../../context/AuthContext";

interface TeamLandingPageProps {
  team: any;
}

export const TeamLandingPage = ({ team }: TeamLandingPageProps) => {
  const { ts, selectedLeague } = useAuthStore();
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-4">
        <ColFrame className="flex-1">TEST</ColFrame>
        <ColFrame className="flex-1 overflow-y-scroll max-h-[50vh] border-4 rounded-xl scroll-p-2 scroll-smooth">
          TEST
        </ColFrame>
      </div>
    </>
  );
};
