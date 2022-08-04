import { Router } from "express";
import { postRegister, postLogin } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/urls/shorten", autenticar, postRegister);
authRouter.post("/signin", postLogin);

export default authRouter;