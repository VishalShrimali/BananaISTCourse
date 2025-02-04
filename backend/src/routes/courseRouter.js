import express from "express";
import jwt from "jsonwebtoken";
import {Course} from "../models/course.models.js";
import {courseAuth} from "../middleware/courseAuth.js";
import { addCourse, deleteCourse, updateCourse, viewCourse } from "../controllers/courseController.js";

const courseRoute = express.Router();

courseRoute.post('/add',  addCourse );

courseRoute.get('/view/:id', courseAuth, viewCourse );

courseRoute.put('/update/:id', courseAuth, updateCourse);

courseRoute.delete('/remove/:id', courseAuth, deleteCourse);


export { courseRoute }