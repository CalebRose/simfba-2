import React, { useEffect, useState } from "react";
import { AdminService } from "../_services/adminService";

export const useCFBTimestamp = () => {
  const [cfb_Timestamp, setCFB_Timestamp] = useState(null);

  useEffect(() => {
    if (!cfb_Timestamp) {
      getCFBTimestamp();
    }
  }, [cfb_Timestamp]);

  const getCFBTimestamp = async () => {
    const res = await AdminService.GetCFBTimestamp();
    if (res) {
      setCFB_Timestamp(() => res);
    }
  };

  return [cfb_Timestamp];
};
