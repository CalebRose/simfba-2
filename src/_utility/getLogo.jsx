import { ISLLogos, logos } from "../_constants/logos";

export const getLogo = (team, isRetro) => {
  const logoObj = isRetro ? retro_logos : logos;
  switch (team) {
    case "USAF":
      return logoObj.Air_Force;
    case "AAMU":
      return logoObj.Alabama_AM;
    case "ACU":
      return logoObj.Abilene_Christian;
    case "AKRN":
      return logoObj.Akron_Zips;
    case "ALB":
      return logoObj.Albany;
    case "ALCN":
      return logoObj.Alcorn_State;
    case "ALST":
      return logoObj.Alabama_State;
    case "AMCC":
      return logoObj.Texas_AM_Corpus;
    case "AMER":
      return logoObj.American;
    case "APSU":
      return logoObj.Austin_Peay;
    case "BAMA":
      return logoObj.Alabama;
    case "APST":
      return logoObj.App_State;
    case "ZONA":
      return logoObj.Arizona;
    case "AZST":
      return logoObj.Arizona_State;
    case "ARK":
      return logoObj.Arkansas;
    case "ARST":
      return logoObj.Arkansas_State;
    case "ARMY":
      return logoObj.Army;
    case "AUB":
      return logoObj.Auburn;
    case "BALL":
      return logoObj.Ball_State;
    case "BAYL":
      return logoObj.Baylor;
    case "BOIS":
      return logoObj.Boise_State;
    case "BC":
      return logoObj.Boston_College;
    case "BCU":
      return logoObj.Bethune_Cookman;
    case "BEL":
      return logoObj.Belmont;
    case "BELL":
      return logoObj.Bellarmine;
    case "BGSU":
      return logoObj.Bowling_Green;
    case "BING":
      return logoObj.Binghamton;
    case "BRAD":
      return logoObj.Bradley;
    case "BRWN":
      return logoObj.Brown;
    case "BRY":
      return logoObj.Bryant;
    case "BU":
      return logoObj.Boston;
    case "BUFF":
      return logoObj.Buffalo;
    case "BUCK":
      return logoObj.Bucknell;
    case "BUT":
      return logoObj.Butler;
    case "BYU":
      return logoObj.BYU;
    case "CAL":
      return logoObj.California;
    case "CAMP":
      return logoObj.Campbell;
    case "CAN":
      return logoObj.Canisius;
    case "CARK":
      return logoObj.Central_Arkansas;
    case "CBU":
      return logoObj.California_Baptist;
    case "CCSU":
      return logoObj.Central_Connecticut;
    case "CMU":
      return logoObj.Central_Michigan;
    case "CHAM":
      return logoObj.Chaminade;
    case "CHSO":
      return logoObj.Charleston_Southern;
    case "CHST":
      return logoObj.Chicago_State;
    case "CHAR":
      return logoObj.Charlotte;
    case "CINC":
      return logoObj.Cincinnati;
    case "CIT":
      return logoObj.Citadel;
    case "CLEM":
      return logoObj.Clemson;
    case "CLEV":
      return logoObj.Cleveland_State;
    case "CCU":
      return logoObj.Coastal_Carolina;
    case "COFC":
      return logoObj.Charleston;
    case "COLG":
      return logoObj.Colgate;
    case "COLO":
      return logoObj.Colorado;
    case "COLU":
      return logoObj.Columbia;
    case "COPP":
      return logoObj.Coppin_State;
    case "COR":
      return logoObj.Cornell;
    case "CP":
      return logoObj.Cal_Poly;
    case "CSUB":
      return logoObj.Cal_State_Bakersfield;
    case "CSUF":
      return logoObj.Cal_State_Fullerton;
    case "CSUN":
      return logoObj.Cal_State_Northridge;
    case "CSU":
      return logoObj.Colorado_State;
    case "CREI":
      return logoObj.Creighton;
    case "DART":
      return logoObj.Dartmouth;
    case "DAV":
      return logoObj.Davidson;
    case "DAY":
      return logoObj.Dayton;
    case "DEL":
      return logoObj.Delaware;
    case "DETM":
      return logoObj.Detroit_Mercy;
    case "DREX":
      return logoObj.Drexel;
    case "DRKE":
      return logoObj.Drake;
    case "DSU":
      return logoObj.Delaware_State;
    case "DU":
      return logoObj.Denver;
    case "DUKE":
      return logoObj.Duke;
    case "DUQ":
      return logoObj.Duquesne;
    case "ECU":
      return logoObj.East_Carolina;
    case "EIU":
      return logoObj.Eastern_Illinois;
    case "EKU":
      return logoObj.Eastern_Kentucky;
    case "ELON":
      return logoObj.Elon;
    case "EMU":
      return logoObj.Eastern_Michigan;
    case "ETSU":
      return logoObj.ETSU;
    case "EWU":
      return logoObj.Eastern_Washington;
    case "FAIR":
      return logoObj.Fairfield;
    case "FAMU":
      return logoObj.FAMU;
    case "FDU":
      return logoObj.Fairleigh_Dickinson;
    case "FIU":
      return logoObj.FIU;
    case "FLA":
      return logoObj.Florida;
    case "FAU":
      return logoObj.Florida_Atlantic;
    case "FSU":
      return logoObj.Florida_State;
    case "FOR":
      return logoObj.Fordham;
    case "FRES":
      return logoObj.Fresno_State;
    case "FUR":
      return logoObj.Furman;
    case "GCU":
      return logoObj.Grand_Canyon;
    case "GMU":
      return logoObj.GeorgeMason;
    case "GRAM":
      return logoObj.Grambling_State;
    case "GW":
      return logoObj.GeorgeWashington;
    case "UGA":
      return logoObj.Georgia;
    case "GASO":
      return logoObj.Georgia_Southern;
    case "GAST":
      return logoObj.Georgia_State;
    case "GT":
      return logoObj.Georgia_Tech;
    case "GONZ":
      return logoObj.Gonzaga;
    case "HAMP":
      return logoObj.Hampton;
    case "HART":
      return logoObj.Hartford;
    case "HARV":
      return logoObj.Harvard;
    case "HAWI":
      return logoObj.Hawaii;
    case "HC":
      return logoObj.Holy_Cross;
    case "UHOU":
      return logoObj.Houston;
    case "HCU":
      return logoObj.Houston_Baptist;
    case "HOF":
      return logoObj.Hofstra;
    case "HOW":
      return logoObj.Howard;
    case "HP":
      return logoObj.High_Point;
    case "IDHO":
      return logoObj.Idaho;
    case "IDST":
      return logoObj.Idaho_State;
    case "ILLI":
      return logoObj.Illinois;
    case "ILST":
      return logoObj.Illinois_State;
    case "IND":
      return logoObj.Indiana;
    case "INST":
      return logoObj.Indiana_State;
    case "IONA":
      return logoObj.Iona;
    case "IOWA":
      return logoObj.Iowa;
    case "IAST":
      return logoObj.Iowa_State;
    case "IUPU":
      return logoObj.IUPUI;
    case "JMU":
      return logoObj.JMU;
    case "JXST":
      return logoObj.Jackson_State;
    case "JST":
      return logoObj.JacksonvilleState;
    case "KANS":
      return logoObj.Kansas;
    case "KCU":
      return logoObj.Kansas_City_U;
    case "KSST":
      return logoObj.Kansas_State;
    case "KENT":
      return logoObj.Kent_State;
    case "KNSW":
      return logoObj.KennesawState;
    case "UKEN":
      return logoObj.Kentucky;
    case "LAS":
      return logoObj.LaSalle;
    case "LAF":
      return logoObj.Lafayette;
    case "LAM":
      return logoObj.Lamar;
    case "LBSU":
      return logoObj.Long_Beach;
    case "LEH":
      return logoObj.LeHigh;
    case "LEM":
      return logoObj.Lemoyne;
    case "LIN":
      return logoObj.Lindenwood;
    case "LIP":
      return logoObj.Lipscomb;
    case "LIU":
      return logoObj.Long_Island;
    case "L-MD":
      return logoObj.Loyola_Maryland;
    case "LONG":
      return logoObj.Longwood;
    case "LR":
      return logoObj.Little_Rock;
    case "LU":
      return logoObj.Liberty;
    case "ULL":
      return logoObj.Louisiana;
    case "ULM":
      return logoObj.Louisiana_Monroe;
    case "LT":
      return logoObj.Louisiana_Tech;
    case "LOU":
      return logoObj.Louisville;
    case "LUC":
      return logoObj.LoyolaC;
    case "LMU":
      return logoObj.LoyolaM;
    case "LSU":
      return logoObj.LSU;
    case "MAN":
      return logoObj.Manhattan;
    case "MCN":
      return logoObj.McNeese_State;
    case "MARQ":
      return logoObj.Marquette;
    case "ME":
      return logoObj.Maine;
    case "MRSH":
      return logoObj.Marshall;
    case "MRCY":
      return logoObj.Mercyhurst;
    case "UMD":
      return logoObj.Maryland;
    case "MEMP":
      return logoObj.Memphis;
    case "MER":
      return logoObj.Mercer;
    case "MIAF":
      return logoObj.Miami;
    case "MIAO":
      return logoObj.Miami_OH;
    case "MICH":
      return logoObj.Michigan;
    case "MIST":
      return logoObj.Michigan_State;
    case "MILW":
      return logoObj.Milwaukee;
    case "MTSU":
      return logoObj.Middle_Tennessee;
    case "MINN":
      return logoObj.Minnesota;
    case "MSST":
      return logoObj.Mississippi_State;
    case "MIZZ":
      return logoObj.Missouri;
    case "MONM":
      return logoObj.Monmouth;
    case "MONT":
      return logoObj.Montana;
    case "MORE":
      return logoObj.Morehead;
    case "MORG":
      return logoObj.Morgan_State;
    case "MOST":
      return logoObj.Missouri_State;
    case "MRMK":
      return logoObj.Merrimack;
    case "MRST":
      return logoObj.Marist;
    case "MSM":
      return logoObj.Mount_St_Marys;
    case "MSVU":
      return logoObj.Mississippi_Valley;
    case "MTST":
      return logoObj.Montana_State;
    case "MUR":
      return logoObj.Murray_State;
    case "NAU":
      return logoObj.Northern_Arizona;
    case "NAVY":
      return logoObj.Navy;
    case "NCAT":
      return logoObj.North_Carolina_AT;
    case "NCCU":
      return logoObj.North_Carolina_Central;
    case "NCST":
      return logoObj.NC_State;
    case "NDSU":
      return logoObj.North_Dakota_State;
    case "NE":
      return logoObj.Northeastern;
    case "NEB":
      return logoObj.Nebraska;
    case "NEV":
      return logoObj.Nevada;
    case "NIA":
      return logoObj.Niagara;
    case "NICH":
      return logoObj.Nicholls_State;
    case "NJIT":
      return logoObj.NJIT;
    case "NKU":
      return logoObj.Northern_Kentucky;
    case "UNM":
      return logoObj.New_Mexico;
    case "NMSU":
      return logoObj.New_Mexico_State;
    case "UNC":
      return logoObj.North_Carolina;
    case "UNT":
      return logoObj.North_Texas;
    case "NIU":
      return logoObj.NIU;
    case "NORF":
      return logoObj.Norfolk_State;
    case "NW":
      return logoObj.Northwestern;
    case "NWST":
      return logoObj.Northwestern_State;
    case "ND":
      return logoObj.Notre_Dame;
    case "OAK":
      return logoObj.Oakland;
    case "OHIO":
      return logoObj.Ohio;
    case "OHST":
      return logoObj.Ohio_State;
    case "OKLA":
      return logoObj.Oklahoma;
    case "OKST":
      return logoObj.Oklahoma_State;
    case "ODU":
      return logoObj.Old_Dominion;
    case "MISS":
      return logoObj.Ole_Miss;
    case "OREG":
      return logoObj.Oregon;
    case "ORST":
      return logoObj.Oregon_State;
    case "ORU":
      return logoObj.Oral_Roberts;
    case "PAC":
      return logoObj.Pacific;
    case "PENN":
      return logoObj.Pennsylvania;
    case "PFW":
      return logoObj.Purdue_Fort_Wayne;
    case "PRE":
      return logoObj.Presbyterian_College;
    case "PNST":
      return logoObj.Penn_State;
    case "PEPP":
      return logoObj.Pepperdine;
    case "PITT":
      return logoObj.Pitt;
    case "PRIN":
      return logoObj.Princeton;
    case "PROV":
      return logoObj.Providence;
    case "PRST":
      return logoObj.Portland_State;
    case "PURD":
      return logoObj.Purdue;
    case "PV":
      return logoObj.Prairie_View;
    case "QUIN":
      return logoObj.Quinnipiac;
    case "QUOC":
      return logoObj.Queens;
    case "RAD":
      return logoObj.Radford;
    case "RGV":
      return logoObj.Rio_Grande_Valley;
    case "RID":
      return logoObj.Rider;
    case "RMU":
      return logoObj.Robert_Morris;
    case "URI":
      return logoObj.RhodeIsland;
    case "RICE":
      return logoObj.Rice;
    case "RICH":
      return logoObj.Richmond;
    case "RUTG":
      return logoObj.Rutgers;
    case "JOES":
      return logoObj.SaintJosephs;
    case "SLU":
      return logoObj.SaintLouis;
    case "SAM":
      return logoObj.Samford;
    case "SAMO":
      return logoObj.AmericanSamoa;
    case "SCST":
      return logoObj.South_Carolina_State;
    case "SDAK":
      return logoObj.South_Dakota;
    case "SDSU":
      return logoObj.San_Diego_State;
    case "SELA":
      return logoObj.Southeastern_Louisiana;
    case "SEMO":
      return logoObj.Southeast_Missouri;
    case "SF":
      return logoObj.SFDons;
    case "SFA":
      return logoObj.SFA;
    case "SFNY":
      return logoObj.St_Francis;
    case "SFPA":
      return logoObj.Saint_Francis;
    case "SHSU":
      return logoObj.SamHoustonState;
    case "SHU":
      return logoObj.Sacred_Heart;
    case "SIE":
      return logoObj.Siena;
    case "SIU":
      return logoObj.Southern_Illinois;
    case "SIUE":
      return logoObj.SIU_E;
    case "SJSU":
      return logoObj.San_Jose;
    case "SCU":
      return logoObj.SantaClara;
    case "HALL":
      return logoObj.SetonHall;
    case "SMU":
      return logoObj.SMU;
    case "SOU":
      return logoObj.Southern;
    case "SPU":
      return logoObj.Saint_Peters;
    case "USA":
      return logoObj.South_Alabama;
    case "SOCA":
      return logoObj.South_Carolina;
    case "SSU":
      return logoObj.Sacramento_State;
    case "USF":
      return logoObj.South_Florida;
    case "USM":
      return logoObj.Southern_Miss;
    case "SJU":
      return logoObj.StJohns;
    case "STAN":
      return logoObj.Stanford;
    case "STBK":
      return logoObj.Stony_Brook;
    case "STET":
      return logoObj.Stetson;
    case "STMN":
      return logoObj.St_Thomas;
    case "STO":
      return logoObj.Stonehill;
    case "SUU":
      return logoObj.Southern_Utah;
    case "CUSE":
      return logoObj.Syracuse;
    case "TAMC":
      return logoObj.Texas_AM_Commerce;
    case "TAR":
      return logoObj.Tarleton;
    case "TCU":
      return logoObj.TCU;
    case "TEMP":
      return logoObj.Temple;
    case "TENN":
      return logoObj.Tennessee;
    case "TNST":
      return logoObj.Tennessee_State;
    case "TNTC":
      return logoObj.Tennessee_Tech;
    case "TEX":
      return logoObj.Texas;
    case "TAMU":
      return logoObj.TAMU;
    case "TXST":
      return logoObj.Texas_State;
    case "TTU":
      return logoObj.Texas_Tech;
    case "TXSO":
      return logoObj.Texas_Southern;
    case "TLDO":
      return logoObj.Toledo;
    case "TOW":
      return logoObj.Towson;
    case "TROY":
      return logoObj.Troy;
    case "TLNE":
      return logoObj.Tulane;
    case "TULS":
      return logoObj.Tulsa;
    case "UAB":
      return logoObj.UAB;
    case "UAPB":
      return logoObj.Arkansas_Pine_Bluff;
    case "UCD":
      return logoObj.UC_Davis;
    case "UCR":
      return logoObj.UC_Riverside;
    case "UCSB":
      return logoObj.UC_Santa_Barbara;
    case "UIC":
      return logoObj.UIC;
    case "UIW":
      return logoObj.Incarnate_Word;
    case "UCF":
      return logoObj.UCF;
    case "UCLA":
      return logoObj.UCLA;
    case "CONN":
      return logoObj.Connecticut;
    case "MASS":
      return logoObj.UMASS;
    case "UMES":
      return logoObj.Maryland_East;
    case "UML":
      return logoObj.UMASS_Lowell;
    case "UNA":
      return logoObj.North_Alabama;
    case "UNCA":
      return logoObj.UNC_Asheville;
    case "UNCO":
      return logoObj.Northern_Colorado;
    case "UNCG":
      return logoObj.UNCG;
    case "UNCW":
      return logoObj.UNC_Wilmington;
    case "UND":
      return logoObj.North_Dakota;
    case "UNF":
      return logoObj.North_Florida;
    case "UNH":
      return logoObj.New_Hampshire;
    case "UNI":
      return logoObj.Northern_Iowa;
    case "UNO":
      return logoObj.New_Orleans;
    case "UOG":
      return logoObj.Guam;
    case "UWG":
      return logoObj.West_Georgia;
    case "UNLV":
      return logoObj.UNLV;
    case "UPST":
      return logoObj.USC_Upstate;
    case "USC":
      return logoObj.USC;
    case "USI":
      return logoObj.Southern_Indiana;
    case "UTA":
      return logoObj.UT_Arlington;
    case "UTC":
      return logoObj.Chattanooga;
    case "UTM":
      return logoObj.UT_Martin;
    case "UTU":
      return logoObj.Utah_Tech;
    case "UTEP":
      return logoObj.UTEP;
    case "UTSA":
      return logoObj.UTSA;
    case "UTAH":
      return logoObj.Utah;
    case "UTST":
      return logoObj.Utah_State;
    case "UV":
      return logoObj.Vermont;
    case "UVU":
      return logoObj.Utah_Valley;
    case "UWGB":
      return logoObj.Green_Bay;
    case "VAL":
      return logoObj.Valparaiso;
    case "VAND":
      return logoObj.Vanderbilt;
    case "VILL":
      return logoObj.Villanova;
    case "UVA":
      return logoObj.Virginia;
    case "VMI":
      return logoObj.VMI;
    case "VT":
      return logoObj.Virginia_Tech;
    case "WAG":
      return logoObj.Wagner;
    case "WAKE":
      return logoObj.Wake_Forest;
    case "WASH":
      return logoObj.Washington;
    case "WAST":
      return logoObj.Washington_State;
    case "WCU":
      return logoObj.Western_Carolina;
    case "WEB":
      return logoObj.Weber_State;
    case "WEBB":
      return logoObj.Gardner_Webb;
    case "WIN":
      return logoObj.Winthrop;
    case "WIU":
      return logoObj.Western_Illinois;
    case "W&M":
      return logoObj.William_and_Mary;
    case "WOF":
      return logoObj.Wofford;
    case "WRST":
      return logoObj.Wright_State;
    case "WVU":
      return logoObj.West_Virginia;
    case "WKU":
      return logoObj.Western_Kentucky;
    case "WMU":
      return logoObj.Western_Michigan;
    case "WISC":
      return logoObj.Wisconsin;
    case "WYOM":
      return logoObj.Wyoming;
    case "XAV":
      return logoObj.Xavier;
    case "YALE":
      return logoObj.Yale;
    case "YSU":
      return logoObj.Youngstown_State;
    case "UMBC":
      return logoObj.UMBC;
    case "WICH":
      return logoObj.Wichita_State;
    case "USD":
      return logoObj.U_San_Diego;
    case "UCSD":
      return logoObj.UC_San_Diego;
    case "SMC":
      return logoObj.St_Marys;
    case "VCU":
      return logoObj.VCU;
    case "GEOT":
      return logoObj.Georgetown;
    case "SBON":
      return logoObj.St_Bonaventure;
    case "UCI":
      return logoObj.UC_Irvine;
    case "SDST":
      return logoObj.South_Dakota_State;
    case "DPU":
      return logoObj.DePaul;
    case "FGCU":
      return logoObj.FGCU;
    case "JU":
      return logoObj.Jacksonville;
    case "UNOM":
      return logoObj.Nebraska_Omaha;
    case "PORT":
      return logoObj.Portland;
    case "SEAU":
      return logoObj.Seattle;
    case "EVAN":
      return logoObj.Evansville;
    case "Arizona Cardinals":
      return logoObj.ARI_Cardinals;
    case "Atlanta Hawks":
      return logoObj.ATL_Hawks;
    case "Atlanta Falcons":
      return logoObj.ATL_Falcons;
    case "Baltimore Ravens":
      return logoObj.BAL_Ravens;
    case "Boston Celtics":
      return logoObj.BOS_Celtics;
    case "Brooklyn Nets":
      return logoObj.BRK_Nets;
    case "Buffalo Bills":
      return logoObj.BUF_Bills;
    case "Carolina Panthers":
      return logoObj.CAR_Panthers;
    case "Cincinnati Bengals":
      return logoObj.CIN_Bengals;
    case "Cleveland Browns":
      return logoObj.CLE_Browns;
    case "Cleveland Cavaliers":
      return logoObj.CLE_Cavaliers;
    case "Charlotte Hornets":
      return logoObj.CHA_Hornets;
    case "Chicago Bulls":
      return logoObj.CHI_Bulls;
    case "Chicago Bears":
      return logoObj.CHI_Bears;
    case "Dallas Mavericks":
      return logoObj.DAL_Mavericks;
    case "Dallas Cowboys":
      return logoObj.DAL_Cowboys;
    case "Denver Nuggets":
      return logoObj.DEN_Nuggets;
    case "Denver Broncos":
      return logoObj.DEN_Broncos;
    case "Detroit Pistons":
      return logoObj.DET_Pistons;
    case "Detroit Lions":
      return logoObj.DET_Lions;
    case "Green Bay Packers":
      return logoObj.GB_Packers;
    case "Golden State Warriors":
      return logoObj.GS_Warriors;
    case "Houston Rockets":
      return logoObj.HOU_Rockets;
    case "Houston Texans":
      return logoObj.HOU_Texans;
    case "Indiana Pacers":
      return logoObj.IND_Pacers;
    case "Indianapolis Colts":
      return logoObj.IND_Colts;
    case "Jacksonville Jaguars":
      return logoObj.JAX_Jaguars;
    case "Kansas City Chiefs":
      return logoObj.KC_Chiefs;
    case "Las Vegas Raiders":
      return logoObj.LV_Raiders;
    case "Los Angeles Lakers":
      return logoObj.LA_Lakers;
    case "Los Angeles Clippers":
      return logoObj.LA_Clippers;
    case "Los Angeles Rams":
      return logoObj.LA_Rams;
    case "Los Angeles Chargers":
      return logoObj.LA_Chargers;
    case "Memphis Grizzlies":
      return logoObj.MEM_Grizzlies;
    case "Miami Heat":
      return logoObj.MIA_Heat;
    case "Miami Dolphins":
      return logoObj.MIA_Dolphins;
    case "Milwaukee Bucks":
      return logoObj.MIL_Bucks;
    case "Minnesota Timberwolves":
      return logoObj.MIN_Timberwolves;
    case "Minnesota Vikings":
      return logoObj.MN_Vikings;
    case "New England Patriots":
      return logoObj.NE_Patriots;
    case "New Orleans Pelicans":
      return logoObj.NO_Pelicans;
    case "New Orleans Saints":
      return logoObj.NO_Saints;
    case "New York Knicks":
      return logoObj.NY_Knicks;
    case "New York Giants":
      return logoObj.NY_Giants;
    case "New York Jets":
      return logoObj.NY_Jets;
    case "Orlando Magic":
      return logoObj.ORL_Magic;
    case "Oklahoma City Thunder":
      return logoObj.OKC_Thunder;
    case "Philadelphia 76ers":
      return logoObj.PHI_76ers;
    case "Philadelphia Eagles":
      return logoObj.PHI_Eagles;
    case "Phoenix Suns":
      return logoObj.PHO_Suns;
    case "Pittsburgh Steelers":
      return logoObj.PIT_Steelers;
    case "Portland Trailblazers":
      return logoObj.POR_Trailblazers;
    case "Sacramento Kings":
      return logoObj.SAC_Kings;
    case "San Antonio Spurs":
      return logoObj.SA_Spurs;
    case "San Diego Clippers":
      return logoObj.SD_Clippers;
    case "San Francisco 49ers":
      return logoObj.SF_49ers;
    case "Seattle Supersonics":
      return logoObj.SEA_Supersonics;
    case "Seattle Seahawks":
      return logoObj.SEA_Seahawks;
    case "Tampa Bay Buccaneers":
      return logoObj.TB_Buccaneers;
    case "Tennessee Titans":
      return logoObj.TEN_Titans;
    case "Toronto Raptors":
      return logoObj.TOR_Raptors;
    case "Utah Jazz":
      return logoObj.UTA_Jazz;
    case "Vancouver Sea Lions":
      return logoObj.VAN_Sealions;
    case "Washington Wizards":
      return logoObj.WAS_Wizards;
    case "Washington Commanders":
      return logoObj.WAS_Commies;
    case "Adelaide 36ers":
      return ISLLogos.Adelaide;
    case "ALBA Berlin":
      return ISLLogos.ALBA;
    case "Alvark Tokyo":
      return ISLLogos.Alvark;
    case "Anadolu Efes":
      return ISLLogos.Anadolu;
    case "Barangay Ginebra San Miguel":
      return ISLLogos.Barangay;
    case "Barcelona":
      return ISLLogos.Barcelona;
    case "Bayern Munich":
      return ISLLogos.Bayern;
    case "Beijing Ducks":
      return ISLLogos.BeijingDucks;
    case "Brisbane Bullets":
      return ISLLogos.Brisbane;
    case "Caledonia Gladiators":
    case "Caledonia":
      return ISLLogos.Caledonia;
    case "Cazoo Baskonia":
      return ISLLogos.CazooBaskonia;
    case "Crvena zvezda":
      return ISLLogos.CrvenaZvezda;
    case "Fenerbahce Beko":
      return ISLLogos.Fenerbache;
    case "Goyang Carrot Jumpers":
      return ISLLogos.Goyang;
    case "Guangdong Southern Tigers":
      return ISLLogos.Guandong;
    case "Guangzhou Loong Lions":
      return ISLLogos.Guangzhou;
    case "Hiroshima Dragonflies":
      return ISLLogos.Hiroshima;
    case "Jilin Northeast Tigers":
      return ISLLogos.Jilin;
    case "KK Partizan":
      return ISLLogos.KKPartizan;
    case "LDLC ASVEL":
      return ISLLogos.LDLC;
    case "London Lions":
    case "London":
      return ISLLogos.London;
    case "Maccabi Tel Aviv":
      return ISLLogos.Maccabi;
    case "Melbourne United":
      return ISLLogos.Melbourne;
    case "Nagoya Diamond Dolphins":
      return ISLLogos.Nagoya;
    case "New Zealand Breakers":
      return ISLLogos.NewZealand;
    case "Olimpia Milano":
      return ISLLogos.Olimpia;
    case "Olympiacos":
      return ISLLogos.Olympiacos;
    case "Panathinaikos":
      return ISLLogos.Panathinaikos;
    case "Perth Wildcats":
      return ISLLogos.Perth;
    case "Prometey":
      return ISLLogos.Prometey;
    case "Real Madrid":
      return ISLLogos.RealMadrid;
    case "Ryukyu Golden Kings":
      return ISLLogos.Ryuku;
    case "Seoul Samsung Thunders":
      return ISLLogos.Seoul;
    case "Shandong Hi-Speed Kirin":
      return ISLLogos.Shandong;
    case "Shanghai Sharks":
      return ISLLogos.Shanghai;
    case "Shenzhen Leopards":
      return ISLLogos.Shenzen;
    case "Taipei Fubon Braves":
      return ISLLogos.Taipei;
    case "VEF Riga":
      return ISLLogos.VEF;
    case "Virtus Bologna":
      return ISLLogos.Virtus;
    case "Zalgiris":
      return ISLLogos.Zalgiris;

    default:
      return logoObj.Unknown;
  }
};
