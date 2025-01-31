import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        enum: ["student", "admin"],
        default: "student",
      }
},{timestamps: true})


// Hashing the password before saving
userSchema.pre("save", async function (next)  {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// JWT AUTH TOKEN GENERATOR
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
      { userId: this._id, email: this.email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
  );
  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await  bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);
