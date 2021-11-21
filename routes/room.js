const route=require('express').Router()
const mongoose=require('mongoose')
const room=require('../db')

route.get('/',async (req,res)=>{
   
    room.find({})
    .then((data)=>{
        res.send((data))
    })
    .catch((err)=>{
        console.error(err)
    })
})

route.post('/',async (req,res)=>{

    room.create(req.body)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.error(err);
    })
    
})

route.delete('/:id',(req,res)=>{
   
    room.findOneAndDelete({id:req.params.id})
    .then((data)=>{
        res.send(data)
    })
})

module.exports=route