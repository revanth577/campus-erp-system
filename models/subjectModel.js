const mongoose=require("mongoose");


const subjectSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Hod'
    }
})


const subjectModel=mongoose.model("Subject",subjectSchema);



module.exports=subjectModel;