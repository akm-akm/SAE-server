const cors = require("cors");
const express = require("express");
const app = new express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5005;
require(path.join(__dirname, "./model/mongoose"));
const messagesroute = require(path.join(__dirname, "./routes/messages"));
const blogroute = require(path.join(__dirname, "./routes/blog"));
const alumniroute = require(path.join(__dirname, "./routes/alumni"));
const post_bearerroute = require(path.join(__dirname, "./routes/post_bearer"));
const signuproute = require(path.join(__dirname, "./routes/signup"));
const loginroute = require(path.join(__dirname, "./routes/login"));
const logoutroute = require(path.join(__dirname, "./routes/logout"));

app
  .use(express.static(path.join(__dirname, "../client/build/")))
  .use(express.json())
  .use(cors())
  .use("/api", messagesroute)
  .use("/api", blogroute)
  .use("/api", alumniroute)
  .use("/api", post_bearerroute)
  .use("/api", signuproute)
  .use("/api", loginroute)
  .use("/api", logoutroute)
  .get("*", (_, res) => res.status(200).json({ message: "Welcome to the API" }))
  .listen(port, () => console.log("http://localhost:" + port));
