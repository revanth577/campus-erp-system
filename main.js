
const express=require("express");
const app=express();
const cookieParser = require('cookie-parser')
require("./db.js")
app.use(express.json());
app.use(cookieParser())


/*

**********************************PRINCIPAL ROUTES******************************

*/
const principalRoutes=require("./routes/principalRoutes.js")

app.use("/api/principal",principalRoutes)


/*

************************HOD ROUTES****************************

*/



const hodRoutes=require("./routes/hodRoutes.js")

app.use("/api/hod",hodRoutes)



/*

**********************************Teacher Routes*************************************
*/
const teacherRoutes=require("./routes/teacherRoutes.js")      

app.use("/api/teacher",teacherRoutes)




/*

************************************Student Routes************************************


*/

const studentRoutes=require("./routes/studentRoutes.js")      

app.use("/api/student",studentRoutes);


app.listen(3000,()=>{

console.log("server is running at",3000)
})

