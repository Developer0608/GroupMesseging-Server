const { DBConnection } = require('./lib/db');

const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const db = DBConnection;

io.on('connection', (socket) => {
  console.log('Call from client');
  socket.on('join-room', (user) => {
    if(!db.isUserExistInRoom(user)) {
      db.addUser(user);
    } 
    let roomId = user.roomId;  
    socket.join(roomId);
  });

  socket.on('get-users', (param) => {
    const users = db.findByUserId(param.roomId);
    io.to(param.roomId).emit('user-list', users);
    console.log('Users::', users);
  });

  socket.on('get-messages', (param) => {
    messages = db.findMessageByRoomID(param.roomId);
    console.log('Message:: ', messages);
    io.to(param.roomId).emit('message-list', messages);
  });

  socket.on('message-send', (data) => {
    console.log('Message recevied:: ' , data);
    db.addMessege(data);
    const roomId = data.roomId;
    io.to(roomId).emit('new-message', data);
  })

  // socket.emit('connection', null);

  socket.on('leave', () => {
    socket.leave(roomId);
  });

  // socket.on('disconnect', () => {
  //   console.log('User Disconnected.....')
  // });
});


server.listen(3500, () => console.log('Server Started at 3500'));  