const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const routeUsers = require("./app/route/users/user.route");
const routeBooks = require("./app/route/books/book.routes");
const dbConnect = require("./config/dbConnect");
const logger = require("./config/logger");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", routeUsers);
app.use("/books", routeBooks);

// defining a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to BookStore application."
  });
  logger.info(
    "Welcome to BookStore application."
  );
});

// listen for requests
const server=app.listen(4000, () => {
    console.log("Server is listening on port 4000.");
    logger.info("Server is listening on port 4000.");
    dbConnect;
});
module.exports=server;
