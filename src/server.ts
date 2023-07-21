const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
import { AuthToken, getAuthToken } from "./Auth/tokenRetriever";

//test connection

import apicalypse from "apicalypse";
const rawQueryString =
  "fields name, summary, rating, platforms.name, cover.url;";

//Define your API endpoints here

app.listen(port, async () => {
  console.log("Starting server...");
  console.log("Server running on port " + port);
  console.log("Press CTRL + C to quit");

  console.log("To test the connection, here's a sample request");
  console.log("Requesting auth token first ");
  const token: AuthToken = await getAuthToken();
  await searchZelda(token);
  await searchSpecificZelda(token);
});

async function searchZelda(token: AuthToken): Promise<void> {
  console.log("searching for zelda games");

  console.log("token is " + token.access_token);
  const response = await apicalypse({
    queryMethod: "body",
    method: "POST",
    headers: {
      accept: "application/json",
      "Client-ID": process.env.TWITCHAPP_CLIENT,
      Authorization: `Bearer ${token.access_token}`,
    },
  })
    .fields(["name", "summary", "summary", "platforms.name", "cover.url"])
    .where([
      'franchises.name = "The Legend of Zelda"',
      'themes.name !~ "Compilation"',
      'themes.name !~ "Anthology"',
    ])
    .request("https://api.igdb.com/v4/games");

  console.log(response.data);
}

async function searchSpecificZelda(token: AuthToken): Promise<void> {
  console.log("searching for Zelda Wind Waker");

  const response = await apicalypse({
    queryMethod: "body",
    method: "POST",
    headers: {
      accept: "application/json",
      "Client-ID": process.env.TWITCHAPP_CLIENT,
      Authorization: `Bearer ${token.access_token}`,
    },
  })
    .fields(["name", "summary", "summary", "platforms.name", "cover.url"])
    .where(["id = 1033"])
    .request("https://api.igdb.com/v4/games");

  console.log(response.data);
}
