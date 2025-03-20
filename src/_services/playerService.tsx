import { hckUrl } from "../_constants/urls";
import { GetActionCall, PostCall } from "../_helper/fetchHelper";

export const PlayerService = {
  // Cut CHL Player
  CutCHLPlayer: async (playerID: number): Promise<void> => {
    await GetActionCall(`${hckUrl}chl/roster/cut/${playerID}`);
  },

  RedshirtCHLPlayer: async (playerID: number): Promise<void> => {
    await GetActionCall(`${hckUrl}chl/roster/redshirt/${playerID}`);
  },

  PromiseCHLPlayer: async (playerID: number): Promise<void> => {
    await PostCall(`${hckUrl}chl/roster/promise/${playerID}`, {});
  },

  CutPHLPlayer: async (playerID: number): Promise<void> => {
    await GetActionCall(`${hckUrl}phl/roster/cut/${playerID}`);
  },

  SendPHLPlayerToAffiliate: async (playerID: number): Promise<void> => {
    await GetActionCall(`${hckUrl}phl/roster/affiliate/${playerID}`);
  },

  SendPHLPlayerToTradeBlock: async (playerID: number): Promise<void> => {
    await GetActionCall(`${hckUrl}phl/roster/tradeblock/${playerID}`);
  },
};
