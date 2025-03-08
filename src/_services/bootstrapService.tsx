import { bbaUrl, fbaUrl, hckUrl } from "../_constants/urls";
import { GetCall } from "../_helper/fetchHelper";
import { BootstrapData as BBBootstrap } from "../models/basketballModels";
import { BootstrapData as FBBootstrap } from "../models/footballModels";
import { BootstrapData as HockeyBootstrap } from "../models/hockeyModels";

export const BootstrapService = {
  // ✅ Get Hockey Bootstrap Data
  GetHCKBootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<HockeyBootstrap> => {
    return await GetCall<HockeyBootstrap>(
      `${hckUrl}bootstrap/${collegeID}/${proID}`
    );
  },

  // ✅ Get Football Bootstrap Data
  GetFBABootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<FBBootstrap> => {
    return await GetCall<FBBootstrap>(
      `${fbaUrl}bootstrap/${collegeID}/${proID}`
    );
  },

  // ✅ Get Football Bootstrap Data
  GetSecondFBABootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<FBBootstrap> => {
    return await GetCall<FBBootstrap>(
      `${fbaUrl}bootstrap/two/${collegeID}/${proID}`
    );
  },

  // ✅ Get Football Bootstrap Data
  GetThirdFBABootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<FBBootstrap> => {
    return await GetCall<FBBootstrap>(
      `${fbaUrl}bootstrap/three/${collegeID}/${proID}`
    );
  },

  // ✅ Get Basketball Bootstrap Data
  GetBBABootstrapData: async (
    collegeID: number,
    proID: number
  ): Promise<BBBootstrap> => {
    return await GetCall<BBBootstrap>(
      `${bbaUrl}bootstrap/${collegeID}/${proID}`
    );
  },
};
