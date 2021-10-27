const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const formatMesaage=require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/users')


const app=express()
const port=3000
const server=http.createServer(app)
const io=socketio(server)
const BotName="Admin"



app.use(express.json())
app.use(express.urlencoded({extended:true}))

// set static fodler
app.use("/",express.static(path.join(__dirname,'public')))
app.use("/api",require('./routes/room'))



// Run when client connects
io.on('connection',(socket)=>{

    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room)

        socket.join(user.room)
        
        // Welcome current user
    socket.emit('message',formatMesaage(BotName,'Welcome to ChatCord!!'))

    // Broadcast when a user connects
    socket.broadcast
    .to(user.room)
    .emit('message',
    formatMesaage(BotName,`${user.username} has joined has the chat`)
    )

    // Send user and room info
    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    })
    
})

   

    // listen for chat message
    socket.on('chatMessage',(msg)=>{
        const user=getCurrentUser(socket.id)

        io.to(user.room).emit('message',formatMesaage(user.username,msg))
    })

    // runs when client disconnect
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id)
        
        if(user){
            io.to(user.room).emit('message',formatMesaage(BotName,`${user.username} has left the chat`))
            // Send user and room info
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            })
        }

    })
})


server.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);   
})