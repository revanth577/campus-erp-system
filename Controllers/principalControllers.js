
const jwt=require("jsonwebtoken")
const principalModel=require("../models/prinicipalModel.js")
const hodModel=require("../models/hodModel.js")
const {SECRET_KEY}=require("../secrets.js")

exports.signup=async(req,res)=>{
    
   try{
       
       const data=req.body;
       
       
       if(data.password==data.confirmPassword)
       {
       const newP=await principalModel.create(data);
       newP.password=undefined
       
       res.status(201).json({
           status:"success",
           data:newP
       })
       }
       else{
           throw new Error("Passwords are mismatch");
       }
       
   }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
}



exports.login=async(req,res)=>{
    
    
    try{
        
        const {collegeId,password}=req.body;
        
        
        const principal=await principalModel.findOne({collegeId:collegeId});
        if(principal)
        {
            
            const token=jwt.sign({id:principal._id},SECRET_KEY,{expiresIn:'1h'});
            // console.log(SECRET_KEY)
            
            // res.cookie("token",token,{httpOnly:true})
            
             res.status(201).json({
           status:"success",
          
           token:token,
           data:principal
       })
            
        }
        else{
            
            throw new Error("No Collge Found");
        }
        
    }
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        })
        
        
    }
    
    
}


exports.LoggedIn=async(req,res)=>
{
    try{
        
        // console.log(req.cookies)
        
        res.status(200).json({
            status:"success",
            data:req.cookies
        })
        
        
    }
    catch(err)
    {
        
        res.status(400).json({
            status:"failure",
            error:err.message
        })
        
    }
    
}





exports.getDisActiveHods=async (req,res)=>{
    try{
        
        
        const pid=req.principal._id;
        
        const getAll=await hodModel.find({collegeId:pid,active:false});
        
        
        res.status(200).json({
            status:"success",
            data:getAll
        })
        
        
        
        
    }
    
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
}


exports.getAllHods=async(req,res)=>{
    
    try{
        
        
        const pid=req.principal._id;
        
        const getAll=await hodModel.find({collegeId:pid});
        
        
        res.status(200).json({
            status:"success",
            data:getAll
        })
        
        
        
        
    }
    
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
    
}


exports.makeHodActive=async(req,res)=>{
    
    
    try{
        
        
        const pid=req.principal._id;
        const hid=req.params.id;
        
        // console.log(hid);
        const hod=await hodModel.findById(hid);
        
        if(hid)
        {
            hod.active=true;
            await hod.save({validateBeforeSave:false});
            res.status(200).json({
            status:"success",
            data:hod
        })
        
            
        }
        else{
            throw new Error("No Hod Found");
        }
        
        
        
 
    }
    
    catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
    

}



exports.deleteHod=async(req,res)=>{
    
    
    try{
        
        const id=req.params.id;
        
        
        await hodModel.deleteOne({_id:id});
        
        
        res.status(201).json({
            status:"success",
            data:"deleted Successfully"
        })
        
        
    }
    
    catch(err)
    {
        
        
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
    
    
}
