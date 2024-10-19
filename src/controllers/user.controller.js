import {asyncHandler} from "../utils/asyncHandler.js"
import {APIError} from "../utils/APIError.js"
import {APIResponse} from "../utils/APIResponse.js"
import { getWeatherData,extractWeatherParameters } from "../utils/weatherUtils.js"
import { WeatherInfo } from "../models/weatherInfo.model.js"



const getCitiesWeather = asyncHandler(async (req,res) => {
    let cityList = req.query.cities ? Array.isArray(req.query.cities) ? req.query.cities : [req.query.cities]
     : ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    
    const citiesData = []
    //console.log(cityList);
    
    for (const city of cityList) {
        const completeCityData = await getWeatherData(city);
        
        citiesData.push({name:city,data:extractWeatherParameters({weatherData:completeCityData})})
    }
    return res.
    status(201).
    json(new APIResponse(200,citiesData,"Data fetched successfully."))
})

const saveWeatherData = asyncHandler(async (req,res) => {
    const citiesData = req.body;
    
    if(!citiesData)
        throw new APIError(404,"Cities Data not provided.");

    const responseData = [];
    for(const city of citiesData){
        const weatherInfo = await WeatherInfo.create({
            CityName:city.name,
            Temperature:city.data.temp,
            Condition:city.data.main
        })
        if(!weatherInfo)
            throw new APIError(400,`Something went wrong while creating WeatherInfo for ${city}`)
        responseData.push(weatherInfo)
    }
    return res.
    status(201).
    json(new APIResponse(200,responseData,"Data saved successfully."))
})

export {getCitiesWeather,saveWeatherData}