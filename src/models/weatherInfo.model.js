import mongoose, { Schema } from "mongoose";

const weatherInfoSchema = new Schema({
    CityName:{
        type:String,
        required:true,
        lowercase:true
    },
    Temperature:{
        type:Number,
        required:true
    },
    Condition:{
        type:String,
        required:true,
        lowercase:true
    }
},{
    timestamps:true
})

export const WeatherInfo = new mongoose.model("WeatherInfo",weatherInfoSchema);