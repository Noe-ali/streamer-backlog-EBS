const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

//Define your API endpoints here

app.listen(port, () => {
  console.log("Starting server...");
  console.log("Server running on port " + port);
  console.log("Press CTRL + C to quit");
  


  console.log("Client " + process.env.TWITCHAPP_CLIENT);
});
    