const express=require("express");

const router=express.Router();
const {signup,login,LoggedIn,getDisActiveHods,getAllHods,makeHodActive,deleteHod}=require("../Controllers/principalControllers.js")

const {isProtect,isPrincipal}=require("../Controllers/Auth.js")




router.route("/signup").post(signup);

router.route("/login").post(login);

router.get("/logout",(req,res)=>{
    
    try{
        
       
        res.clearCookie("token")
            res.status(201).json({
           status:"success",
           data:"Logout Successfull Principal"
       })
    }
    catch(err)
    {
        res.status(400).json({
            status:"failure",
            error:err.message
        })
    }
    
    
})

router.route("/loggedIn").get(LoggedIn)

router.route("/disactiveHods").get(isProtect,isPrincipal,getDisActiveHods)
router.route("/getAllHods").get(isProtect,isPrincipal,getAllHods)
router.route("/makeActive/:id").patch(isProtect,isPrincipal,makeHodActive)
router.route("/deleteHod/:id").delete(isProtect,isPrincipal,deleteHod)




module.exports=router;




