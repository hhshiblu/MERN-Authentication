const express=require("express")
const router=express.Router();
require("../dbs/connect")
const bcrypt=require("bcrypt")
const USER=require("../Model/userSchema")
const USERRG=require("../Model/uSchema")
const jwt =require("jsonwebtoken")
const {auth,isAdmin,getUser}=require("../Middleware/authencation")
const Task =require("../Model/TaskSchema")
router.get("/",auth,(req,res)=>{
    res.send("hello this is innitial router app ")
    console.log("hello")
})
// -------------------------------sign up-------------------------

router.post("/signup",async(req,res)=>{
       const{name,email,phone,work,password,cpassword}= req.body; 
       if(!name||!email||!phone||!work||!password||!cpassword){ 
       return res.json({massage:"please fill all field"})
       }
try{
  const userExiet=  await USER.findOne({email});
   if(userExiet){
    return res.status(422).json({error:"email already exiet"});
   }
   else if(password !=cpassword){
    return res.status(422).json({error:"password can not match"});
   }
   else{
    const user= new USER({name,email,phone,work,password,cpassword});
    await user.save();
     res.status(201).send("data save successful");
   }     
}
catch(err){ 
    console.log(err)
}   
})





router.post("/signin", async(req,res)=>{
    try{
        let token;
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({massage:"please fill all field"})
        }

        const userLogin= await USER.findOne({email})
        if(userLogin){
            const isMatch= await bcrypt.compare(password, userLogin.password)
            if(!isMatch){
                return res.status(400).json({massage:" invalid user"})
            }
            else{
             token = jwt.sign({userId:userLogin._id}, process.env.SEQURE_KEY, { expiresIn: '10m' });
            res.cookie(String(userLogin._id),token,{
               path:"/",
                expires:new Date(Date.now()+1000*600),
                httpOnly:true,
                sameSite:"lax"
               })
                return res.status(200).json({ token, massage: " user log in successfully" ,user:userLogin});
            }
        }
        else{
            return res.status(400).json({massage:" invalid user"})
        }
    }
    catch(err){
        console.log("Error while signing in:", err);
        return res.status(500).json({massage:"An error occurred while signing in"});
    }
})




//  ----------------------------------------prc registar----------------

router.get("/about", auth,getUser,(req,res)=>{
  res.send("hekllo")
})

// -----------------------------tasks-------------

router.get("/tasks/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      let tasks;
      if (!userId) {
        res.status(400).json({ error: "userId parameter is required" });
      } 
       else {
        tasks = await Task.find({ user: userId });
        res.json(tasks);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

  router.post("/tasks", async (req, res) => {
    const { title, description, user } = req.body;
  
    try {
      const newTask = new Task({ title, description, user });
      await newTask.save();
  
      res.status(201).json(newTask);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  

  router.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true }
      );
      res.json(task);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await Task.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });


  router.get("/admin",isAdmin ,(req,res)=>{
    res.json("hello my boy")
  })

// router.post("/register", async(req,res)=>{

//     const {name,email,password,cpassword}=req.body;

//     if(!name || !email || !password || !cpassword){
//         res.status(422).json({error:"please filed all field"})
//     }
// try{
//     const userExied= await USERRG.findOne({email});
//     if(userExied){
//         res.status(422).json({error:"user allready exied"})
//     }
//     else if(password != cpassword){
//         res.status(422).json({error:" password doesnot match"})
//     }
//     else{
//         const user= new USERRG({name,email,password,cpassword});
//         await user.save();

//         res.status(201).json({massage:"user reguster successfull"})
//     }

// }
// catch(err){
//     console.log(err)
// }

// // -------------------prac log in --------------------------------   


// router.post("/login", async (req,res)=>{

// const {email,password}=req.body;
// if(!email || !password){
//     res.status(422).json({error:"please field all field"})
// }
// try{
//     const userinfo= await USER.findOne({email});
//     if(userinfo){
    
//         const isMatchP= await bcrypt.compare(password ,userinfo.password)
//         if(!isMatchP){
//             res.status(422).json({error:"invalide users"})
//         }
//         else{
//             res.status(201).json({massage:"user log in successfull"})
//         }
//     }
//     else{
//         res.status(500).json({error:"invalide users"})
//     }

// }
// catch(err){
//     console.log(err)
// }

// })
   
// } )

module.exports=router;