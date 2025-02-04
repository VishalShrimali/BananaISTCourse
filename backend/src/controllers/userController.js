import { User } from "../models/user.models.js";

const userProfile = async (req, res) => {
    try{
         const  _id  = req.params.id;
          // Find user in a single query
        const user = await User.findById(_id);

        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
        }

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
};
const loginUser = async (req, res) => {
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
            return res.status(200).json({
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
    
};
const signUpUser = async (req, res) => {
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
};
const updateUser = async (req, res) => {
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
}
const removeUser = async (req, res) => {
    try{
        const  {id} = req.params;

        const userNew = await User.findOneAndDelete(id);
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
}

export {
    userProfile,
    loginUser,
    signUpUser,
    updateUser,
    removeUser
}