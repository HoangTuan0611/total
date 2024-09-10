import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import productRouter from './routes/productRouter.js'



// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoints
app.use("/api/food", productRouter)

app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

app.post("/login",(req,res)=>{
    console.log(req.body);
    res.send({success:true,username:"thanhphat",password:"123"})
})
//mongodb+srv://greatstack:33858627@cluster0.yoy4s.mongodb.net/?