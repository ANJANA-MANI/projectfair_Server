//register
const users = require('../Models/userSchema');
const user=require('../Models/userSchema')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
console.log('inside register controller function');
const{username,email,password}=req.body
console.log(`${username},${email},${password}`);
try {
    
const existingUser=await user.findOne({email:email})
if(existingUser)
{
    res.status(406).json("user already exists please login!")
}
else{
    const newUser=new user({
        username,email,password,github:"",linkedin:"",profile:""
    })
    await newUser.save()
    res.status(200).json(newUser)
}
   } catch (err) {
    
    res.status(401).json(`Register API Failed,Error,:${err}`)
   }
  
}
//login
exports.login=async(req,res)=>{
    console.log('inside login controller function');
    const{email,password}=req.body
    console.log(`${email},${password}`);
    try {
    const existingUser=await user.findOne({email:email,password:password})
    if(existingUser)
    {
        const token=jwt.sign({userId:existingUser._id},"secret123")

        res.status(202).json({existingUser,token})
    }
    else{
        res.status(404).json("incorrect email or password !")
       } 
    }
    catch (err) {
        
        res.status(401).json(`Login API Failed !,err:${err}`)
       }
   
    }
    //update profile
exports.updateProfile=async(req,res)=>
{
    console.log('inside update controller');
        const id=req.payload
        const{github,linkedin,profile}=req.body
        console.log(id);
        const uploadImage=req.file?req.file.filename:profile
        try {
           const updateProfile=await users.findByIdAndUpdate({_id:id},{
            github,linkedin,profile:uploadImage},{new:true}
           )
    await updateProfile.save()
    res.status(200).json(updateProfile)
        } catch (err) {
            console.log(err);
            res.status(401).json(err)
        }
    }

    //get userdetails
     exports.userDetails=async(req,res)=>{
        console.log('inside user details function');
      console.log(req.payload);
        try {
        const User=await user.findOne({_id:req.payload})
        if(User)
        {
            res.status(200).json({User})
        }
        else{
            res.status(404).json("incorrect id")
           } 
        }
        catch (err) {
            
            res.status(401).json(`Login API Failed !,err:${err}`)
           }
       
        }