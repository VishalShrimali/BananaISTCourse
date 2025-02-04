import mongoose from "mongoose";
import { connectionDatabase } from "../config/DB.js";

connectionDatabase()

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  lessons: [
    {
      title: { type: String, required: true },
      videoUrl: { type: String, required: true },
      duration: { type: Number, required: true }, // in minutes
      content: { type: String }
    }
  ],
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

},{timestamps: true});


export const Course = mongoose.model('Course', courseSchema);
