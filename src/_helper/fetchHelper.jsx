import {
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";

export const PostCall = async (url, dto) => {
  return await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(dto),
  });
};

export const GetCall = async (url) => {
  let response = await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      // 'Accept-Encoding': 'gzip'
    },
  });
  let json;
  if (response.ok) {
    json = await response.json();
  } else {
    alert("Http-Error", response.status);
  }
  return json;
};

export const GetActionCall = async (url) => {
  let response = await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "GET",
  });
  if (response.ok) {
    return response;
  } else {
    alert("HTTP-Error:", response.status);
    return false;
  }
};

export const GetLeagueAbbr = (league) => {
  if (league === SimCFB) return "cfb";
  if (league === SimNFL) return "nfl";
  if (league === SimCBB) return "cbb";
  if (league === SimNBA) return "nba";
  if (league === SimCHL) return "chl";
  if (league === SimPHL) return "phl";
  return "";
};
