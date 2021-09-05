

const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const socket=io()

// get username and room for url

const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})

console.log(username,room);
// Join chatroom
socket.emit('joinRoom',{username,room})


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

// Output message to DOM
function outputMessage(message){

  const div=document.createElement('div')
  div.classList.add('message')
  div.innerHTML=`
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>
  `
// appending message to chat window
  document.querySelector('.chat-messages').appendChild(div)
}