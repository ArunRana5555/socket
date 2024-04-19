const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const app = express();
const port = 4500;
app.use(cors());
const server = http.createServer(app); // server created

const usersNew = [{}];

const io = socketIO(server); // circuit created

io.on('connection', (socket) => { // io is a completed circuit which has multiple user(socket)
  console.log('new connection');

  socket.on("joined", ({ user }) => {
    usersNew[socket.id] = user;
    console.log('user has joined')
    socket.emit("welcome", { user: 'admin', msg: `welcome to the chat ${usersNew[socket.id]} ` })
    socket.broadcast.emit("newUser", { user: "Admin", msg: `${usersNew[socket.id]} has joined` })
  })
  

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: usersNew[id], msg: message, id })
  })

  socket.on("disconnect",()=> {
    socket.broadcast.emit("leave", { user: "Admin", msg: ` ${usersNew[socket.id]} has left ` })
    console.log('user disconnected')
  })
})


server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
