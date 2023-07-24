const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

// env config
dotenv.config();

// router import

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// mongo db connection
connectDB();

// rest object
const app = express();
app.use(express.json());
app.use(morgan("dev"));
// middlewares
app.use(
  cors({
    origin: ["https://bloggo-front.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// port

app.get("/", (req, res) => {
  res.json("Hello");
});

const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Server listening on ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white
  );
});
