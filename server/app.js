import morgan from "morgan";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";

const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

export const app = express();
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/v1/users", userRouter);




// app.use('/api/v1/users', userRouter);
