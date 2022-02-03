// const user = {
//   email: 'tetst@gmail.com',
//   room: '1'
// };

// const message = {
//   id: 1,
//   message: 'Hi',
//   room: 1
// };

class DB {
  constructor() {
    if(!DB.instance){
      this.userList = [];
      this.messageList = [];
      DB.instance = this;
    }

    return DB.instance;
  }

  addUser = (user) => {
    return this.userList.push(user);
  }

  findByUserId = (roomId) => {
     
     let users = this.userList.filter((user) => {
       console.log(user)
       return user.roomId === roomId;
     })

     console.log('Users : ', users);
     return users;
  }

  listUsers = () => {
    return this.userList;
  }

  isUserExistInRoom = (user) => {
    const userObj = this.userList.find(userObj => userObj.email === user.email && userObj.roomId === user.roomId);
    console.log('>>>', userObj,  userObj !== undefined ? userObj.length > 0 : false);
    return userObj !== undefined ? true : false;
  }

  //functions for messages//
  addMessege = (message) => {
    return this.messageList.push(message);
  }

  //display message.
  displayMesseges = () => {
    return this.messageList;
  }

  //findMessges
  findMessageByRoomID(roomId){
    console.log(this.messageList)
    let messages = this.messageList.filter((message) => {
        return message.roomId === roomId;
    })  

    return messages;
  }
}

const DBConnection = new DB();
Object.freeze(DBConnection);

module.exports = {DBConnection};