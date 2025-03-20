import { Dispatch, FC, SetStateAction, useCallback } from "react";
import {
  CollegePlayer,
  CollegeShootoutLineup,
  ProfessionalPlayer,
  ProfessionalShootoutLineup,
} from "../../../models/hockeyModels";
import { Input } from "../../../_design/Inputs";
import { SelectDropdown } from "../../../_design/Select";
import {
  InfoType,
  League,
  Lineup,
  ModalAction,
} from "../../../_constants/constants";
import { SingleValue } from "react-select";
import { SelectOption, selectStyles } from "../../../_hooks/useSelectStyles";
import { getShootoutOptionList, getShootoutPlaceholder } from "./lineupHelper";
import { Button, ButtonGroup } from "../../../_design/Buttons";
import { Text } from "../../../_design/Typography";
import { Modal } from "../../../_design/Modal";
import { PlayerInfoModalBody } from "../../Common/Modals";
import { Info } from "../../../_design/Icons";

interface LineupPlayerProps {
  playerID: number;
  rosterMap: Record<number, CollegePlayer | ProfessionalPlayer>;
  zoneInputList: { label: string; key: string }[];
  lineCategory: Lineup;
  lineIDX: number;
  optionList: { label: string; value: string }[];
  ChangeState: (value: number, property: string) => void;
  ChangePlayerInput: (
    playerID: number,
    property: string,
    value: number
  ) => void;
  property: string;
  activatePlayer: (player: CollegePlayer) => void;
}

export const LineupPlayer: FC<LineupPlayerProps> = ({
  playerID,
  rosterMap,
  zoneInputList,
  lineCategory,
  lineIDX,
  optionList,
  ChangeState,
  ChangePlayerInput,
  property,
  activatePlayer,
}) => {
  const player = rosterMap[playerID];
  const GetValue = useCallback(
    (opts: SingleValue<SelectOption>) =>
      ChangeState(Number(opts!.value), property),
    [ChangeState, property]
  );

  const ChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      ChangePlayerInput(
        playerID,
        event.target.name,
        Number(event.target.value)
      );
    },
    [ChangePlayerInput, playerID]
  );
  return (
    <div className="flex flex-col px-4 min-[1025px]:h-full max-[1024px]:w-full max-[1024px]:mb-4 max-[1024px]:overflow-y-auto">
      {playerID > 0 && (
        <>
          <div className="flex flex-row mb-2 gap-x-1 justify-end w-full items-end">
            <Button
              classes="h-full"
              onClick={() => activatePlayer(player as CollegePlayer)}
            >
              <Info />
            </Button>
            <SelectDropdown
              onChange={GetValue}
              options={optionList}
              placeholder={`${player.Position} ${player.FirstName} ${player.LastName}`}
            />
          </div>
          <div className="flex flex-col gap-y-2 flex-1">
            {zoneInputList.map((x) => (
              <Input
                type="number"
                key={x.key}
                label={x.label}
                name={x.key}
                value={player[x.key] as number}
                onChange={ChangeInput}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface ShootoutPlayerProps {
  playerID: number;
  idx: number;
  rosterMap: Record<number, CollegePlayer | ProfessionalPlayer>;
  lineCategory: CollegeShootoutLineup | ProfessionalShootoutLineup;
  optionList: { label: string; value: string }[];
  ChangeState: (value: number, property: string) => void;
  property: string;
  shootoutProperty: string;
  activatePlayer: (player: CollegePlayer) => void;
}

export const ShootoutPlayer: FC<ShootoutPlayerProps> = ({
  playerID,
  idx,
  rosterMap,
  optionList,
  ChangeState,
  property,
  shootoutProperty,
  lineCategory,
  activatePlayer,
}) => {
  const player = rosterMap[playerID];
  const GetValue = useCallback(
    (opts: SingleValue<SelectOption>) =>
      ChangeState(Number(opts?.value), property),
    [ChangeState, property]
  );

  const GetShootoutValue = useCallback(
    (opts: SingleValue<SelectOption>) =>
      ChangeState(Number(opts?.value), shootoutProperty),
    [ChangeState, shootoutProperty]
  );

  const shootoutPlaceholder = getShootoutPlaceholder(
    lineCategory[shootoutProperty]
  );

  return (
    <div className="flex flex-col pt-2 px-4 min-[1025px]:h-1/2 min-[1025px]:mb-4 max-[1024px]:gap-y-1">
      {playerID > 0 && (
        <>
          <div className="flex flex-col justify-end w-full min-[1025px]:items-end">
            <div className="min-[900px]:grid min-[900px]:grid-cols-[1fr_3fr] max-[1024px]:gap-x-2">
              <label className="flex items-center min-[1025px]:justify-end min-[1025px]:text-end mr-2">
                Player {idx}
              </label>

              <div className="flex flex-row gap-x-1">
                <Button
                  classes=""
                  onClick={() => activatePlayer(player as CollegePlayer)}
                >
                  <Info />
                </Button>
                <SelectDropdown
                  onChange={GetValue}
                  options={optionList}
                  placeholder={`${player.Position} ${player.FirstName} ${player.LastName}`}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
                      borderColor: state.isFocused ? "#4A90E2" : "#4A5568",
                      color: "#ffffff",
                      width: "15rem",
                      maxWidth: "300px",
                      padding: "0.3rem",
                      boxShadow: state.isFocused ? "0 0 0 1px #4A90E2" : "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "#1a202c",
                      borderRadius: "8px",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      backgroundColor: "#1a202c",
                      padding: "0",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2d3748" : "#1a202c",
                      color: "#ffffff",
                      padding: "10px",
                      cursor: "pointer",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#ffffff",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#A0AEC0",
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-end">
            <div className="min-[900px]:grid min-[900px]:grid-cols-[1fr_3fr] min-[1025px]:space-y-2 max-[1024px]:gap-x-2">
              <label className="flex items-center min-[1025px]:justify-end mr-2">
                Shot Type {idx}
              </label>
              <SelectDropdown
                onChange={GetShootoutValue}
                options={getShootoutOptionList()}
                placeholder={shootoutPlaceholder}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  league: League;
  player: any;
  modalAction: ModalAction;
}

export const LineupHelpModal: FC<HelpModalProps> = ({
  isOpen,
  onClose,
  league,
  modalAction,
  player,
}) => {
  let title = "Lineup Page";
  if (modalAction === InfoType) {
    title = `${player.ID} ${player.Position} ${player.FirstName} ${player.LastName}`;
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        actions={
          <>
            <ButtonGroup>
              <Button size="sm" variant="primary" onClick={onClose}>
                <Text variant="small">Close</Text>
              </Button>
            </ButtonGroup>
          </>
        }
      >
        {modalAction === InfoType && (
          <PlayerInfoModalBody league={league} player={player} />
        )}
        {modalAction !== InfoType && (
          <div className="overflow-y-auto max-h-[60vh]">
            <Text className="mb-4 text-start">
              Welcome to the {league} Lineup Page.
            </Text>
            <Text className="mb-4 text-start">
              On this page, you can customize your lineups for all of your
              forwards, defenders, and goalies; including a shootout lineup as
              well.
            </Text>
            <Text className="mb-4 text-start">
              To better explain, each user will have access to four Forward
              lines, and three Defensive lines, and two Goalie lines. The first
              set of buttons allows you to view any of these lines.
            </Text>
            <Text className="mb-4 text-start">
              Each forward line must have two forwards and a center; each
              defensive line must have two defenders, and each Goalie line must
              have one goalie.
            </Text>
            <Text className="mb-4 text-start">
              Users can set two Goalie lines, with each Goalie line
              corresponding to the alternating schedule in the college hockey
              season. The same Goalie cannot start on both Goalie lines.
            </Text>
            <Text className="mb-4 text-start">
              The second set of buttons controls which zone of the rink you are
              viewing. Defending Goal Zone is the area around your goalie and
              the net. Defending Zone is the outer perimeter of the defensive
              zone up to the blue line. The neutral zone is the very center of
              the rink. The attacking zone is the outer area of your opponent's
              side of the rink. Finally, the Attacking Goal Zone is the area
              around your opponent's goalie and net.
            </Text>
            <Text className="mb-4 text-start">
              Each zone input is a configuration towards how your designated
              line will behave when they are in the designated area of the rink.
              For all none-check inputs, users may input anywhere between 0-25
              on any of the inputs. The total of all non-check inputs *must*
              equal to 15 times the number of non-check inputs.
            </Text>
            <Text className="mb-4 text-start">
              Additionally, you can alter the behavior of any of your line
              players between -10 and 10 on any of the selected inputs, given
              the designated area of the rink.
            </Text>
            <Text className="mb-4 text-start">
              For more information, please view the{" "}
              <a
                href="https://docs.google.com/document/d/18h6drOHquHfhOdU9mdToBr39N8gyKQjC7CXvNbuy0XU/edit?usp=sharing"
                target="_blank"
              >
                Gameplan & Strategy
              </a>{" "}
              section of the SimHCK documentation.
            </Text>
          </div>
        )}
      </Modal>
    </>
  );
};
