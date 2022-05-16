const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom, getAllUsers } = require('./users');


const app = express();
app.use(cors())
const router = require("./router")
const server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});
app.use(cors())
app.use(router);

const port = process.env.PORT || 2345

io.on('connect', (socket) => {
    console.log("User connected")
    socket.on('join', ({ name, room }, callback) => {
        //console.log("User Joined")
        //console.log(socket.id, "line 27")
      const { error, user } = addUser({ id: socket.id, name, room });
      //console.log(user)
  

      if(error) return callback(error);
  
      socket.join(user.room);

  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    


    socket.on('sendMessage', ({message, name}, callback) => {
      let n = name.toLowerCase();
      const user = getUser(n);
      console.log("name",n)
      


      //console.log(user)
      console.log(user)
    
      
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();


    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });






server.listen(port, () => console.log("Server started"))