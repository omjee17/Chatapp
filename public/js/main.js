const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')
let emojiBox=document.getElementById("emojiBox")
let typedMessage=document.getElementById('msg')
let sendBtn=document.getElementById('sendBtn')
let apiKey=config.apiKey



document.addEventListener('DOMContentLoaded',()=>{

  return fetch(`https://emoji-api.com/emojis?access_key=${apiKey}`)
  .then((data)=>{
    return data.json()
  })
  .then((res)=>{
    for(let i=0;i<res.length;i++)
    {
      let e=document.createElement('button')
      e.innerText=res[i].character
      e.addEventListener('click',()=>{
        typedMessage.value+=(e.innerText)
      })
      emojiBox.append(e)
    }

  })
  .catch((err)=>{
    console.error(err)
  })
  
})

const socket=io()

// get username and room for url
const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})

// console.log(username,room)


// Join chatroom
socket.emit('joinRoom',{username,room})

// get room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room)
  outputUsers(users)
})

// Message from server
socket.on('message',(message)=>{
  outputMessage(message)

  // scroll down after every msg
  chatMessages.scrollTop=chatMessages.scrollHeight

})

// message submit
chatForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  // get message text
  const msg=e.target.elements.msg.value
  // emit message to server
  socket.emit('chatMessage',msg)
  // clear input
  e.target.elements.msg.value=''
  e.target.elements.msg.focus()

})

sendBtn.addEventListener('click',(e)=>{
  
  // get message
  let msg=e.path[1][0].value
  // emit message to server
  socket.emit('chatMessage',msg)
  // clear input
  e.path[1][0].value=''
  e.path[1][0].focus()

})





// Output message to DOM
function outputMessage(message){

  const div=document.createElement('div')
  div.classList.add('message')
  if(message.username==='Admin')
  {
    div.innerHTML=`
      <p class="announcement">
      ${message.text}
      </p>
    `
  }
  else{
    div.innerHTML=`
      <p class="meta">${message.username} <span>${message.time}</span></p>
      <p class="text">
      ${message.text}
      </p>
    `
  }
// appending message to chat window
  document.querySelector('.chat-messages').appendChild(div)
}

// add room name to DOM
function outputRoomName(room) {
  roomName.innerText=room
}

// add users to DOM

function outputUsers(users) {
  userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
  `
}


// Emoji

let emojiBtn=document.getElementById("emojiBtn")
emojiBtn.addEventListener('click',()=>{

  if(emojiBox.style.display=='none')
  emojiBox.style.display='block'
  else 
  emojiBox.style.display='none'
})


