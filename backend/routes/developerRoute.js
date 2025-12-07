import express from "express";
import { validation } from "../helper/validation.js";
import { create, distroy, role, single, update, view } from "../controller/developerController.js";
import authMiddlware from "../middleware/authMiddlware.js";
import multer from "multer";

const router = express.Router();
const uploades = multer({ dest: "uploads/" });

//CRUD Route Start

router.post("/create", authMiddlware, uploades.single("file"), validation, create);


router.get("/view", authMiddlware, view);

router.get("/single/:id", authMiddlware, single);

router.delete("/distroy/:id", authMiddlware, distroy);

router.put("/update/:id", authMiddlware, uploades.single("file"), validation, update);

//End

//Dropdown Roles 

router.get("/role", authMiddlware, role);

export default router;