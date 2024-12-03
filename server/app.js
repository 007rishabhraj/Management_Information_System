import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { userRouter } from "./routes/userRouter.js";


const corsOption = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
export const app = express();
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api/v1/users", userRouter);
