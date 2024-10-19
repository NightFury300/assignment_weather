import { APIError } from "./APIError.js";
import {WEATHER_API_URL} from "../constants.js"

const getWeatherData = async (cityName) => {
    const url = WEATHER_API_URL.replace("{city name}",cityName).replace("{API key}",process.env.WEATHER_API_KEY);
    const APIData = await fetch(url);

    if(!APIData)
        throw new APIError(400,`Couldn't fetch the API for City Name=${cityName}`)

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

export {getWeatherData,extractWeatherParameters}