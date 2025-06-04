require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { corsOptions } = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const { verifyJwt } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();
//custom logger middleware
app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));
//built in  middlewares
//handling formData we use urlencoded
app.use(express.urlencoded({ extended: false }));
//handling json data
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
//routes

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logout"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/register", require("./routes/api/register"));

//all below will verify JWT
app.use(verifyJwt);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));
app.all(/.+/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log("Sever running  at port:", PORT));
});
