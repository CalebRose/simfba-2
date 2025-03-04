import { getLogo } from "../../_utility/getLogo";
import { Logo } from "../../_design/Logo";
import { Text } from "../../_design/Typography";
import { getTextColorBasedOnBg } from "../../_utility/getBorderClass";
import { LockIcon } from "../../_design/Icons";
import { League } from "../../_constants/constants";

interface TeamCardProps {
  teamID: number;
  league: League;
  team: string;
  conference: string;
  disable: boolean | undefined;
  retro: boolean | undefined;
  setSelectedTeam: any;
  t: any;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  teamID,
  league,
  team,
  conference,
  disable,
  retro,
  setSelectedTeam,
  t,
}) => {
  const logo = getLogo(league, teamID, retro);
  const backgroundColor = !disable ? t.ColorOne : "#4B5563"; // Default to Tailwind's gray-600 if no color provided
  const borderColor = !disable ? t.ColorTwo : "#4B5563";
  const textColorClass = getTextColorBasedOnBg(backgroundColor);
  return (
    <button
      className={`relative md:p-[3px] border-2 rounded-2xl md:mx-2 mb-2 md:mb-4 shadow-lg cursor-pointer ${
        disable ? "grayscale" : ""
      }`}
      style={{ backgroundColor, borderColor }}
      onClick={() => setSelectedTeam(t)}
    >
      <div
        className={`flex flex-col items-center w-full min-[320px]:max-w-[18vw] min-[400px]:max-w-[20rem] h-[15vh] max-h-[18vh] lg:h-[180px] lg:w-60 rounded-2xl`}
      >
        {logo && (
          <div className="flex flex-col items-center justify-center align-center h-full w-auto max-w-full md:w-[13rem] md:px-4 md:py-4">
            <Logo
              label={`${team}`}
              url={logo}
              classes="max-h-[2.5rem] max-w-[4rem] md:max-h-[4.5rem] md:max-w-[4rem] lg:max-h-[5rem] lg:max-w-[8rem]"
              containerClass="md:items-center"
              textClass={`${textColorClass} text-center md:text-[1rem]`}
            />
            <Text variant="small" classes={`font-semibold ${textColorClass}`}>
              {conference}
            </Text>
          </div>
        )}
        {disable && <LockIcon textColorClass={textColorClass} />}
      </div>
    </button>
  );
};
