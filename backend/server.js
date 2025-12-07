import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import cors from "cors";
import router from "./routes/developerRoute.js";
//import path from "path";
//import { fileURLToPath } from "url";
import authRoute from "./routes/authRoute.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
ConnectDB();
const app = express();
const PORT = process.env.PORT || 7002;

app.use(express.json());
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//deployment
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//app.use(express.static(path.join(__dirname, "../frontend/dist")));

//app.get(/^\/(?!api).*/, (req, res) => {
  //  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
//});

app.get("/", (req, res) => {
    res.send("Backend server is running..");
})

app.use("/api", router);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
});
