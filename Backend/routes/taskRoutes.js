const express=require('express')
const taskmodel = require('../models/Task')
const taskrouter=express.Router()

taskrouter.get('/',async(req,res)=>{
    try{
    const tasks= await taskmodel.find()
    res.json(tasks);
    }catch(err){
        res.status(500).json({ error: "Server error" });
    }
})

taskrouter.post("/", async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: "Title is required" });
  
      const newTask = new taskmodel({ title });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

  taskrouter.put('/:id',async(req,res)=>{
    try{
        let id=req.params.id
        let data=await taskmodel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(data)
        if (!data) return res.status(404).json({ error: "Task not found" });
    }catch(err){
        res.status(500).json({error:"server error"})
    }
  })


  taskrouter.delete('/:id',async(req,res)=>{
    try{
    let id=req.params.id

    let data=await taskmodel.findByIdAndDelete(id)
    res.status(201).json({msg:"data deleted succesfully"})
    if (!data) return res.status(404).json({ error: "Task not found" });

    }catch(err){
        res.status(500).json({error:"server error"})
    }
  })
  module.exports=taskrouter