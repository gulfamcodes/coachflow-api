import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,'Please provide name']
    },email:{
        type:String,
        required:[true,'Please provide email!'],
        unique:true
    },password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:8,
    }},
    // passwordConfirm:{
    //     type:String,
    //     required:[true,'Please confirm password'],
    //     minlength:8},
    //     },
    {timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;