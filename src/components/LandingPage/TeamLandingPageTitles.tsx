// Universal Landing Page Headers (Section Cards)
export const fbPassStats = "Passing Leader";
export const fbRushStats = "Rushing Leader";
export const fbReceivingStats = "Receiving Leader";
export const fbTdAbbr = "TDs";
export const fbYardsAbbr = "Yards";
export const hkPointsStats = "Points Leader";
export const hkGoalsStats = "Goals Leader";
export const hkAssistsStats = "Assists Leader";
export const hkGamesAbbr = "TOI";
export const hkPointsAbbr = "Points";
export const hkGoalsAbbr = "Goals";
export const hkAssistsAbbr = "Assists";
export const bbPpgStats = "Points Leader";
export const bbApgStats = "Assists Leader";
export const bbRpgStats = "Rebounds Leader";
export const bbGamesAbbr = "MIN";
export const bbPpgAbbr = "PPG";
export const bbApgAbbr = "AST";
export const bbRpgAbbr = "REB";


export const headersMapping = {
    SimCFB: [fbPassStats, fbRushStats, fbReceivingStats, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr],
    SimNFL: [fbPassStats, fbRushStats, fbReceivingStats, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr, fbTdAbbr, fbYardsAbbr],
    SimCHL: [hkPointsStats, hkGoalsStats, hkAssistsStats, hkPointsAbbr, hkGamesAbbr, hkGoalsAbbr, hkGamesAbbr, hkAssistsAbbr, hkGamesAbbr],
    SimPHL: [hkPointsStats, hkGoalsStats, hkAssistsStats, hkPointsAbbr, hkGamesAbbr, hkGoalsAbbr, hkGamesAbbr, hkAssistsAbbr, hkGamesAbbr],
    SimCBB: [bbPpgStats, bbApgStats, bbRpgStats, bbPpgAbbr, bbGamesAbbr, bbApgAbbr, bbGamesAbbr, bbRpgAbbr, bbGamesAbbr],
    SimNBA: [bbPpgStats, bbApgStats, bbRpgStats, bbPpgAbbr, bbGamesAbbr, bbApgAbbr, bbGamesAbbr, bbRpgAbbr, bbGamesAbbr],
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