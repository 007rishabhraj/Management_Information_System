import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import { app } from "./app.js";


dotenv.config({ path: "./config.env" });

//Const db connects to database using env file and creating it to be a environment variable //

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("connection sucessfull");
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Server running on ", port);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// handling unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION.   Shutting Down.....");
  server.close(() => {
    process.exit(1);
  });
});
