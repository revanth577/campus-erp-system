const mongoose=require("mongoose");




mongoose.connect("mongodb://localhost:27017/campusselectionsystem",{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex: true})
.then(()=>{
    console.log("database connected");
})
.catch(err=>{
    console.log("error from db",err);
})



