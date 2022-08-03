import { Router } from "express";
import { postRegister } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/signup", postRegister);


export default authRouter;