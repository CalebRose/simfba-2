import { FC, useCallback } from "react";
import {
  CollegePlayer,
  ProfessionalPlayer,
} from "../../../models/hockeyModels";
import { Text } from "../../../_design/Typography";
import { Input } from "../../../_design/Inputs";
import { SelectDropdown } from "../../../_design/Select";
import { Lineup } from "../../../_constants/constants";
import { SingleValue } from "react-select";
import { SelectOption } from "../../../_hooks/useSelectStyles";

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
}) => {
  const player = rosterMap[playerID];
  const GetValue = useCallback(
    (opts: SingleValue<SelectOption>) =>
      ChangeState(Number(opts?.value), property),
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
    <div className="flex flex-col px-4 h-full">
      {playerID > 0 && (
        <>
          <div className="flex flex-col mb-2 justify-end w-full items-end">
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
