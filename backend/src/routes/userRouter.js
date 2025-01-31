import express from "express";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { userAuth } from "../middleware/userAuth.js";
const userRouter = express.Router();


userRouter.get('/profile/:id', userAuth, async (req, res) => {
    try{
         const  _id  = req.params.id;
          // Find user in a single query
        const userexist = await User.findById(_id);

        if (!userexist) {
            return res.status(401).json({ message: "User does not exist." });
        }
         const user = await User.findById(_id);
         res.status(201).json({
            message: "User Details",
            name: user.name,
            email: user.email
         })

    }
    catch(error){
            console.log("Error: ",error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
);


userRouter.post('/login', async (req, res) => {
    try{

        let { email, password } = req.body;

        if(!email || !password){
            res.status(401).json({ message: "Email and Password is required."});
        }
            const user = await User.findOne({ email});
            if(!user){
                res.status(401).json({message: "Invalid email."});
            }
            const isValidPassword = await user.comparePassword(password);
            if(!isValidPassword){
                res.status(401).json({message: "Invalid password."});
            }
    
            const token = user.generateAuthToken();
            res.status(200).json({
                message: "Login successful.",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
    }
    
    catch(error){
       console.log("Error: ", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
});

userRouter.post('/signup', async (req, res) => {
    try{
        const { email, name, password } = req.body;

        if(!email || !password || !name) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists." });
        };

        const user = await User.create({ email, name, password });
        res.status(201).json(
            {
                message: "User created successfully.",
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name 
                }
            }
        );
        
    }
    catch(error){
        console.log("Error: ",error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

        
    }
});

userRouter.put('/update/:id', async (req, res) => {
    try{
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists." });
        };

        if(!email || !password || !name) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }
        const userNew = await User.findOneAndUpdate({ email, name, password });
        res.status(201).json(
            {
                message: "User Updated successfully.",
                name: userNew.name
            }
        );
        
    }
    catch(error){
        console.log("Error: ",error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

        
    }
});


userRouter.delete('/delete', async (req, res) => {
    try{
        const { email, name, password } = req.body;

        const userNew = await User.findOneAndDelete({ email, name, password });
        res.status(201).json(
            {
                message: "User deleted successfully."
               
            }
        );
        
    }
    catch(error){
        console.log("Error: ",error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

        
    }
});




export { userRouter };
