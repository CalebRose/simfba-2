import { useEffect, useRef, useState } from "react";
import { AuthService } from "../_services/auth";
import { bba_ws, fba_ws, hck_ws } from "../_constants/urls";
import { Timestamp as FBTimeStamp } from "../models/footballModels";
import { Timestamp as BKTimestamp } from "../models/basketballModels";
import { Timestamp as HKTimestamp } from "../models/hockeyModels";
import { useAuthStore } from "../context/AuthContext";
import { SimBBA, SimFBA, SimHCK } from "../_constants/constants";

export const useWebSockets = (url: string, sport: string) => {
  const { currentUser, isLoading } = useAuthStore();
  const tsWS = useRef<WebSocket | null>(null);
  const bbaWS = useRef<WebSocket | null>(null);
  const hckWS = useRef<WebSocket | null>(null);
  const wsInitializedRef = useRef(false);
  const [cfb_Timestamp, setCFB_Timestamp] = useState<FBTimeStamp | null>(null);
  const [cbb_Timestamp, setCBB_Timestamp] = useState<BKTimestamp | null>(null);
  const [hck_Timestamp, setHCK_Timestamp] = useState<HKTimestamp | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (wsInitializedRef.current) return;
    wsInitializedRef.current = true;

    const initializeWebSockets = async () => {
      if (cfb_Timestamp && sport === SimFBA) return;
      if (cbb_Timestamp && sport === SimBBA) return;
      if (hck_Timestamp && sport === SimHCK) return;
      if (currentUser) {
        console.log("Initializing " + sport + " WebSocket...");
        tsWS.current = new WebSocket(url);

        tsWS.current.onopen = () => console.log(sport + " WebSocket connected");
        tsWS.current.onmessage = (event) => {
          if (sport === SimFBA) {
            setCFB_Timestamp(JSON.parse(event.data));
          } else if (sport === SimBBA) {
            setCBB_Timestamp(JSON.parse(event.data));
          } else if (sport === SimHCK) {
            setHCK_Timestamp(JSON.parse(event.data));
          }
        };
        tsWS.current.onerror = (error) =>
          console.error(sport + " WebSocket error:", error);
        tsWS.current.onclose = () =>
          console.log(sport + " WebSocket connection closed");
      }
    };

    initializeWebSockets();

    // Cleanup both WebSocket connections on unmount
    return () => {
      if (tsWS.current) {
        tsWS.current.close();
        tsWS.current = null;
      }
      wsInitializedRef.current = false;
    };
  }, [isLoading]);

  return { cfb_Timestamp, cbb_Timestamp, hck_Timestamp };
};
