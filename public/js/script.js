let room=config.room

let roomList=document.getElementById("room")

for(let i=0;i<room.length;i++)
{
    let e=document.createElement("option")
    e.value=room[i]
    e.innerText=room[i]
    roomList.append(e)
}