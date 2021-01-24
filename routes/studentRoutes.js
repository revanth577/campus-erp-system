const express=require("express");

const {signup,login,getAllNotes,getMeetingLinks,getSubjects}=require("../Controllers/studentControllers.js")
const {isProtect,isStudent}=require("../Controllers/Auth.js")

const router=express.Router();





router.route("/signup").post(signup);

router.route("/login").post(login);
router.route("/getAllNotes").get(isProtect,isStudent,getAllNotes);
router.route("/getMeetingLinks").get(isProtect,isStudent,getMeetingLinks);

router.route("/getSubjects").get(isProtect,isStudent,getSubjects);



// getMeetingLinks






module.exports=router;

