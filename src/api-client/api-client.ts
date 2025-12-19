import { MacroGame } from "macrogame/MacroGame";

const backendUrl =
  "https://4xjvzgtjvrmmf6sw3yepjgxiay0uxalv.lambda-url.us-east-1.on.aws";

export async function loginOnBackend(username: string, password: string) {
  let sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
    sessionToken = "";
  }

  const response = await fetch(backendUrl + "/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { sessionToken: sessionToken },
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }

  sessionToken = response.headers.get("Sessiontoken");

  if (sessionToken) {
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("username", username);
  }

  const responseJson = await response.json();

  return responseJson;
}

export async function signupOnBackend(
  username: string,
  password: string,
  email: string
) {
  const response = await fetch(backendUrl + "/player", {
    method: "POST",
    body: JSON.stringify({ username, password, email }),
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }

  const sessionToken = response.headers.get("Sessiontoken");

  if (sessionToken) {
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("username", username);
  }
}

export async function updateOnBackend(username: string, macrogame: MacroGame) {
  let sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
    sessionToken = "";
  }

  macrogame.updatePlayerPortrait();

  const response = await fetch(backendUrl + "/player", {
    method: "PUT",
    body: JSON.stringify({ username, macrogame }),
    headers: { sessionToken: sessionToken },
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }
}

export interface LeaguePlayer {
  username: string;
  score: number;
  portrait: number; // The ID of the card model used as a player portrait
}

export async function getLeaguePlayersFromBackend(): Promise<LeaguePlayer[]> {
  const response = await fetch(backendUrl + "/league-players", {
    method: "GET",
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }

  const responseJson = await response.json();

  return responseJson;
}
