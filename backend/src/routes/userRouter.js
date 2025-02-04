import express from "express";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { userAuth } from "../middleware/userAuth.js";
import { loginUser, removeUser, signUpUser, updateUser, userProfile } from "../controllers/userController.js";
const userRouter = express.Router();


userRouter.get('/profile/:id', userAuth, userProfile );

userRouter.post('/login',loginUser );

userRouter.post('/signup', signUpUser );

userRouter.put('/update/:id', updateUser);

userRouter.delete('/delete/:id', userAuth, removeUser);

export { userRouter };
