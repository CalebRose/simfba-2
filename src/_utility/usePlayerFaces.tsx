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
  let faceData: { [key: number]: FaceDataResponse } = {};

switch (league) {
    case "SimCFB":
    case "SimNFL":
        faceData = useSimFBAStore().playerFaces as { [key: number]: FaceDataResponse };
      break;

    case "SimCBB":
    case "SimNBA":
        faceData = useSimBBAStore().playerFaces as { [key: number]: FaceDataResponse };
      break;

    case "SimCHL":
    case "SimPHL":
        faceData = useSimHCKStore().playerFaces as { [key: number]: FaceDataResponse };
      break;
    default:
      break;  
  }

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