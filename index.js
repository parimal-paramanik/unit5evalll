const express=require("express")
const app=express()
app.use(express.json())

const {connection}=require("./config/db")

app.get("/",(req,res)=>{
    res.send("everything is fine")
})
const port=process.env.PORT
app.listen(port,async()=>{
    try {
        await connection
  console.log("connected to mongodb")
    } catch (error) {
        console.log({msg:error.message})
    }
    console.log(`sever is awake at ${port}`)
})