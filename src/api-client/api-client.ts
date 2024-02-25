import { MacroGame } from "macrogame/MacroGame";

const backendUrl =
  "https://nfum7buqpoyqn3visxvthctfa40zyhee.lambda-url.us-east-1.on.aws";

export async function login(username: string, password: string) {
  const response = await fetch(backendUrl + "/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }
  const responseJson = await response.json();
  return responseJson;
}

export async function signup(
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
}

export async function update(username: string, macrogame: MacroGame) {
  const response = await fetch(backendUrl + "/player", {
    method: "PUT",
    body: JSON.stringify({ username, macrogame }),
  });
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }
}
