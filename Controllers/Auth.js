const jwt=require("jsonwebtoken");
const {SECRET_KEY}=require("../secrets.js")
const principalModel=require("../models/prinicipalModel.js")
const hodModel=require("../models/hodModel.js")
const teacherModel=require("../models/teacherModel.js")
const studentModel=require("../models/studentModel.js")

exports.isProtect=async (req,res,next)=>{
    
    
    
    try{
        console.log("protected")
        
        const token=req.headers.token;
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
        if(isPrincipal && isPrincipal.role=="principal")
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
        if(hodFound&&hodFound.role=="hod")
        {
            req.hod=hodFound;
            
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Hod Scope")
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
        if(teacherFound&& teacherFound.role=="teacher")
        {
            req.teacher=teacherFound;
            
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Teacher   Scope")
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



exports.isStudent=async(req,res,next)=>{
    
     try{
        
        const id=req.id;

         const studentFound=await studentModel.findById(id);
        if(studentFound)
        {
            req.student=studentFound;
            
            next();
        }
        else{
            throw new Error("Your Not Authorized to Access Student Scope")
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

