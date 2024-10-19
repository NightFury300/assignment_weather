import { Router } from "express";
import { getCitiesWeather,saveWeatherData } from "../controllers/user.controller.js";
const router = Router()

router.route("/weather").get((req,res) => {
    res.render("index");
});
router.route("/get-weather-data").get(getCitiesWeather);
router.route("/save-weather-data").post(saveWeatherData);
export default router;