const express = require("express");
const app = express();
const cors = require("cors");
const body_parser = require("body-parser");
const mongooseUsername = "sabazarandia007";
const mongoosePass = "sabazara_009";
const mongooseConnect = `mongodb+srv://${mongooseUsername}:${mongoosePass}@cluster0.j8cgiws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const blogJS = require("./blog");
const companyTeamJS = require("./companyTeam");
const servicesJS = require("./services");
const homeJS = require("./home");
const aboutJS = require("./about");
const mongoose = require("mongoose");
app.use(cors());
app.use(body_parser.json());
app.use(express.json());
app.use(blogJS);
app.use(companyTeamJS);
app.use(servicesJS);
app.use(homeJS);
app.use(aboutJS);
mongoose
  .connect(mongooseConnect)
  .then(() => {
    console.log("successfully connected to mongoose");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
