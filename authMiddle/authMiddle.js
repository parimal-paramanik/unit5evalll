const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()


const authenticator=async(req,res,next)=>{
    try {
         const token=req.headers.authorization.split(' ')[1]
       
         if(!token){
            res.send({msg:"please login first"})
         }
         const IsValid= jwt.verify(token,process.env.tokenkey)
         
         req.body.role=IsValid.role
         if(!IsValid) return res.send({msg:"please login agin"}) 
         next()
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={authenticator}

