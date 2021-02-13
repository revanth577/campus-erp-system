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
        required:true,
        select:false
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
       default:"principle"
   },
    
},
{
    timestamps:true
})




const principalModel=mongoose.model("College",prinicipalSchema)


module.exports=principalModel;












