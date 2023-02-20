console.log("hello node");
const express = require("express");
const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

//try db connection
connectDb();

//for parsing req.body so using this middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
//middleware for handling error
// app.use(errorHandler);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
