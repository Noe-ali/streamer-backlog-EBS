const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
import { getAuthToken } from "./Auth/tokenRetriever";

//test connection

import { Apicalypse } from "apicalypse";
const rawQueryString =
  "fields name, summary, rating, platforms.name, cover.url;";

//Define your API endpoints here

app.listen(port, async () => {
  console.log("Starting server...");
  console.log("Server running on port " + port);
  console.log("Press CTRL + C to quit");

  console.log("To test the connection, here's a sample request");
  console.log("Requesting auth token first ");
   await getAuthToken().then((token) => {
    console.log('retrieve same token')
     getAuthToken();
  });
});

// async function searchZelda(): Promise<void>{
//   try {
//     const igdbClient = new Apicalypse({
//       baseUrl: "https://api.igdb.com/v4",
//       headers: {
//         'Client-ID': process.env.TWITCHAPP_CLIENT,
//         'Authorization': `Bearer ${}`,
//       }

//     })
//   }
// }
