import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken"
import { ErrorHandler } from "../middlewares/error.js";

export const register= async (req,res,next)=>{
    try {
        const {name,email,password}= req.body;
    
        let user= await User.findOne({email});

        if(user) return next(new ErrorHandler("User Already Exists",400));
        else {
            const hashedPassword= await bcrypt.hash(password,10);

            user= await User.create({name,email,password: hashedPassword});
            sendCookie(user,res,"Successfully Registered",201);
    }
        
    } catch (error) {
        next(error);
    }
}


export const login= async(req,res,next)=>{
    try {
        const{ email,password }= req.body;

        const user=await User.findOne({email}).select("+password");

        if(!user) return next(new ErrorHandler("Invalid Username or Not Registered",400));

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch) return next(new ErrorHandler("Invalid Password",400));

        sendCookie(user,res,`Welcome Back, ${user.name}`, 201);
    } catch (error) {
        next(error);
    }

}

export const getMyProfile= (req,res)=>{
    res.status(201).json({
        success: true,
        user: req.user,
    })
}

export const logout=(req,res)=> {
    res.status(201).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "DEVELOPEMENT"? "lax" : "none",
        secure: process.env.NODE_ENV==="DEVELOPEMENT"? false :true,
    }).json({
        success:true,
        message: `Logged Out Successfully, ${req.user.name}`
    })
}

