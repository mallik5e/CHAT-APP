import User from "../models/User.js"
import Message from "../models/Message.js";

//Get all the available users for chating at leftside bar
export const getUsersForSidebar = async (req,res) => {
   try{
     const userId = req.user._id;
     const filteredUsers = await User.find({_id: {$ne:userId}}).select('-password');

     //count number of unseen messages
      const unseenMessages = {}
      const promises = filteredUsers.map(async(user)=>{
        const messages = await Message.find({senderId: user._id, receiverId:userId, seen:false})//get all the unseen message of this specific userId user.
        if(messages.length > 0){
            unseenMessages[user._id] = messages.length;//stores every userId unseen messages
        } 
    })
    await Promise.all(promises)
    res.json({success:true, users:filteredUsers, unseenMessages})
   }catch(error){
       console.log(error.message)
       res.json({success:false,message:error.message})
   }
}

//Get the messages of specific selected users
export const getMessages = async(req,res) => {
    try{
      const { id:selectedUserId } = req.params;//id of msg sender to my account
      const myId = req.user._id;//my account id to see sender msg

      const messages = await Message.find({//this will find all the messages happened btn sender and reciever
        $or: [
            {senderId: myId, receiverId: selectedUserId},//msg from sender(myself) to reciever
            {senderId: selectedUserId, receiverId: myId}//msg from reciever to sender(myself)
        ]
      })
      await Message.updateMany({senderId: selectedUserId, receiverId: myId},{seen:true})
      res.json({success:true,messages})
    }catch(error){
       console.log(error.message)
       res.json({success:false,message:error.message})
    }
}

//api to mark message as seen using message id
export const markMessageAsSeen = async() => {
   try{
     const {id} = req.params;//message id
     await Message.findByIdAndUpdate(id,{seen:true})//mark each msg seened when select[open] any receiver msg
     res.json({success:true})
   }catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
   }
}

