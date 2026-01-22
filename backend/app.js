import express from "express";
import { config } from "dotenv";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import cookieParser from "cookie-parser";
import { error } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./data/config.env",
});

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("_usr.jsr");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(error);
