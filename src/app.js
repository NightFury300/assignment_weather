import express from "express";
import cors from "cors"
import path from "path" 
import * as cron from "node-cron"
import { rollUpWeatherData } from "./utils/weatherUtils.js";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.set("view engine","ejs");
app.set("views",path.resolve("./src/views"));

const job = cron.schedule('55 23 * * *',async () => {
    console.log("Rolling up data");
    const summary = await rollUpWeatherData()
    if(!summary)
        throw new Error("Something went wrong while data rolling up");
    
    console.log("Data rolled up successfully\n" + summary);
        
},{
    scheduled:true,
    timezone: "Asia/Kolkata"
})

//routes
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter)

export {app}