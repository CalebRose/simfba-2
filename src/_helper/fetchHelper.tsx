import {
  League,
  SimCBB,
  SimCFB,
  SimCHL,
  SimNBA,
  SimNFL,
  SimPHL,
} from "../_constants/constants";

// ✅ Generic API Response Interface
export interface ApiResponse<T> {
  data: T;
  status: boolean;
  message?: string;
}

// 🔥 Custom Error for API Calls
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// ✅ POST Request with Type Safety
export const PostCall = async <TRequest, TResponse>(
  url: string,
  dto: TRequest
): Promise<ApiResponse<TResponse>> => {
  const response = await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error: ${response.statusText}`);
  }

  const data = (await response.json()) as TResponse;
  return {
    status: true,
    data,
  };
};

// ✅ GET Request with JSON Response
export const GetCall = async <T,>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `HTTP Error: ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  return {
    status: true,
    data,
  };
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
