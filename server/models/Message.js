import mongoose from "mongoose";

//stores entire chat btn sender and reciever with their id's 
const messageSchema = new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},//each msg will have senderId
    receiverId:{type:mongoose.Schema.Types.ObjectId, ref: "User", required:true},//each msg will have recieverId
    text:{type:String},//stores each and every msgs
    image:{type:String},//stores each and every images
    seen:{type:Boolean,default:false}//to track seen/unseen msgs
},{timestamps:true})

const Message = mongoose.model('User',messageSchema);

export default Message;