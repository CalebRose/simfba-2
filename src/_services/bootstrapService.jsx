import { hckUrl } from "../_constants/urls";
import { GetCall } from "../_helper/fetchHelper";

export const BootstrapService = {
  GetHCKBootstrapData: async (collegeID, proID) => {
    return await GetCall(`${hckUrl}/bootstrap/${collegeID}/${proID}`);
  },
};
