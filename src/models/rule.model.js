import mongoose,{Schema} from "mongoose"

const ruleSchema = new Schema(
    {
    rule:{
        type:String,
        required:true
    },
    ast:{
        type:Object,
        required:true
    }
    },
    {
        timestamps:true
    }
)

export const Rule = new mongoose.model("Rule",ruleSchema)