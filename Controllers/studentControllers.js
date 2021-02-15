const jwt=require("jsonwebtoken")
const principalModel=require("../models/prinicipalModel.js")
const hodModel=require("../models/hodModel.js")
const teacherModel=require("../models/teacherModel.js")
const sectionModel=require("../models/sectionModel.js")
const notesModel=require("../models/notesModel.js")
const subjectModel=require("../models/subjectModel.js")
const meetingModel=require("../models/meetingsModel.js")
const studentModel=require("../models/studentModel.js")
const {SECRET_KEY}=require("../secrets.js")



exports.signup=async(req,res)=>{
    
    try{
        const data=req.body;
        data.role=undefined
        
        const collegeId=data.collegeId;
        
        
        const emailExists=await studentModel.findOne({email:data.email})
        
        if(emailExists)
        {
            throw new Error("email already exists");
        }
        if(data.password!==data.confirmPassword)
        {
            throw new Error("passwords are mismatch")
        }
        const rollNoExists=await studentModel.findOne({rollno:data.rollno})
        if(rollNoExists)
        {
            throw new Error("Roll No exists")
        }
        
        
        const college=await principalModel.findOne({collegeId:collegeId});
        
        if(college)
        {
            const depName=data.department_name
            // console.log(depName)
            const allDep=await hodModel.find({collegeId:college._id});
            // console.log(allDep)
            
            for(key in allDep)
            {
                if(allDep[key].department==depName)
                {
                    console.log("found")
                    data.department_name=undefined;
                    const secName=data.section_name;
                    data.section_name=undefined;
                    const student=new studentModel(data);
                    student.department=allDep[key]._id;
                    
                    const sections=await sectionModel.find({year:data.year,department:allDep[key]._id});
                    
                    for(sKey in sections)
                    {
                        if(sections[sKey].name==secName)
                        {
                            student.section=sections[sKey]._id;
                            await student.save();
                            res.status(201).json({
                                status:"success",
                                data:student
                            })
                        }
                    }
                    
                    
                    
                }
            }
            throw new Error("section or department not found")
            
            // throw new Error("No department Found");
            
            
            
        }
        else{
            throw new Error("No College Found");
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
        console.log(req.body);
        const {rollno,password}=req.body;
        // console.log(rollno);
        // console.log(password);
        
        
    
        const studentFound=await studentModel.findOne({rollno:rollno,password:password});
      
        if(studentFound&&studentFound.active==true)
        {
            const token=jwt.sign({id:studentFound._id},SECRET_KEY,{expiresIn:'1h'});
            // console.log(SECRET_KEY)
            
            res.cookie("token",token,{httpOnly:true})
            
             res.status(201).json({
           status:"success",
           data:studentFound,
           token:token
       })
            
        }
        else{
            throw new Error("No Student Found or make active by Your department  teacher")
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



exports.getAllNotes=async(req,res)=>{
    
    try{
        
        const secId=req.student.section;
        
        const notes=await notesModel.find({section:secId})
        
           res.status(200).json({
           status:"success",
           data:notes
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



exports.getMeetingLinks=async(req,res)=>{
    
    try{
        
        const secId=req.student.section;
        
        const meetings=await meetingModel.find({section:secId})
        
           res.status(200).json({
           status:"success",
           data:meetings
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


exports.getSubjects=async(req,res)=>{
    
    try{
        
        const student=req.student;
        
        const subjects=await subjectModel.find({year:student.year,department:student.department})
        
        res.status(200).json({
           status:"success",
           data:subjects
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

