import { Router } from "express";
import { postRegister, postLogin } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/signup", postRegister);
authRouter.post("/signin", postLogin);

export default authRouter;