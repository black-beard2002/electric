import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from  "cors";

import { connectDB } from "./config/db.js";

import appRoutes from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 
const __dirname = path.resolve();

//midlewares
app.use(express.json()); // auto transform body data to json format

app.use(cors());
app.use("/api", appRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});