const express=require('express')
const mongoose=require('mongoose');
const taskrouter = require('./routes/taskRoutes');
const logger = require('./middleware/logger');
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const uri=process.env.MONGO_URI
const port=process.env.port
console.log(uri)
console.log(port)
const errorHandler = require('./middleware/errorHandler');
const app=express()
app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/tasks", taskrouter);
app.use(errorHandler)

const connectDb= async ()=>{
    try{
  await  mongoose.connect('mongodb+srv://maheshwarisilvi98:silvi123@cluster0.jftpm.mongodb.net/books?retryWrites=true&w=majority')
  console.log('Database is connected')
    }catch(err){
        console.log(err)
    }
}

app.listen(3030,()=>{
    connectDb()
    console.log('server is connected')
})