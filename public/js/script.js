let room
let roomList=document.getElementById("room")


// getting data from database i.e list of rooms
fetch('http://localhost:3000/api')
.then((data)=>{
  return data.json()
})
.then((data)=>{
    // appending all the rooms in list
    for(let i=0;i<data.length;i++)
    {
        let e=document.createElement("option")
        e.value=data[i].name
        e.innerText=data[i].name
        roomList.append(e)
    }
    
})
.catch((err)=>{
    console.error(err)
})

