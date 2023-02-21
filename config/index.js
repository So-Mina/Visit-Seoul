// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
const cookieParser = require("cookie-parser");

// Express session, to send back a cookie to the Client with a session id
const session = require('express-session')

// Store the session in the database
const MongoStore = require('connect-mongo')

// ℹ️ global package used to `normalize` paths amongst different operating systems
const path = require("path")

// Middleware configuration
module.exports = (app) => {
  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser());

  // Normalizes the path to the views folder
  app.set("views", path.join(__dirname, "..", "views"))
  // Sets the view engine to handlebars
  app.set("view engine", "hbs");
  // Handles access to the public folder
  app.use(express.static(path.join(__dirname, "..", "public")))


  app.use(session({
    secret: process.env.SESSION_SECRET || "shhh it's a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
  }))
};