import express from "express"
import { register ,login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter=express.Router();

userRouter.post("/new",register);
userRouter.post("/login",login);
userRouter.get("/me",isAuthenticated,getMyProfile);
userRouter.get("/logout",isAuthenticated,logout);

export default userRouter