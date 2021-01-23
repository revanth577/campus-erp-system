const mongoose=require("mongoose");



const teacherSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
    ref:'College'
        
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
    ref:'Hod'
        
    },
    role:{
        type:String,
        default:"teacher"
    },
    active:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})


const teacherModel=mongoose.model("Teacher",teacherSchema);



module.exports=teacherModel;