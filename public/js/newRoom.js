// let password=prompt("Admin Password:")
// if(password!==config.password)
// {
//     // window.location="/public/newRoom.html"
// }
// else{
//     main()
// }


let room=config.room
let roomList=document.getElementById("roomList")
let newRoomBtn=document.getElementById("newRoomBtn")
let newRoomName=document.getElementById("newRoomName")

newRoomBtn.addEventListener('click',()=>{
    let newRoom=document.createElement("option")
    newRoom.value=newRoomName.value
    newRoom.innerText=newRoomName.value
    roomList.append(newRoom)
    config.add(newRoomName.value)
})

function showRooms(){
    
    
    for(let i=0;i<room.length;i++)
    {
        let e=document.createElement("option")
        e.value=room[i]
        e.innerText=room[i]
        roomList.append(e)
    }
   
}


showRooms()