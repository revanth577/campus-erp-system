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
    year:{
        type:Number
    },
   
    section:{
        
         type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    },
    Subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }
    
},
{timestamps:true}
)



const meetingModel=mongoose.model("Meeting",meetingSchema);


module.exports=meetingModel;