import express from "express";
const app = express();
import dotenv from "dotenv";
import { userRouter } from "./src/routes/userRouter.js";
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/bananasit/users', userRouter)

const port  = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`\n Server is running on ${port}`);
})