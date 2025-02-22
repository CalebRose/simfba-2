import { useEffect, useRef, useState } from "react";
import { AuthService } from "../_services/auth";
import { bba_ws, fba_ws } from "../_constants/urls";

export const useWebSockets = () => {
  const fbaWS = useRef(null);
  const bbaWS = useRef(null);
  const [cfb_Timestamp, setCFB_Timestamp] = useState(null);
  const [cbb_Timestamp, setCBB_Timestamp] = useState(null);

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
    };
  }, []);

  return { cfb_Timestamp, cbb_Timestamp };
};
