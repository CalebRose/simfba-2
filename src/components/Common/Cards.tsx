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
        className={`flex flex-col items-center w-full min-[320px]:max-w-[15vw] min-[400px]:max-w-[18vw] h-[20vw] max-h-[20vh] lg:max-w-[14vw] justify-center lg:h-[180px] lg:w-60 rounded-2xl`}
      >
        <div className="flex flex-col items-center justify-center w-[20vw] h-[20vw] md:h-full md:w-auto md:px-6 md:py-4">
          {logo && (
            <Logo
              label={team}
              url={logo}
              classes={`mb-2 mt-2`}
              textClass={textColorClass}
            />
          )}
          <div className="md:h-[125px] flex flex-col justify-center">
            <div
              className={`flex flex-row mb-2 text-center justify-center md:w-[150px]`}
            >
              <Text variant="xs" classes={`font-semibold ${textColorClass}`}>
                {conference}
              </Text>
            </div>
          </div>
          {disable && <LockIcon textColorClass={textColorClass} />}
        </div>
      </div>
    </button>
  );
};
