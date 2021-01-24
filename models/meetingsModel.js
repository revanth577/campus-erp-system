const mongoose=require("mongoose");


const meetingSchema=new mongoose.Schema({
    meetingLink:{
        type:String,
        required:true
    },
     teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
        
    },
    
    section:{
         type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }
    
},
{timestamps:true}
)



const meetingModel=mongoose.model("Meeting",meetingSchema);


module.exports=meetingModel;