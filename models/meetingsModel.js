const mongoose=require("mongoose");

const moment=require("moment")
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
    },
    date:{
        type:String,
        default:moment().format("MMMM Do YYYY, h:mm:ss a")
    },time:{
        type:String,
        required:true
    }
    
},
{timestamps:true}
)



const meetingModel=mongoose.model("Meeting",meetingSchema);


module.exports=meetingModel;