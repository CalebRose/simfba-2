import React, { useEffect, useRef } from 'react';
import { display, generate } from 'facesjs';
import { League, SimCFB, SimNFL, SimCBB, SimNBA, SimCHL, SimPHL } from '../_constants/constants';
import { FaceDataResponse as fbFaceDataResponse } from '../models/footballModels';
import { FaceDataResponse as hkFaceDataResponse } from '../models/hockeyModels';
import { FaceDataResponse as bbFaceDataResponse } from '../models/basketballModels';
import { SimFBAContext, useSimFBAStore } from '../context/SimFBAContext';

interface PlayerPictureProps {
  classes?: string;
  style?: React.CSSProperties | undefined;
  playerID: number;
  team: any;
  league: League;
}

const PlayerPicture: React.FC<PlayerPictureProps> = ({ classes, playerID, team, league }) => {
  const faceContainerRef = useRef<HTMLDivElement>(null);
  let faceData: { [key: number]: fbFaceDataResponse | bbFaceDataResponse | hkFaceDataResponse } = {};

switch (league) {
    case "SimCFB":
    case "SimNFL":
        faceData = useSimFBAStore().playerFaces as { [key: number]: fbFaceDataResponse };
      break;

    // case "SimCBB":
    // case "SimNBA":
    //     faceData = useSimBBAStore().playerFaces as { [key: number]: fbFaceDataResponse };
    //   break;

    // case "SimCHL":
    // case "SimPHL":
    //     faceData = useSimHCKStore().playerFaces as { [key: number]: fbFaceDataResponse };
      break;
    default:
      break;  
  }

  useEffect(() => {
    const playerFaceData = faceData[playerID];
  
    if (playerFaceData) {
      const faceConfig = {
        ...playerFaceData,
        fatness: playerFaceData.BodySize || 1,
        playerTeamColors: [
          team.ColorOne || "#000000",
          team.ColorTwo || "#000000",
          team.ColorThree || "#000000",
        ],
        accessories: playerFaceData.Accessories || "none",
        hairBg: playerFaceData.HairBG || "none",
        body: playerFaceData.Body || "default-body",
        ear: playerFaceData.Ear || "default-ear",
        earSize: playerFaceData.EarSize || 1,
        eye: playerFaceData.Eye || "default-eye",
        eyeAngle: playerFaceData.EyeAngle || 0,
        eyeBrowAngle: playerFaceData.EyeBrowAngle || 0,
        eyeLine: playerFaceData.EyeLine || "none",
        eyebrow: playerFaceData.Eyebrow || "default-eyebrow",
        faceSize: playerFaceData.FaceSize || 1,
        facialHair: playerFaceData.FacialHair || "none",
        facialHairShave: playerFaceData.FacialHairShave || "rgba(0,0,0,0)",
        glasses: playerFaceData.Glasses || "none",
        hair: playerFaceData.Hair || "default-hair",
        hairColor: playerFaceData.HairColor || "#000000",
        hairFlip: playerFaceData.HairFlip || false,
        head: playerFaceData.Head || "default-head",
        jersey: playerFaceData.Jersey || "default-jersey",
        miscLine: playerFaceData.MiscLine || "none",
        mouth: playerFaceData.Mouth || "default-mouth",
        mouthFlip: playerFaceData.MouthFlip || false,
        nose: playerFaceData.Nose || "default-nose",
        noseFlip: playerFaceData.NoseFlip || false,
        noseSize: playerFaceData.NoseSize || 1,
        skinColor: playerFaceData.SkinColor || "#ffffff",
        smileLine: playerFaceData.SmileLine || "none",
        smileLineSize: playerFaceData.SmileLineSize || 1,
        teamColors: playerFaceData.teamColors || []
      };
  
      if (faceContainerRef.current) {
        display(faceContainerRef.current, faceConfig, { teamColors: faceConfig.teamColors });
      }
    }
  }, [faceData, playerID]);

  return <div ref={faceContainerRef} id="face-container" 
              className={`flex justify-center items-center h-full w-full ${classes}`} />;
};

export default PlayerPicture;