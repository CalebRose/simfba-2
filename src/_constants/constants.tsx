export const SimCFB = "SimCFB";
export const SimNFL = "SimNFL";
export const SimCBB = "SimCBB";
export const SimNBA = "SimNBA";
export const SimCHL = "SimCHL";
export const SimPHL = "SimPHL";
export const SimFBA = "SimFBA";
export const SimBBA = "SimBBA";
export const SimHCK = "SimHCK";
export type League =
  | typeof SimCFB
  | typeof SimNFL
  | typeof SimCBB
  | typeof SimNBA
  | typeof SimCHL
  | typeof SimPHL;

export const CollegeRequests = "College Requests";
export const ProRequests = "Pro Requests";
export const CollegeTeams = "College Teams";
export const ProTeams = "Pro Teams";
export const Requests = "Requests";
export const Teams = "Teams";
export const Owner = "Owner";
export const Coach = "Coach";
export const GM = "GM";
export const Scout = "Scout";
export const Assistant = "Assistant";
export const Marketing = "Marketing";
export const Cut = "Cut";
export const Promise = "Promise";
export const Redshirt = "Redshirt";
export const InfoType = "Info";
export const PracticeSquad = "Practice Squad";
export const Affiliate = "Affiliate";
export type ModalAction =
  | typeof Cut
  | typeof Promise
  | typeof Redshirt
  | typeof InfoType
  | typeof PracticeSquad
  | typeof Affiliate;
