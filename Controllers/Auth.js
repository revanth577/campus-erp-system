const jwt=require("jsonwebtoken");
const {SECRET_KEY}=require("../secrets.js")
const principalModel=require("../models/prinicipalModel.js")
const hodModel=require("../models/hodModel.js")
const teacherModel=require("../models/teacherModel.js")

exports.isProtect=async (req,res,next)=>{
    
    
    
    try{
        console.log("protected")
        
        const token=req.cookies.token;
        const id=jwt.verify(token,SECRET_KEY);
        
        if(id)
        {
            
            req.id=id.id;
            next();
        }
        else{
            throw new Error("Your Not Authenticated");
        }
        
        
        
        
    }
    
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
    }

    
}

exports.isPrincipal=async(req,res,next)=>{
    
    
    try{
        
        const id=req.id;
        
        
        const isPrincipal=await principalModel.findById(id);
        if(isPrincipal)
        {
            req.principal=isPrincipal;
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Principal Scope")
        }
        
        
    }
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
        
    }
    
    
}



exports.isHod=async(req,res,next)=>{
     try{
        
        const id=req.id;
        
        
         const hodFound=await hodModel.findById(id);
        if(hodFound)
        {
            req.hod=hodFound;
            
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Principal Scope")
        }
        
        
    }
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
        
    }
    
    
}
exports.isTeacher=async(req,res,next)=>{
     try{
        
        const id=req.id;
        
        
         const teacherFound=await teacherModel.findById(id);
        if(teacherFound)
        {
            req.teacher=teacherFound;
            
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Principal Scope")
        }
        
        
    }
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
        
    }
    
    
    
    
}



