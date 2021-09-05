const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const formatMesaage=require('./utils/messages')

const app=express()
const port=3000
const server=http.createServer(app)
const io=socketio(server)
const BotName="Admin"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// set static fodler
app.use("/",express.static(path.join(__dirname,'public')))

// Run when client connects
io.on('connection',(socket)=>{

    // Welcome current user
    socket.emit('message',formatMesaage(BotName,'Welcome to ChatCord!!'))

    // Broadcast when a user connects
    socket.broadcast.emit('message',formatMesaage(BotName,'A user has joined has the chat'))
    // runs when client disconnect
    socket.on('disconnect',()=>{
        io.emit('message',formatMesaage(BotName,'A user has left the chat'))
    })

    // listen for chat message
    socket.on('chatMessage',(msg)=>{
        io.emit('message',formatMesaage('USER',msg))
    })

})

app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

server.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);   
})