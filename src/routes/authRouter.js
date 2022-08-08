import { Router } from "express";
import { postRegister, postLogin } from "../controllers/authController.js";
import { registerSchemaValidate } from "../middlewares/registerSchemaValidate.js"
import { loginSchemaValidate } from "../middlewares/loginSchemaValidate.js";

const authRouter = Router();

authRouter.post("/signup", registerSchemaValidate, postRegister);
authRouter.post("/signin", loginSchemaValidate, postLogin);

export default authRouter;