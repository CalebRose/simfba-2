import React, { useEffect, useRef } from 'react';
import { display, generate } from 'facesjs';
import { League, SimCFB, SimNFL, SimCBB, SimNBA, SimCHL, SimPHL } from '../_constants/constants';
import { FaceDataResponse } from '../models/footballModels';
import { useSimFBAStore } from '../context/SimFBAContext';
import { useSimBBAStore } from '../context/SimBBAContext';
import { useSimHCKStore } from '../context/SimHockeyContext';

interface PlayerPictureProps {
  classes?: string;
  style?: React.CSSProperties | undefined;
  playerID: number;
  team: any;
  league: League;
}

const PlayerPicture: React.FC<PlayerPictureProps> = ({ classes, playerID, team, league }) => {
  const faceContainerRef = useRef<HTMLDivElement>(null);
  const simFBAStore = useSimFBAStore();
  const simBBAStore = useSimBBAStore();
  const simHCKStore = useSimHCKStore();

  const faceData = React.useMemo(() => {
  switch (league) {
    case "SimCFB":
    case "SimNFL":
    return simFBAStore.playerFaces as { [key: number]: FaceDataResponse };

    case "SimCBB":
    case "SimNBA":
    return simBBAStore.playerFaces as { [key: number]: FaceDataResponse };

    case "SimCHL":
    case "SimPHL":
    return simHCKStore.playerFaces as { [key: number]: FaceDataResponse };

    default:
    return {};
}
}, [league, simFBAStore, simBBAStore, simHCKStore]);

  useEffect(() => {
    const playerFaceData = faceData[playerID];
    if (playerFaceData) {
        const face = getPlayerFace(playerFaceData, team)

      if (faceContainerRef.current) {
        display(faceContainerRef.current, face);
      }
    }
  }, [faceData, playerID]);

  return <div ref={faceContainerRef} id="face-container" 
              className={`flex justify-center items-center h-full w-full ${classes}`} />;
};

export default PlayerPicture;



const getPlayerFace = (playerFaceData: FaceDataResponse, team: any) => {
    
    const teamColors: [string, string, string] = [
        team.ColorOne || "#000000",
        team.ColorTwo || "#FFFFFF",
        team.ColorThree || "#000000"
      ];
  
    return {
        accessories: { id: playerFaceData.Accessories },
        body: { id: playerFaceData.Body, color: playerFaceData.SkinColor, size: playerFaceData.BodySize },
        ear: { id: playerFaceData.Ear, size: playerFaceData.EarSize },
        eye: { id: playerFaceData.Eye, angle: playerFaceData.EyeAngle },
        eyeLine: { id: playerFaceData.EyeLine },
        eyebrow: { id: playerFaceData.Eyebrow, angle: playerFaceData.EyeBrowAngle },
        facialHair: { id: playerFaceData.FacialHair, shave: playerFaceData.FacialHairShave },
        fatness: playerFaceData.FaceSize,
        glasses: { id: playerFaceData.Glasses },
        hair: { id: playerFaceData.Hair, color: playerFaceData.HairColor, flip: playerFaceData.HairFlip },
        hairBg: { id: playerFaceData.HairBG },
        head: { id: playerFaceData.Head, shave: playerFaceData.FacialHairShave },
        jersey: { id: playerFaceData.Jersey },
        miscLine: { id: playerFaceData.MiscLine },
        mouth: { id: playerFaceData.Mouth, flip: playerFaceData.MouthFlip },
        nose: { id: playerFaceData.Nose, flip: playerFaceData.NoseFlip, size: playerFaceData.NoseSize },
        smileLine: { id: playerFaceData.SmileLine, size: playerFaceData.SmileLineSize },
        teamColors: teamColors,
    };
  };