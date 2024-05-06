import { bbaUrl, fbaUrl } from "../_constants/urls";

export const AdminService = {
  GetCFBTimestamp: async () => {
    let json;
    let response = await fetch(`${fbaUrl}simfba/get/timestamp/`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      json = await response.json();
    } else {
      alert(
        "Could not get necessary season data.\nHTTP-Error:",
        response.status
      );
    }

    return json;
  },

  GetCBBTimestamp: async () => {
    let json;
    let response = await fetch(`${bbaUrl}simbba/get/timestamp/`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      json = await response.json();
    } else {
      alert(
        "Could not get necessary season data.\nHTTP-Error:",
        response.status
      );
    }

    return json;
  },
};
