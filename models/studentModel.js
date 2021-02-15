const mongoose=require("mongoose");


const studentShcema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true,
     
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    department:{
        
     type: mongoose.Schema.Types.ObjectId,
    ref:'College'
        
    },
    year:{
        type:Number,
        required:true
    },
    section:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    },
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"student"
    }
    
    
})



const studentModel=mongoose.model("Student",studentShcema)



module.exports=studentModel;
