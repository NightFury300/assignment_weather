import {WEATHER_API_URL} from "../constants.js"
import { DailySummary } from "../models/dailySummary.mode.js";
import { WeatherInfo } from "../models/weatherInfo.model.js";

const getWeatherData = async (cityName) => {
    const url = WEATHER_API_URL.replace("{city name}",cityName).replace("{API key}",process.env.WEATHER_API_KEY);
    const APIData = await fetch(url);

    if(!APIData)
        throw new Error(`Couldn't fetch the API for City Name=${cityName}`)

    const JSONData = await APIData.json();
    
    return JSONData;  
}

const extractWeatherParameters = ({paramsList = ['weather[0].main','main.temp','main.feels_like','dt'],weatherData}) => {
    const filteredData = {}
    
    paramsList.forEach(param => {
        const arr = param.split('.')
        filteredData[arr[arr.length-1]] = arr.reduce((acc,part) => {
            if(acc === undefined || acc === null)
                return undefined
            if (part.includes('[')) {
                const [key, index] = part.replace(']', '').split('[');
                return acc[key] ? acc[key][index] : undefined;
            }
            return acc[part];
        },weatherData)
    });
    //console.log(filteredData);
    
    return filteredData;
}

const rollUpWeatherData = async () => {

    const rollUpData = await WeatherInfo.aggregate([
        {
            $group: {
                _id: "$CityName",
                AverageTemp: { $avg: "$Temperature" },
                MaximumTemp: { $max: "$Temperature" },
                MinimumTemp: { $min: "$Temperature" },
                Conditions: { $push: { condition: "$Condition", count: { $sum: 1 } } } // Collect conditions
            }
        },
        {
            $unwind: "$Conditions"
        },
        {
            $group: {
                _id: { city: "$_id", condition: "$Conditions.condition" },
                count: { $sum: "$Conditions.count" },
                AverageTemp: { $first: "$AverageTemp" },
                MaximumTemp: { $first: "$MaximumTemp" },
                MinimumTemp: { $first: "$MinimumTemp" }
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $group: {
                _id: "$_id.city",
                DominantCondition: { $first: "$_id.condition" },
                DominantCount: { $first: "$count" },
                AverageTemp: { $first: "$AverageTemp" },
                MaximumTemp: { $first: "$MaximumTemp" },
                MinimumTemp: { $first: "$MinimumTemp" }
            }
        },
        {
            $project: {
                _id: 0,
                CityName: "$_id",
                DominantCondition: 1,
                DominantCount: 1,
                AverageTemp: 1,
                MaximumTemp: 1,
                MinimumTemp: 1
            }
        }
    ]);
    if(!rollUpData)
        throw new Error("Something went wrong during data roll up.")
    const dailySummary = await createDailySummary(rollUpData)
    if(!dailySummary)
        throw new Error("Something went wrong while creating daily summary.")
    await WeatherInfo.deleteMany({})
    return dailySummary;
}

const createDailySummary = async (rollUpData) => {
    if(!rollUpData)
        throw new Error("Data not provided")
    const summaryData = []
    for(const data of rollUpData){
        const dailySummary = await DailySummary.create({
            CityName:data.CityName,
            Date: new Date(),
            AverageTemperature:data.AverageTemp,
            MaximumTemperature:data.MaximumTemp,
            MinimumTemperature:data.MinimumTemp,
            DominantWeather:data.DominantCondition,
            DominantConditionCount:data.DominantCount
        })
        if(!dailySummary)
            throw new Error("Something went wrong while creating Daily Summary")
        summaryData.push(dailySummary);
    }
    return summaryData;
}

export {getWeatherData,extractWeatherParameters,rollUpWeatherData}