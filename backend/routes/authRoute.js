import express from "express";
import { logIn, signUp } from "../controller/authController.js";
import { validationLogin, validationSingUp } from "../helper/validation.js";

const authRoute = express.Router();

authRoute.post("/signUp", validationSingUp, signUp);
authRoute.post("/logIn", validationLogin, logIn);

export default authRoute;