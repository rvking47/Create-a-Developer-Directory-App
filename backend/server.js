import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import cors from "cors";
import router from "./routes/developerRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
ConnectDB();
const app = express();
const PORT = process.env.PORT || 7002;

app.use(express.json());
app.use(cors());

//deployment

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
});
