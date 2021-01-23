
const jwt=require("jsonwebtoken")
const principalModel=require("../models/prinicipalModel.js")
const hodModel=require("../models/hodModel.js")
const teacherModel=require("../models/teacherModel.js")
const sectionModel=require("../models/sectionModel.js")
const notesModel=require("../models/notesModel.js")
const date = require('date-and-time');

const {SECRET_KEY}=require("../secrets.js")


exports.signup=async(req,res)=>{
    
    try{
        
       
        const data=req.body;
        if(data.role)
        {
            data.role=undefined;
        }
        
        const collegeId=data.collegeId;
        
        const college=await principalModel.findOne({collegeId:collegeId});
        
        if(college&&data.password==data.confirmPassword)
        {
            const departments=await hodModel.find({collegeId:college._id})
            
            let department=false;
            let departId;
            
            for( d in departments)
            {
                if(departments[d].department==data.department_name)
                {
                    department=true;
                    departId=departments[d]._id;
                }
            }
            
            if(department)
            {
                data.department_name=undefined;   
                const teacher=new teacherModel(data);
                
                teacher.department=departId;
                teacher.collegeId=college._id;
                await teacher.save();
                
                res.status(201).json({
           status:"success",
           data:teacher
           
             })
            }
            else{
                throw new Error("No deparment Found");
            }
            
            
        }
        else{
            throw new Error("College Not found or passwords are mismatch");
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




exports.login=async(req,res)=>{
    
    try{
        
        
        const {email,password}=req.body;
        
        
        const teacher=await teacherModel.findOne({email:email,password:password});
        console.log(teacher)
        if(teacher && teacher.active==true)
        {
            
            const token=jwt.sign({id:teacher._id},SECRET_KEY,{expiresIn:'2h'});
            
            res.cookie("token",token);
            
              res.status(201).json({
           status:"success",
           data:"login successfull Teacher"
           
             })
            
        }
        else{
            
            throw new Error("No Account Found or Make Your Account Active By Hod !")
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


exports.addNotes=async(req,res)=>{
    
    
    try{
        console.log("file inside")
        const path="/student/notes/"+req.file.filename;
        const data=req.body;
        const now = new Date();
        
        const teacher=req.teacher;
        const getAllSections=await sectionModel.find({department:teacher.department,year:data.year})
        let secId;
        
        
        for(key in getAllSections)
        {
            if(getAllSections[key].name==data.section_name)
            {
                secId=getAllSections[key]._id;
                
            }
        }
        
        if(secId)
        {
            const notes=new notesModel(data);
            notes.section=secId;
            notes.filename=path;
            notes.teacher=teacher._id;
         
            await notes.save();
            
              res.status(201).json({
           status:"success",
           data:notes
           
             })
            
            
        }
        else{
            throw new Error("No section Found to Add Notes")
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


exports.showteacherNotes=async(req,res)=>
{
    
    try{
        
        const teacherId=req.teacher._id;
        
        
        const getAllNotes=await notesModel.find({teacher:teacherId});
        
        
        
        res.status(201).json({
           status:"success",
           data:getAllNotes
           
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


exports.deleteNotes=async(req,res)=>{
    
    
    try{
        
        const notesId=req.params.id;
        console.log(notesId)
        await notesModel.deleteOne({_id:notesId});
        
        res.status(201).json({
           status:"success",
           data:"notes deleted Successfully"
           
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


exports.addSubject=async(req,res)=>{
    
    
    try{
        console.log(req.body);
        
        
    }
    catch(err)
    {
         res.status(400).json({
            status:"failure",
            error:err.message
        }) 
        
    }
}




