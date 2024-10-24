import connectDB from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: './env'
});

let isConnected = false;

export default async (req, res) => {
    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
            console.log("⚙️   MongoDB connected!");
        } catch (err) {
            console.error("MONGO db connection failed !!! ", err);
            res.status(500).send("Database connection failed");
            return;
        }
    }
    
    return app(req, res);
};
