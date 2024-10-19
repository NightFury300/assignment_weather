import mongoose, {Schema} from "mongoose";

const dailySummarySchema = new Schema({
    CityName:{
        type:String,
        required:true,
        index:true,
        lowercase:true
    },
    Date:{
        type:Date,
        required:true,
        index:true
    },
    AverageTemperature:{
        type:Number,
        required:true
    },
    MaximumTemperature:{
        type:Number,
        required:true
    },
    MinimumTemperature:{
        type:Number,
        required:true
    },
    DominantWeather:{
        type:String,
        required:true,
        lowercase:true
    },
    DominantConditionCount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

export const DailySummary = new mongoose.model("DailySummary",dailySummarySchema);