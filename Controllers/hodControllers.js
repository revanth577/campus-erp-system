const jwt=require("jsonwebtoken")
const hodModel=require("../models/hodModel.js")
const collegeModel=require("../models/prinicipalModel.js")
const sectionModel=require("../models/sectionModel.js")
const teacherModel=require("../models/teacherModel.js")



const {SECRET_KEY}=require("../secrets.js")

exports.signup=async(req,res)=>{
    
    
    
    try{
        
        const data=req.body;
        if(data.role)
        {
            data.role=undefined;
        }
        const emailExists=await hodModel.findOne({email:data.email})
        if(emailExists)
        {
            throw new Error("email already exists")
        }
        
        const collegeId=data.collegeId;
        
        const collegeFound=await collegeModel.findOne({collegeId:collegeId});
        data.collegeId=undefined;
        if(collegeFound&&data.password==data.confirmPassword)
        {
            const departmentFound=await hodModel.findOne({department:data.department,collegeId:collegeFound._id});
            
            if(departmentFound)
            {
                throw new Error("already department exists..contact your principal to modify it...")
            }
            
            const newHod=new hodModel(data);
           
            newHod.collegeId=collegeFound._id;
            
            
            
            await newHod.save()
            
            
            res.status(201).json({
           status:"success",
           data:newHod
       })
        }
        else{
            throw new Error("No College Found or passwords mismatch")
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




exports.login=async (req,res)=>{
    
    
    try{
        
        const {email,password}=req.body;
        
        
        
        const hodFound=await hodModel.findOne({email:email,password:password});
        
        if(hodFound&&hodFound.active==true)
        {
            
             const token=jwt.sign({id:hodFound._id},SECRET_KEY,{expiresIn:'1h'});
            // console.log(SECRET_KEY)
            
            // res.cookie("token",token,{httpOnly:true})
            
             res.status(201).json({
           status:"success",
         
           token:token,
           data:hodFound
       })
        }
        else{
            throw new Error("Your Account Was Not Found ..please make active by pricnipal");
        }
        
        
        
    }
    catch(err){
        
        res.status(400).json({
            status:"failure",
            error:err.message
        })
    }
    
}




exports.addSection=async(req,res)=>{
    
    
    
    try{
        const dId=req.hod._id;
        
        const data=req.body;
        
        const sectionFound=await sectionModel.findOne({name:data.name,year:data.year});
        
        if(sectionFound)
        {
            throw new Error("section already available");
        }
        else{
            
            const section =new sectionModel(data);
            
            section.department=dId;
            
            await section.save();
            res.status(201).json({
           status:"success",
           data:section
       })
            
            
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



exports.getSections=async(req,res)=>{
    
    try{
        
        const dId=req.hod._id;
        
        
        
        const getSections=await sectionModel.find({department:dId});
        
        
        res.status(201).json({
           status:"success",
           data:getSections
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


exports.deleteSection=async(req,res)=>{
    
    try{
        
        const id=req.params.id;
        
        await sectionModel.deleteOne({_id:id});
        
        
        res.status(201).json({
           status:"success",
           data:"deleted succesfully"
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

exports.disActiveAccounts=async(req,res)=>{


try{
    
    const id=req.hod._id;
    
    const allDis=await teacherModel.find({department:id,active:false})
    
    res.status(201).json({
           status:"success",
           data:allDis
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



exports.getAllTeachers=async(req,res)=>{
    
  try{
    
    const id=req.hod._id;
    
    const allteachers=await teacherModel.find({department:id})
    
    res.status(201).json({
           status:"success",
           data:allteachers
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

exports.maketeacherActive=async(req,res)=>{
    
      try{
    
    const hid=req.hod._id;
    const id=req.params.id;
    
    const teacher=await teacherModel.findById(id);
    teacher.active=true;
    await teacher.save({validateBeforeSave:false});
    
    
    
    
    res.status(201).json({
           status:"success",
           data:teacher
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

