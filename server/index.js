import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
const app = express();

dotenv.config({ path:"./config.env" });
const port = process.env.PORT || 3000;


    await mongoose.connect(
      process.env.DB_URI.replace("<PASSWORD>", process.env.DB_PASSWORD)
    );
    console.log("connected to database");
  
app.listen(port, () => {
  console.log("Server running on ", port);
});
