
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
        if(data.role)
        {
            data.role=undefined;
        }
        
        const collegeId=data.collegeId;
        
        const emailExists=await teacherModel.findOne({email:data.email})
        if(emailExists)
        {
            throw new Error("Email Exists")
        }
        
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
           data:"Please login"
           
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
        res.status(200).json({
            status:"failure",
            error:err.message
        })
    }
    
}




exports.login=async(req,res)=>{
    
    try{
        
        
        const {email,password}=req.body;
        
        
        const teacher=await teacherModel.findOne({email:email,password:password});
        
        if(teacher && teacher.active==true)
        {
            
            const token=jwt.sign({id:teacher._id},SECRET_KEY,{expiresIn:'2h'});
            
            // res.cookie("token",token);
            
              res.status(201).json({
           status:"success",
           token:token,
           data:teacher
           
           
             })
            
        }
        else{
            
            throw new Error("No Account Found or Make Your Account Active By Hod !")
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


exports.getSectionByTeacher=async(req,res)=>{
    
    
    try{
        console.log("get")
        const did=req.params.id;
        const year=parseInt(req.params.year);
        console.log(year)
        
        const allSections=await sectionModel.find({department:did,year:year});
        
        
        res.status(201).json({
           status:"success",
           data:allSections
           
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
        // console.log(notesId)
        
        const notes=await notesModel.findById(notesId);
        console.log(notes.teacher)
        console.log(req.teacher._id)
        const tid=String(req.teacher._id);
        const ntid=String(notes.teacher);
        
        if(tid===ntid)
        {
        await notesModel.deleteOne({_id:notesId});    
         res.status(201).json({
           status:"success",
           data:"notes deleted Successfully"
           
             })
        }else{
        
        
        res.status(500).json({
            status:"failure",
            error:"Your Not Authorized to delete it "
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


exports.addSubject=async(req,res)=>{
    
    
    try{
        
        const subjectFound=await subjectModel.findOne({name:req.body.name,year:req.body.year});
        
        const dId=req.teacher.department;
        
        if(subjectFound)
        {
            throw new Error("Already subject added");
        }
        

        const subject=new subjectModel(req.body);
        
        subject.department=dId;
        
        await subject.save();
        
        res.status(201).json({
           status:"success",
           data:subject
           
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


exports.getAllSubjectsYear=async(req,res)=>{
    
     try{
        
        const dId=req.teacher.department;
        const year=req.params.year;
        const all=await subjectModel.find({department:dId,year:year});
        
        res.status(200).json({
           status:"success",
           data:all
           
             })
        
    }catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        }) 
    }
    
    
}
exports.getAllSubjects=async(req,res)=>{
    
    try{
        
        const dId=req.teacher.department;
        
        const all=await subjectModel.find({department:dId});
        
        res.status(200).json({
           status:"success",
           data:all
           
             })
        
    }catch(err)
    {
        res.status(200).json({
            status:"failure",
            error:err.message
        }) 
    }
    
    
}

exports.deleteSubject=async(req,res)=>{
    
    try{
        
        const subId=req.params.id;
        
        const tId=req.teacher.department;
        const subject=await subjectModel.findById(subId);
        if(String(subject.department)==String(tId))
        {
            await subjectModel.deleteOne({_id:subId});    
         res.status(201).json({
           status:"success",
           data:"subject deleted Successfully"
           
             })
            
            
        }
        else{
            throw new Error("Your Not Authorized to delete it!!!");
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



exports.addMeeting=async(req,res)=>{
    
   try{
       
       
       const meeting=new meetingModel(req.body);
       meeting.teacher=req.teacher._id;
       meeting.section=req.params.secId;
       meeting.subject=req.params.mId;
      
      
      await meeting.save();
      
      res.status(201).json({
           status:"success",
           data:meeting
           
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

exports.getAllMeetingsByTeacher=async(req,res)=>{
    
    try{
        
        const tId=req.teacher._id;
        
        
        const all=await meetingModel.find({teacher:tId}).populate("teacher").populate("subject");
        
         res.status(201).json({
           status:"success",
           data:all
           
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


exports.deleteteacherLink=async(req,res)=>{
    
    try{
        
        const mId=req.params.id;
        
        const meeting=await meetingModel.findById(mId);
        
        if(String(meeting.teacher)==String(req.teacher._id))
        {
            await meetingModel.deleteOne({_id:mId});    
            
         res.status(201).json({
           status:"success",
           data:"meeting link deleted Successfully"
           
             })
            
        }
        else{
            throw new Error("Your not authorized to delete it");
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




exports.disactiveStudents=async(req,res)=>{
    
    try{
        const dId=req.teacher.department;
        const all=await studentModel.find({active:false,department:dId}).populate("section")
         res.status(200).json({
           status:"success",
           data:all
           
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



exports.getAllStudentsByDepartment=async(req,res)=>{
    
    
    try{
        
        const dId=req.teacher.department;
        
        
        const all=await studentModel.find({department:dId}).populate("section");
         res.status(200).json({
           status:"success",
           data:all
           
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

exports.makeStudentActive=async(req,res)=>{
    
    try{
        
        const sId=req.params.id;
        
        const student=await studentModel.findById(sId);
        
        if(student)
        {
            if(String(student.department)==String(req.teacher.department)){
                
                student.active=true
                await student.save({validateBeforeSave:false});
                
                res.status(200).json({
           status:"success",
           data:student
           
             })
            }
            else{
                throw new Error("Your Not Authorized To make active")
            }
            
        }
        else{
            throw new Error("No Stundet Found")
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




exports.deleteStudent=async(req,res)=>{
    
    
    try{
        
        const sId=req.params.id;
        
        const student=await studentModel.findById(sId);
        
        if(String(student.department)==String(req.teacher.department))
        {
            await studentModel.deleteOne({_id:sId});    
            
         res.status(201).json({
           status:"success",
           data:"student  deleted Successfully"
           
             })
            
        }
        else{
            throw new Error("Your not authorized to delete it");
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






