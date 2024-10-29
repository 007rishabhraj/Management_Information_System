import morgan from "morgan";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import helmet from 'helmet'

const corsOption = {
  origin: ["http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"]
};
export const app = express();
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use("*",cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api/v1/users", userRouter);

