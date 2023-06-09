const express=require("express")

const userRouter=express.Router()
userRouter.use(express.json())
const {userModel,BlackModel}=require("../Model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/signup",async(req,res)=>{
    try {
        const {email,name,password,role}=req.body
        const ExistUser=await userModel.findOne({email})
        if(ExistUser){
            return res.send("user is already registered")
        }
        bcrypt.hash(password,6,async(err,hash)=>{
            if(err){
                res.send({msg:err.message})
            }

            const user= new userModel({name,email,role,password:hash})
            await user.save()
            res.send("new user is registed succesfully")
        })
    } catch (error) {
        
    }
})

//login goes here
userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(error,result)=>{
                if(result){
                    const token=jwt.sign({username:user.name,userId:user._id,role:user.role},process.env.tokenkey, {expiresIn:"1m"})
                    const reftoken=jwt.sign({username:user.name,userId:user._id,role:user.role},process.env.refkey, {expiresIn:"3m"})
                    res.send({"msg":"login done","token":token,"reftoke":reftoken})
                }
            })
        }else{
            res.send({msg:"login first"})
        }
      
    } catch (error) {
         res.send({msg:error.message})
    }
})

userRouter.post("/refresh",async(req,res)=>{
    try {
         const token=req.headers.authorization.split(' ')[1]
         const BlacklistData=await BlackModel.findOne({token})
         if(!token || BlacklistData){
            res.send({msg:"please login first"})
         }else{
            jwt.verify(token,process.env.refkey,(err,decode)=>{
                if(err){
                    res.send({msg:"please login first"})
                }else{
                    const token=jwt.sign({userId:decode.userId},process.env.tokenkey,{expiresIn:"3m"})
                    res.send({msg:"login succes","token":token})
                }
            })
         }
    } catch (error) {
        res.send({msg:error.message})
    }
})
userRouter.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization.split(' ')[1]
        if(token){
            const revokePerson=new BlackModel({token})
            await revokePerson.save()
            res.send("logout is successfull")
        }
    } catch (error) {
        
    }
})
module.exports={userRouter}