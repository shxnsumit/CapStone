import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const port = 8080;
import { readdirSync } from "fs";
const url = process.env.mongoURL;

if (url) {
  mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  console.error("Error: Missing mongoURL environment variable.");
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoDB connection error:"));
db.once("open", () => {
  console.log("connected to mongodb database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// app.use("/api", authRoutes)

const routeFiles = readdirSync("./routes");

routeFiles.forEach((file) => {
  import(`./routes/${file}`).then((module) => {
    app.use("/api", module.default);
  });
});
app.listen(port, () => {
  console.log(`the port is running at ${port}`);
});
