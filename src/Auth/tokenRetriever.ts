const axios = require("axios");
require("dotenv").config();
const client_id = process.env.TWITCHAPP_CLIENT;
const client_secret = process.env.TWITCHAPP_SECRET;

export interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let currentAuthToken: AuthToken | null = null;

export async function getAuthToken(): Promise<AuthToken> {
  if (currentAuthToken && !isTokenExpired(currentAuthToken)) {
    return currentAuthToken;
  }
  console.log("retrieve new token");
  try {
    const response = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: client_id,
          client_secret: client_secret,
          grant_type: "client_credentials",
        },
      }
    );

    const authToken: AuthToken = {
      access_token: response.data.access_token,
      expires_in: Math.floor(Date.now() / 1000) + response.data.expires_in,
      token_type: response.data.token_type
    };
    currentAuthToken = authToken;
    console.log("currentAuthToken", currentAuthToken);
    return authToken;
  } catch (error: any) {
    console.error("Error retrieving auth token", error.response.data);
    throw error;
  }
}

export function isTokenExpired(token: AuthToken): boolean {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const expirationDate = token.expires_in; // Convert expiration timestamp to a Date object

  return currentTimeInSeconds >= expirationDate;
}
