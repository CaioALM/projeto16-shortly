import { Router } from "express";
import { postUrl, getShortUrl, getUrl, deleteUrl } from "../controllers/urlsController.js";
import { urlsSchemaValidate } from "../middlewares/urlsMiddleware.js";
import { validateToken }from "../middlewares/validateToken.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", urlsSchemaValidate, validateToken, postUrl);
urlsRouter.get("/urls/:id", getShortUrl);
urlsRouter.get("/urls/open/:shortUrl", getUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);    

export default authRouter;