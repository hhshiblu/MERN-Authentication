const mongoose=require("mongoose")
const DB=process.env.DATABASE;

mongoose.set('strictQuery', true)
mongoose.connect(DB).then(()=>{
    console.log("database connect")
   
}).catch((err)=>console.log(err))
