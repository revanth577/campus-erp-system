const express=require("express");
const multer=require("multer");
const router=express.Router();
const {signup,login,addNotes,showteacherNotes,deleteNotes,addSubject}=require("../Controllers/teacherControllers.js")
const {isProtect,isTeacher}=require("../Controllers/Auth.js")
const path=require("path");

/*file Uploading


*/


const maxSize = 1 * 1000 * 2000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/student/notes/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" +req.teacher.name+ file.originalname)
  },
})


const uploadStorage = multer({ 
    
    storage: storage ,
    
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){ 
    
        
        const ext=file.originalname.split(".")[1];
        
        if(ext=="pdf" || ext=="docx" || ext=="txt")
        {
            return cb(null, true);
        }
        
        
      
        cb("Error: File upload only supports the "
                + "following filetypes - pdf/docx/txt" ); 
      } 
    
    
})

/*
Again Routes
*/

router.route("/signup").post(signup)
router.route("/login").post(login)

router.route("/addNotes").post(isProtect,isTeacher,uploadStorage.single("file"),addNotes)
router.route("/showteacherNotes").get(isProtect,isTeacher,showteacherNotes)
router.route("/deleteNotes/:id").delete(isProtect,isTeacher,deleteNotes)



/*

Subject ROutes

*/



router.route("/addSubject").post(isProtect,isTeacher,addSubject)

router.get("/logout",(req,res)=>{
    
    try{
        
       
        
            res.status(201).json({
           status:"success",
           data:"Logout Successfull hod"
       })
    }
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
    }
    
    
});



module.exports=router;




