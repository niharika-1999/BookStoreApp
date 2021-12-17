/* *
 * @file            : server.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 16-12-2021
 **/
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const routeUsers = require("./app/route/users/user.route");
const routeBooks = require("./app/route/books/book.routes");
const routeCart = require("./app/route/cart/cart.route");
const routeCustomer = require("./app/route/customerDetails/details.route");
const routeOrder = require('./app/route/order/order.route');
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
app.use("/cart", routeCart);
app.use("/customer", routeCustomer);
app.use("/order", routeOrder);


// listen for requests
const server=app.listen(4000, () => {
    console.log("Server is listening on port 4000.");
    logger.info("Server is listening on port 4000.");
    dbConnect;
});
module.exports=server;
