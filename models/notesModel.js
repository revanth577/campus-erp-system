const mongoose=require("mongoose");


const notesSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    filename:String,
    description:{
        type:String
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
        
    },
    year:{
        type:Number
    },
    Date:Date.now(),
    section:{
        
         type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    }

    
},{
    timestamps:true
})





const notesModel=mongoose.model("Notes",notesSchema)


module.exports=notesModel;