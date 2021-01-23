const mongoose=require("mongoose")


const prinicipalSchema=new mongoose.Schema({
    
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
    collegeName:{
        type:String
    },
    
    collegeId:{
        type:String,
        unique:true
    },
   role:{
       type:String,
       default:"principal"
   },
    
},
{
    timestamps:true
})




const principalModel=mongoose.model("College",prinicipalSchema)


module.exports=principalModel;












