// Universal Landing Page Headers (Section Cards)
export const fbPassStats = "Passing Leader";
export const fbRushStats = "Rushing Leader";
export const fbReceivingStats = "Receiving Leader";
export const fbTdAbbr = "TDs";
export const fbYardsAbbr = "Yards";
export const hkPointsStats = "Points Leader";
export const hkGoalsStats = "Goals Leader";
export const hkAssistsStats = "Assists Leader";
export const hkGamesAbbr = "GP";
export const hkPointsAbbr = "Points";
export const hkGoalsAbbr = "Goals";
export const hkAssistsAbbr = "Assists";
export const bbPpgStats = "Points Leader";
export const bbApgStats = "Assists Leader";
export const bbRpgStats = "Rebounds Leader";
export const bbGamesAbbr = "GP";
export const bbPpgAbbr = "PPG";
export const bbApgAbbr = "APG";
export const bbRpgAbbr = "RPG";


export const headersMapping = {
    SimCFB: [fbPassStats, fbRushStats, fbReceivingStats, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr],
    SimNFL: [fbPassStats, fbRushStats, fbReceivingStats, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr],
    SimCHL: [hkPointsStats, hkGoalsStats, hkAssistsStats, hkGamesAbbr, hkPointsAbbr, hkGamesAbbr, hkGoalsAbbr, hkGamesAbbr, hkAssistsAbbr],
    SimPHL: [hkPointsStats, hkGoalsStats, hkAssistsStats, hkGamesAbbr, hkPointsAbbr, hkGamesAbbr, hkGoalsAbbr, hkGamesAbbr, hkAssistsAbbr],
    SimCBB: [bbPpgStats, bbApgStats, bbRpgStats, bbGamesAbbr, bbPpgAbbr, bbGamesAbbr, bbApgAbbr, bbGamesAbbr, bbRpgAbbr],
    SimNBA: [bbPpgStats, bbApgStats, bbRpgStats, bbGamesAbbr, bbPpgAbbr, bbGamesAbbr, bbApgAbbr, bbGamesAbbr, bbRpgAbbr],
  } as const;

  export type LeagueType = keyof typeof headersMapping;

// College Landing Page Headers (Section Cards)
export const collegeRecruiting = " Recruiting Overview";
export const scholarshipsAvailable = "Scholarships Available: ";
export const scholarshipOffersAvailable = "Scholarship Offers Available: ";
export const recruitsSigned = "Recruits Signed: ";
export const weeklyPointsSpent = "Weekly Points Spent: ";
export const weeklyPointsAvailable = "Weekly Points Available: ";
export const homeState = "Home State: ";
export const resScore = "RES Score: ";

// Pro Landing Page Headers (Section Cards)
export const proFinances = " Team Overview";
export const LeagueCap = "League Cap: ";
export const capHit = "Cap Hit: ";
export const capSpace = "Cap Space: ";
export const activePlayers = "Active Roster: ";
export const psPlayers = "Practice Squad: ";