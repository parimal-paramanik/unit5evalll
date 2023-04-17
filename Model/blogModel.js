const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:{type:String,required:true},
    type:{type:String,required:true},
    description:{type:String},
})

const blogModel=mongoose.model("blog",blogSchema)

module.exports={blogModel}