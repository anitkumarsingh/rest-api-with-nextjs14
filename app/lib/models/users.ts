import {Schema,model } from "mongoose";

const userSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"user"},
    avatar:{type:String,required:true,default:"https://i.pravatar.cc/300"}
},{timestamps:true})

const Users=model("User",userSchema);

export default Users;
