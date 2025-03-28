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
export const RecruitingOverview = "Overview";
export const RecruitingTeamBoard = "Team Board";
export const RecruitingRankings = "RecruitingRankings";
export type RecruitingCategory =
  | typeof RecruitingOverview
  | typeof RecruitingTeamBoard
  | typeof RecruitingRankings;
export const Attributes = "Attributes";
export const Preferences = "Preferences";
export const Potentials = "Potentials";
export const USA = "USA";
export const Canada = "Canada";
export const Sweden = "Sweden";
export const Russia = "Russia";
export const HockeyPositionOptions = [
  { label: "Centers", value: "C" },
  { label: "Forwards", value: "F" },
  { label: "Defenders", value: "D" },
  { label: "Goalies", value: "G" },
];
export const HockeyArchetypeOptions = [
  { label: "Butterfly", value: "Butterfly" },
  { label: "Defensive", value: "Defensive" },
  { label: "Enforcer", value: "Enforcer" },
  { label: "Grinder", value: "Grinder" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Offensive", value: "Offensive" },
  { label: "Playmaker", value: "Playmaker" },
  { label: "Power", value: "Power" },
  { label: "Sniper", value: "Sniper" },
];
export const USARegionOptions = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export const CanadaRegionOptions = [
  { label: "Alberta", value: "AB" },
  { label: "British Columbia", value: "BC" },
  { label: "Manitoba", value: "MB" },
  { label: "New Brunswick", value: "NB" },
  { label: "Newfoundland and Labrador", value: "NL" },
  { label: "Northwest Territories", value: "NWT" }, // or "NT"
  { label: "Nova Scotia", value: "NS" },
  { label: "Nunavut", value: "NVT" }, // or "NU"
  { label: "Ontario", value: "ON" },
  { label: "Prince Edward Island", value: "PE" },
  { label: "Quebec", value: "QC" },
  { label: "Saskatchewan", value: "SK" },
  { label: "Yukon", value: "YT" },
];

export const RussiaRegionOptions = [
  { label: "Karelia", value: "Karelia" },
  { label: "Moscow", value: "Moscow" },
  { label: "Saint Petersburg", value: "Saint Petersburg" },
  { label: "Novosibirsk Oblast", value: "Novosibirsk Oblast" },
  { label: "Krasnoyarsk Krai", value: "Krasnoyarsk Krai" },
  { label: "Krasnodar Krai", value: "Krasnodar Krai" },
  { label: "Nizhny Novgorod Oblast", value: "Nizhny Novgorod Oblast" },
  { label: "Yaroslavl Oblast", value: "Yaroslavl Oblast" },
  { label: "Chelyabinsk Oblast", value: "Chelyabinsk Oblast" },
  { label: "Khabarovsk Krai", value: "Khabarovsk Krai" },
  { label: "Buryatia", value: "Buryatia" },
  { label: "Ryazan Oblast", value: "Ryazan Oblast" },
  { label: "Magadan Oblast", value: "Magadan Oblast" },
  { label: "Tuva", value: "Tuva" },
  { label: "Smolensk Oblast", value: "Smolensk Oblast" },
  { label: "Arkhangelsk Oblast", value: "Arkhangelsk Oblast" },
  { label: "Altai Krai", value: "Altai Krai" },
  { label: "Karachay-Cherkessia", value: "Karachay-Cherkessia" },
  { label: "Lipetsk Oblast", value: "Lipetsk Oblast" },
  { label: "Tambov Oblast", value: "Tambov Oblast" },
  { label: "Leningrad Oblast", value: "Leningrad Oblast" },
  { label: "Kalmykia", value: "Kalmykia" },
  { label: "Moscow Oblast", value: "Moscow Oblast" },
  { label: "Oryol Oblast", value: "Oryol Oblast" },
  { label: "Belgorod Oblast", value: "Belgorod Oblast" },
  { label: "Kaliningrad Oblast", value: "Kaliningrad Oblast" },
  { label: "Voronezh Oblast", value: "Voronezh Oblast" },
  { label: "Rostov Oblast", value: "Rostov Oblast" },
  { label: "Stavropol Krai", value: "Stavropol Krai" },
  { label: "Perm Krai", value: "Perm Krai" },
  { label: "Altai Republic", value: "Altai Republic" },
  { label: "Bryansk Oblast", value: "Bryansk Oblast" },
  { label: "Mordovia", value: "Mordovia" },
  { label: "Bashkortostan", value: "Bashkortostan" },
  { label: "Kostroma Oblast", value: "Kostroma Oblast" },
  {
    label: "Khanty-Mansi Autonomous Okrug",
    value: "Khanty-Mansi Autonomous Okrug",
  },
  { label: "Udmurtia", value: "Udmurtia" },
  { label: "Tatarstan", value: "Tatarstan" },
  { label: "Tyumen Oblast", value: "Tyumen Oblast" },
  { label: "Ulyanovsk Oblast", value: "Ulyanovsk Oblast" },
  { label: "Samara Oblast", value: "Samara Oblast" },
  { label: "Ivanovo Oblast", value: "Ivanovo Oblast" },
  {
    label: "Yamalo-Nenets Autonomous Okrug",
    value: "Yamalo-Nenets Autonomous Okrug",
  },
  { label: "Kabardino-Balkaria", value: "Kabardino-Balkaria" },
  { label: "Primorsky Krai", value: "Primorsky Krai" },
  { label: "Penza Oblast", value: "Penza Oblast" },
  { label: "North Ossetia-Alania", value: "North Ossetia-Alania" },
  { label: "Murmansk Oblast", value: "Murmansk Oblast" },
  { label: "Omsk Oblast", value: "Omsk Oblast" },
  { label: "Kursk Oblast", value: "Kursk Oblast" },
  { label: "Tula Oblast", value: "Tula Oblast" },
  { label: "Tomsk Oblast", value: "Tomsk Oblast" },
  { label: "Khakassia", value: "Khakassia" },
  { label: "Kaluga Oblast", value: "Kaluga Oblast" },
  { label: "Amur Oblast", value: "Amur Oblast" },
  { label: "Novgorod Oblast", value: "Novgorod Oblast" },
  { label: "Chuvashia", value: "Chuvashia" },
  { label: "Vologda Oblast", value: "Vologda Oblast" },
  { label: "Nenets Autonomous Okrug", value: "Nenets Autonomous Okrug" },
  { label: "Kemerovo Oblast", value: "Kemerovo Oblast" },
  { label: "Orenburg Oblast", value: "Orenburg Oblast" },
  { label: "Irkutsk Oblast", value: "Irkutsk Oblast" },
  { label: "Kirov Oblast", value: "Kirov Oblast" },
  { label: "Vladimir Oblast", value: "Vladimir Oblast" },
  { label: "Chechnya", value: "Chechnya" },
  { label: "Zabaykalsky Krai", value: "Zabaykalsky Krai" },
];

export const SwedenRegionOptions = [
  { label: "Uppland", value: "Uppland" },
  { label: "Skane", value: "Skane" },
  { label: "Vastergotland", value: "Vastergotland" },
  { label: "Narke", value: "Narke" },
  { label: "Vastmanland", value: "Vastmanland" },
  { label: "Smaland", value: "Smaland" },
  { label: "Vasterbotten", value: "Vasterbotten" },
  { label: "Orebro", value: "Orebro" },
  { label: "Angermanland", value: "Angermanland" },
  { label: "Bohuslan", value: "Bohuslan" },
  { label: "Jamtland", value: "Jamtland" },
  { label: "Blekinge", value: "Blekinge" },
  { label: "Sodermanland", value: "Sodermanland" },
  { label: "Medelpad", value: "Medelpad" },
  { label: "Ostergotland", value: "Ostergotland" },
  { label: "Gastrikland", value: "Gastrikland" },
  { label: "Dalarna", value: "Dalarna" },
  { label: "Norrbotten", value: "Norrbotten" },
  { label: "Lappland", value: "Lappland" },
  { label: "Harjedalen", value: "Harjedalen" },
  { label: "Varmland", value: "Varmland" },
  { label: "Halland", value: "Halland" },
  { label: "Oland", value: "Oland" },
  { label: "Halsingland", value: "Halsingland" },
  { label: "Gotland", value: "Gotland" },
  { label: "Dalsland", value: "Dalsland" },
];

export const CountryOptions = [
  { label: "Canada", value: "Canada" },
  { label: "Russia", value: "Russia" },
  { label: "Sweden", value: "Sweden" },
  { label: "USA", value: "USA" },
  { label: "None", value: "" },
  { label: "Australia", value: "Australia" },
  { label: "Belarus", value: "Belarus" },
  { label: "Brazil", value: "Brazil" },
  { label: "China", value: "China" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "England", value: "England" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "Greenland", value: "Greenland" },
  { label: "India", value: "India" },
  { label: "Japan", value: "Japan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Latvia", value: "Latvia" },
  { label: "Mexico", value: "Mexico" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "Norway", value: "Norway" },
  { label: "Peru", value: "Peru" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "South Africa", value: "South Africa" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Taiwan", value: "Taiwan" },
  { label: "UK", value: "UK" },
  { label: "Ukraine", value: "Ukraine" },
];

export const StarOptions = [
  { label: "Five", value: "5" },
  { label: "Four", value: "4" },
  { label: "Three", value: "3" },
  { label: "Two", value: "2" },
  { label: "One", value: "1" },
];

export const StatusOptions = [
  { label: "Not Ready", value: "Not Ready" },
  { label: "Hearing Offers", value: "Hearing Offers" },
  { label: "Narrowing Down Offers", value: "Narrowing Down Offers" },
  { label: "Finalizing Decisions", value: "Finalizing Decisions" },
  { label: "Ready to Sign", value: "Ready to Sign" },
  { label: "Signed", value: "Signed" },
];
