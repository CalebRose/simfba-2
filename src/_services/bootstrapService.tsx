import { fbaUrl, hckUrl } from "../_constants/urls";
import { ApiResponse, GetCall } from "../_helper/fetchHelper";
import { BootstrapData as FBBootstrap } from "../models/footballModels";
import { BootstrapData as HockeyBootstrap } from "../models/hockeyModels";

export const BootstrapService = {
  // ✅ Get Hockey Bootstrap Data
  GetHCKBootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<ApiResponse<HockeyBootstrap>> => {
    return await GetCall<HockeyBootstrap>(
      `${hckUrl}bootstrap/${collegeID}/${proID}`
    );
  },

  // ✅ Get Football Bootstrap Data
  GetFBABootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<ApiResponse<FBBootstrap>> => {
    return await GetCall<FBBootstrap>(
      `${fbaUrl}bootstrap/${collegeID}/${proID}`
    );
  },
};
