import React, { useEffect, useState } from "react";
import { AdminService } from "../_services/adminService";

export const useCBBTimestamp = () => {
  const [cbb_Timestamp, setCBB_Timestamp] = useState(null);

  useEffect(() => {
    if (!cbb_Timestamp) {
      getCBBTimestamp();
    }
  }, [cbb_Timestamp]);

  const getCBBTimestamp = async () => {
    const res = await AdminService.GetCBBTimestamp();
    if (res) {
      setCBB_Timestamp(() => res);
    }
  };

  return [cbb_Timestamp];
};
