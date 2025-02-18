const mongoose= require('mongoose')

const taskSchema= new mongoose.Schema({
    title:{type:String, required: true},
    completed: { type: Boolean, default: false },
})
 const taskmodel= mongoose.model("Task",taskSchema)
 module.exports=taskmodel