/*
  You should not need to modify this file at all,
  although I'm sure there are ways to improve this!

  No need to know what's going on here. There are some
  sparse comments here and there if you're curious.
*/

// express is a backend Node framework
const express = require("express");
const favicon = require("serve-favicon");
/*
  path is one of Node's global objects (we call them modules in Node)
  No need to stress, but if you want to read mroe about it:
    https://nodejs.org/api/path.html
  */
const path = require("path");

// We are initializing express here
const app = express();

// Create a port
const port = process.env.PORT || 4000;

app.use(favicon(path.join(__dirname + "/public/favicon.ico")));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// The PORT that our server sits on
app.listen(port, function() {
  console.log("Sorting app listening on " + port + "!");
});
