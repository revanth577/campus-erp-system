const mongoose=require("mongoose");

const sectionSchema=new mongoose.Schema({
    
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
    
},{
    timestamps:true
})


const sectionModel=mongoose.model("Section",sectionSchema);



module.exports=sectionModel;
