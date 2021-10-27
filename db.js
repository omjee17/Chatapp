const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true})

const db=mongoose.connection

db.on('error',
    (error)=>{console.error(error)
})
db.on('open',
    ()=>{console.log("Connected to Database")
})

