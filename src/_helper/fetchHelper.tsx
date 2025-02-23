import {
  League,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";

// 🔥 Custom Error for API Calls
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ✅ POST Request with Type Safety (Simplified)
export const PostCall = async <TRequest, TResponse>(
  url: string,
  dto: TRequest
): Promise<TResponse> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP Error: ${response.statusText}`);
    }

    const data = (await response.json()) as TResponse;
    return data;
  } catch (error) {
    console.error(`POST request failed for URL: ${url}`, error);
    throw error; // Rethrow to handle where the call is made
  }
};

// ✅ GET Request with JSON Response
export const GetCall = async <T,>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP Error: ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    console.error(`Fetch failed for URL: ${url}`, error);
    throw error; // Rethrow to handle the error where the call is made
  }
};

export const GetActionCall = async (url: string): Promise<Response | false> => {
  const response = await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: "GET",
  });

  if (!response.ok) {
    console.error("HTTP-Error:", response.status);
    return false;
  }

  return response;
};

export const GetLeagueAbbr = (league: League): string => {
  switch (league) {
    case SimCFB:
      return "cfb";
    case SimNFL:
      return "nfl";
    case SimCBB:
      return "cbb";
    case SimNBA:
      return "nba";
    case SimCHL:
      return "chl";
    case SimPHL:
      return "phl";
    default:
      return "";
  }
};
