
const express=require('express')
const blogRoute=express.Router()
blogRoute.use(express.json())
const {blogModel}=require("../Model/blogModel")
const {authenticator}=require("../authMiddle/authMiddle")
const {AuthPower}=require("../authMiddle/authoriseMiddle")


//create a new post
blogRoute.post("/post",authenticator,async(req,res)=>{
   try {
    const {title,topic,media}=req.body
    const newPost= new blogModel(req.body)
    await newPost.save()
     res.send( newPost )
   } catch (error) {
      res.send({msg:error.message})
   }
    
})

// {
//   "title":"abcd",
//   "type":"abcd",
//   "description":"abcd"
   
//  }

// {
//   "name":"test2",
//   "password":"test2",
//   "email":"test2@gmail.com"
// }

//get all the posts
blogRoute.get("/read",authenticator,async(req,res)=>{

    try {
        const {title,topic,media}=req.body
        const allPosts= await blogModel.find()
         res.send(allPosts )
       } catch (error) {
          res.send({msg:error.message})
       }
})

//get a particular post by id 
blogRoute.get("/read/:id",authenticator,async(req,res)=>{
    try {
       const post= await blogModel.findOne({_id:req.params.id})
       res.send(post)
    } catch (error) {
      res.send({msg:error.message})
    }
  })

 
blogRoute.put("/update/:id",authenticator,AuthPower(["moderator","user"]),async(req,res)=>{
   
    try {
        const updatedPost= await blogModel.findByIdAndUpdate({_id:req.params.id},req.body)
         res.send("post updated successfully")
    } catch (error) {
        res.send({msg:error.message})
    }
})


blogRoute.delete("/delete/:id",authenticator,AuthPower(["moderator"]),async(req,res)=>{
   try {
    const deletepost= await blogModel.findByIdAndDelete({_id:req.params.id},req.body)
    res.send("post deleted")
   } catch (error) {
    res.send({msg:error.message})
   }
})

module.exports={
    blogRoute
}