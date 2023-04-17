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
        const Isvalid=jwt.verify(token,process.env.tokenkey)
        req.body.role=Isvalid.role

        if(!Isvalid){
            return res.send({msg:"please login again"})
            next()
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
}

module.exports={
    authenticator
}