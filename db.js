const mongoose=require('mongoose')

const db=mongoose.connection

const Schema=mongoose.Schema

const roomsSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})


mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true})


db.on('error',
    (error)=>{console.error(error)
})
db.on('open',
    ()=>{console.log("Connected to Database")
})

module.exports = mongoose.model('Rooms',roomsSchema)