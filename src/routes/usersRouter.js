import { Router } from "Router";
import { validateToken } from "../middlewares/validateToken.js";
import { getUser } from "../controllers/usersController.js";


const userRouter = Router();

userRouter.get("/users/me", validateToken, getUser );
userRouter.get("/ranking", getRanking);

export default userRouter;
