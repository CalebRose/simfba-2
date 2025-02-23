import { useEffect, useRef, useState } from "react";
import { AuthService } from "../_services/auth";
import { bba_ws, fba_ws, hck_ws } from "../_constants/urls";
import { Timestamp as FBTimeStamp } from "../models/footballModels";
import { Timestamp as BKTimestamp } from "../models/basketballModels";
import { Timestamp as HKTimestamp } from "../models/hockeyModels";

export const useWebSockets = () => {
  const fbaWS = useRef<WebSocket | null>(null);
  const bbaWS = useRef<WebSocket | null>(null);
  const hckWS = useRef<WebSocket | null>(null);
  const [cfb_Timestamp, setCFB_Timestamp] = useState<FBTimeStamp | null>(null);
  const [cbb_Timestamp, setCBB_Timestamp] = useState<BKTimestamp | null>(null);
  const [hck_Timestamp, setHCK_Timestamp] = useState<HKTimestamp | null>(null);

  useEffect(() => {
    const initializeWebSockets = async () => {
      const user = await AuthService.getProfile();

      if (user) {
        if (user.data.teamId > 0 || user.data.NFLTeamID > 0) {
          console.log("Initializing FBA WebSocket...");
          fbaWS.current = new WebSocket(fba_ws);

          fbaWS.current.onopen = () => console.log("FBA WebSocket connected");
          fbaWS.current.onmessage = (event) =>
            setCFB_Timestamp(JSON.parse(event.data));
          fbaWS.current.onerror = (error) =>
            console.error("FBA WebSocket error:", error);
          fbaWS.current.onclose = () =>
            console.log("FBA WebSocket connection closed");
        }

        if (user.data.cbb_id > 0 || user.data.NBATeamID > 0) {
          console.log("Initializing BBA WebSocket...");
          bbaWS.current = new WebSocket(bba_ws);

          bbaWS.current.onopen = () => console.log("BBA WebSocket connected");
          bbaWS.current.onmessage = (event) =>
            setCBB_Timestamp(JSON.parse(event.data));
          bbaWS.current.onerror = (error) =>
            console.error("BBA WebSocket error:", error);
          bbaWS.current.onclose = () =>
            console.log("BBA WebSocket connection closed");
        }

        if (user.data.CHL_ID > 0 || user.data.PHL_ID > 0) {
          console.log("Initializing HCK WebSocket...");
          hckWS.current = new WebSocket(hck_ws);

          hckWS.current.onopen = () => console.log("HCK WebSocket connected");
          hckWS.current.onmessage = (event) =>
            setHCK_Timestamp(JSON.parse(event.data));
          hckWS.current.onerror = (error) =>
            console.error("HCK WebSocket error:", error);
          hckWS.current.onclose = () =>
            console.log("HCK WebSocket connection closed");
        }
      }
    };

    initializeWebSockets();

    // Cleanup both WebSocket connections on unmount
    return () => {
      if (fbaWS.current) {
        fbaWS.current.close();
      }
      if (bbaWS.current) {
        bbaWS.current.close();
      }
      if (hckWS.current) {
        hckWS.current.close();
      }
    };
  }, []);

  return { cfb_Timestamp, cbb_Timestamp, hck_Timestamp };
};
