import express from "express";
import validation from "../helper/validation.js";
import { create, role, view } from "../controller/developerController.js";

const router = express.Router();

router.post("/create", validation, create);

router.get("/view", view);

router.get("/role", role);

export default router;