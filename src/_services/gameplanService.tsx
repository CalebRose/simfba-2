import { hckUrl } from "../_constants/urls";
import { PostCall } from "../_helper/fetchHelper";

export const GameplanService = {
  SaveCHLGameplan: async (dto: any): Promise<void> => {
    await PostCall(`${hckUrl}chl/strategy/update`, dto);
  },

  SavePHLGameplan: async (dto: any): Promise<void> => {
    await PostCall(`${hckUrl}phl/strategy/update`, dto);
  },
};
