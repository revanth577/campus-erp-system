const express=require("express");

const router=express.Router();
const {signup,login,addSection,getSections,deleteSection,disActiveAccounts,getAllTeachers,maketeacherActive}=require("../Controllers/hodControllers.js")
const {isProtect,isHod}=require("../Controllers/Auth.js")


router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/addSection").post(isProtect,isHod,addSection)

router.route("/getSections").get(isProtect,isHod,getSections)
router.route("/deleteSection/:id").delete(isProtect,isHod,deleteSection)
router.route("/allDisactiveAccounts").get(isProtect,isHod,disActiveAccounts)
router.route("/getAllTeachers").get(isProtect,isHod,getAllTeachers)
router.route("/maketeacherActive/:id").patch(isProtect,isHod,maketeacherActive)






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




