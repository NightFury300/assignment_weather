import { Router } from "express";
import { getCitiesWeather,saveWeatherData } from "../controllers/user.controller.js";
import { APIResponse } from "../utils/APIResponse.js";
import { rollUpWeatherData } from "../utils/weatherUtils.js";
import { APIError } from "../utils/APIError.js";
const router = Router()

router.route("/weather").get((req,res) => {
    res.render("index");
});
router.route("/get-weather-data").get(getCitiesWeather);
router.route("/save-weather-data").post(saveWeatherData);
router.route("/roll-up-weather-data").get(async (req,res) => {
    if(req.query.key !== "rollwd123")
        res.status(400).json(new APIError(401,"Invalid Key"));
    
    console.log("Rolling up data");
    const summary = await rollUpWeatherData()
    if(!summary)
        throw new Error("Something went wrong while data rolling up");
    
    res.status(201).json(new APIResponse(200,summary,"Rolled Up Successfully."))
})
export default router;