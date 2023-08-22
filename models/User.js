import mongoose from "mongoose";

import { Schema, model, models } from "mongoose";


const UserSchema =  new Schema({
    username: {
        type:String,
        require:true
    },
email: {
    type:String,
    require:true
},

image:{
    type:String
},

upvote: {
    type: Array
}
},{timestamps:true})

mongoose.models = {};

export default mongoose.model("User", UserSchema);