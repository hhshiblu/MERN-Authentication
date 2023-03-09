const jwt =require("jsonwebtoken")

const User =require("../Model/userSchema")
// const auth= async function(req,res,next){
//   const cookies=req.headers.cookie;
//   if (!cookies) {
//     return res.status(401).json({ message: "Authentication cookie missing" });
//   }

//   const token=cookies.split("=")[1];
    
//   if(!token){
//     return res.status(401).json({ message: "Authentication token missing" });
//   }
   
//   try{
//     const decoded= jwt.verify(token,process.env.SEQURE_KEY);
//     req.userId=decoded.userId;
//     next();
//   }
//   catch(err){
//     console.log(err);
//   }
// }


const auth = async function(req, res, next) {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(401).json({ message: "Authentication cookie missing" });
  }

  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SEQURE_KEY, { algorithms: ['HS256'] });
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      // invalid token
      return res.status(401).json({ message: "Invalid authentication token" });
    } else if (err instanceof jwt.TokenExpiredError) {
      // token expired
      return res.status(401).json({ message: "Authentication token expired" });
    } else {
      // other error
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}



const getUser=async(req,res,next)=>{
  const userId=req.userId;
 
  let user;
  try{
  //  user=await User.findById(userId,"-password,-cpassword")
 user = await User.findById(userId).select('-password -cpassword');

   if(!user){
    return res.status(401).json({massage:"user not found"})
   }
   return res.status(200).json({user})
  }catch(err){
    console.log(err);
  }
  next();
}


// Define the middleware function
const isAdmin = (req, res, next) => {
    // Check if the user is logged in
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: You need to log in.' });
    }
  
    // Get the user's role from the request object
    const userRole = req.user.role;
  
    // Check if the user is an admin
    if (userRole === 1) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: You are not an admin.' });
    }
  };
  
  // Export the middleware function
 
module.exports={auth,isAdmin,getUser };

//coo
