import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectionDatabase } from "../config/DB.js";

connectionDatabase(); 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
    
      // Role Management
      role: {
        type: String,
        enum: ["student", "instructor"],
        default: "student",
      }
},{timestamps: true})


// Hashing the password before saving
userSchema.pre("save", async function (next)  {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await  bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);
