const { Server } = require('socket.io'); 

const io = new Server({ cors: "http://localhost:5001" });

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some(user => user.id === userId)) {
      onlineUsers.push({
        id: userId,
        socketId: socket.id,
      });
    } else {
      onlineUsers = onlineUsers.map((user) => {
        if(user.id === userId) {
          return {...user, socketId: socket.id}
        }
        return user;
      })
    }
    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("disconnection: ", socket.id);

    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log(onlineUsers);
  });
});

io.listen(5001);