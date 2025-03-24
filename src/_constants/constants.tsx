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
export const Help1 = "Help1";
export const Help2 = "Help2";
export const Help3 = "Help3";
export const Help4 = "Help4";
export type ModalAction =
  | typeof Cut
  | typeof Promise
  | typeof Redshirt
  | typeof InfoType
  | typeof PracticeSquad
  | typeof Affiliate
  | typeof Help1
  | typeof Help2
  | typeof Help3
  | typeof Help4;

export const LineupF1 = "Forwards 1";
export const LineupF2 = "Forwards 2";
export const LineupF3 = "Forwards 3";
export const LineupF4 = "Forwards 4";
export const LineupD1 = "Defenders 1";
export const LineupD2 = "Defenders 2";
export const LineupD3 = "Defenders 3";
export const LineupG1 = "Goalies 1";
export const LineupG2 = "Goalies 2";
export const LineupSO = "Shootout";
export type Lineup =
  | typeof LineupF1
  | typeof LineupF2
  | typeof LineupF3
  | typeof LineupF4
  | typeof LineupD1
  | typeof LineupD2
  | typeof LineupD3
  | typeof LineupG1
  | typeof LineupG2
  | typeof LineupSO;
export const DefendingGoalZone = "Defending Goal Zone";
export const DefendingZone = "Defending Zone";
export const NeutralZone = "Neutral Zone";
export const AttackingZone = "Attacking Zone";
export const AttackingGoalZone = "Attacking Goal Zone";
export type Zone =
  | typeof DefendingGoalZone
  | typeof DefendingZone
  | typeof NeutralZone
  | typeof AttackingZone
  | typeof AttackingGoalZone;
export const RecruitingOverview = 'Overview';
export const RecruitingTeamBoard = 'Team Board';
export type RecruitingCategory = typeof RecruitingOverview | typeof RecruitingTeamBoard;