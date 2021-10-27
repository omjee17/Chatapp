const route=require('express').Router()

// const room=require('../db')

route.get('/',(req,res)=>{
    console.log("Hello");
    res.send("Hello")
})


module.exports=route