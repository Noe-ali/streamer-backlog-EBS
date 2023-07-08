const express = require("express");
const app = express();
const port = 3000;

//Define your API endpo     ints here

app.listen(port, () => {
  console.log("Starting server...");
  console.log("Server running on port " + port);
  console.log("Press CTRL + C to quit");
});
    