import { bbaUrl, fbaUrl, hckUrl } from "../_constants/urls";
import { GetCall, PostCall } from "../_helper/fetchHelper";

export const RequestService = {
  GetCFBRequests: async () => {
    return await GetCall(`${fbaUrl}requests/all`);
  },

  GetNFLRequests: async () => {
    return await GetCall(`${fbaUrl}nfl/requests/all/`);
  },

  ApproveCFBRequest: async (payload) => {
    let res = await fetch(url + "requests/approve/", {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        ID: payload.reqId,
        TeamID: payload.teamId,
        Username: payload.username,
        IsApproved: true,
      }),
    });
    return res;
  },

  ApproveNFLRequest: async (payload) => {
    return await PostCall(`${fbaUrl}nfl/requests/approve/`, payload);
  },

  AssignCFBTeam: async (payload) => {
    return await PostCall(`${fbaUrl}teams/assign/${payload.teamId}`, {
      TeamID: payload.TeamID,
      Username: payload.Username,
      IsApproved: true,
    });
  },

  CreateCFBTeamRequest: async (team, username) => {
    return await PostCall(`${fbaUrl}requests/create/`, {
      TeamID: team.id,
      Username: username,
      IsApproved: false,
    });
  },

  CreateCHLTeamRequest: async (team, username) => {
    return await PostCall(`${hckUrl}chl/requests/create`, {
      TeamID: team.ID,
      Username: username,
      IsApproved: false,
      IsActive: true,
    });
  },

  CreateNFLTeamRequest: async (dto) => {
    return await PostCall(`${fbaUrl}nfl/requests/create/`, dto);
  },

  CreatePHLTeamRequest: async (dto) => {
    return await PostCall(`${hckUrl}phl/requests/create`, dto);
  },

  RejectCFBRequest: async (payload) => {
    // DB Request
    let res = await fetch(url + "requests/reject/", {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        ID: payload.ID,
        TeamID: payload.ReqID,
        Username: payload.Username,
        IsApproved: true,
      }),
    });
    return res;
  },

  RejectNFLRequest: async (payload) => {
    // DB Request
    let res = await fetch(`${fbaUrl}nfl/requests/reject/`, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        ID: payload.ID,
        TeamID: payload.ReqID,
        Username: payload.Username,
        IsApproved: true,
      }),
    });
    return res;
  },

  RemoveUserFromCFBTeamRequest: async (teamID) => {
    let res = await fetch(`${fbaUrl}requests/remove/` + teamID, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    return res;
  },

  RemoveUserFromNFLTeamRequest: async (teamID) => {
    let res = await fetch(`${fbaUrl}nfl/requests/remove/` + teamID, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return res;
  },

  GetCBBTeamRequests: async () => {
    let res = await fetch(`${bbaUrl}requests/`, {
      headers: {},
    });

    let requests;
    if (res.ok) {
      requests = await res.json();
    } else {
      alert("HTTP-Error:", res.status);
    }

    return requests;
  },

  GetNBATeamRequests: async () => {
    return await GetCall(`${url}nba/requests/all/`);
  },

  CreateCBBTeamRequest: async (team, username) => {
    let postRequest = await fetch(url + "requests/createTeamRequest", {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        TeamID: team.teamId,
        Username: username,
        IsApproved: false,
      }),
    });

    return postRequest;
  },

  ApproveCBBRequest: async (payload) => {
    let res = await fetch(url + "requests/approveTeamRequest", {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(payload),
    });
    return res;
  },

  RejectCBBTeamRequest: async (payload) => {
    let res = await fetch(url + "requests/rejectTeamRequest", {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(payload),
    });
    return res;
  },

  RevokeUserFromCBBTeamRequest: async (teamId) => {
    let res = await fetch(url + "team/removeUserFromTeam/" + teamId, {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    return res;
  },

  CreateNBATeamRequest: async (dto) => {
    return await PostCall(`${url}nba/requests/create/`, dto);
  },

  ApproveNBARequest: async (dto) => {
    return await PostCall(`${url}nba/requests/approve/`, dto);
  },

  RejectNBARequest: async (dto) => {
    return await PostCall(`${url}nba/requests/reject/`, dto);
  },

  RevokeNBARequest: async (dto) => {
    return await PostCall(`${url}nba/requests/revoke/`, dto);
  },
};
