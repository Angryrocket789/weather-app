const path = require("path");
const express = require("express");
const hbs = require("hbs");

console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;
// Setup paths for Express Config
app.set("view engine", "hbs");

// Setup handlebars engine and views location
app.use(express.static(path.join(__dirname, "../public")));

// Define paths for Express Config
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);
// -------------------------------//

const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Romal",
  });
});

app.get("", (req, res) => {
  res.send("Hello express!");
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Hello !@#",
    name: "Help!Help!Help!Help!Help!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Hello brooooo",
    name: "Romal B2",
  });
});

const request = require("request");
const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");
const chalk = require("chalk");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  // -------------------//
  geoCode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    if (data !== undefined) {
      const Location = data.Location;
      foreCast(data.Longitude, data.Latitude, (error, data) => {
        if (error) {
          return res.send({ error });
        }
        if (data !== undefined) {
          res.send({
            location: Location,
            foreCast: `It is currently ${
              data.temperature
            } degrees. There is a ${data.precipitation * 100}% chance of rain`,
          });
        }
      });

      // -------------------//
    }
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.com
// app.com/help
// app.com/about

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
  });
});

// This commands needs to come last
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "created by romal",
    error: "error: Page not found !",
  });
});

app.listen(port, () => {
  console.log(`Welcome Server is up on port ${port}`);
});
