const express=require("express")


const AuthPower=(permittedRole)=>{
    return ((req,res,next)=>{
    const user_role=req.body.role
    console.log(user_role)
       if(permittedRole.includes(user_role)){
        next()
       }else{
        return res.send({msg:"you are not authorised for the action"})
       }
    })
}

module.exports={AuthPower}