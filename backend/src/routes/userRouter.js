import express from "express";
import { User } from "../models/user.models.js";
const userRouter = express.Router();

// Profile Management

// GET /api/profile - Get user profile.
// PUT /api/profile - Update user profile.
// DELETE /api/profile - Delete user account.
userRouter.get('/profile', async (req, res) => {

});
userRouter.put('/profile', async (req, res) => {
    
});
userRouter.delete('/profile', async (req, res) => {
    
});

// Authentication

// POST /api/signup - User registration.
// POST /api/login - User login.
// POST /api/logout - User logout.
// POST /api/refresh-token - Refresh access token (if using JWT).
// POST /api/forgot-password - Request password reset.
// POST /api/reset-password - Reset password using a token.
userRouter.post('/login', async (req, res) => {
    
});
userRouter.post('/signup', async (req, res) => {
    try{
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "User already exists." });
        };

        if(!email || !password || !name) {
            return res.status(400).json({ message: "All fields are mandatory." });
        }
        const user = await User.create({ email, name, password });
        res.status(201).json(
            {
                message: "User created successfully.",
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            }
        );
        
    }
    catch(error){
        console.log("Error: ",error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

        
    }
});
userRouter.post('/logout', async (req, res) => {
    
});
userRouter.post('/refresh-token', async (req, res) => {
    
});
userRouter.post('/forgot-password', async (req, res) => {
    
});
userRouter.post('/reset-password', async (req, res) => {
    
});

// Admin Specific routes

// GET /api/ - Get all users (admin only).
// GET /api/:id - Get user by ID (admin only).
// PUT /api/:id - Update user by ID (admin only).
// DELETE /api/:id - Delete user by ID (admin only).

userRouter.get('/', async (req, res) => {

});
userRouter.get('/:id', async (req, res) => {

});
userRouter.put('/:id', async (req, res) => {

});
userRouter.delete('/:id', async (req, res) => {

});

export { userRouter };
