const mongoose=require("mongoose")
 const bcript= require("bcrypt")
const userSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    }
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcript.hash(this.password ,12);
        this.cpassword= await bcript.hash(this.cpassword ,12);
    }
    next();
})


const USER=mongoose.model("USER",userSchema);
module.exports=USER;
