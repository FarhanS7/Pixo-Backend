const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const app = express();
require("dotenv").config();
const postRouter = require("./router/post/postRouter");
//!Connect to DB
connectDB();

//!PORT
const PORT = process.env.PORT || 5000;

//!MIDDLEWARE
app.use(express.json());
//!CORS MIDDLEWARE
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));

//!ROUTES
app.use("/api/v1", postRouter);

//!Not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on our server" });
});

//! Error handling middleware
app.use((err, req, res, next) => {
  //prepare the error message
  const message = err.message;
  const stack = err.stack;
  res.status(500).json({
    message,
    stack,
  });
});

//!Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
