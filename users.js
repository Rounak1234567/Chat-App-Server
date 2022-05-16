const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);
  //console.log(existingUser)

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser !== undefined) return { error: 'Username is taken.' };

  const user = { id, name, room };


  users.push(user);
  console.log("users", users)

  return { user };
}




const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}
 



const getAllUsers = ()=> {
  console.log("in users.js" , users);
  return users;
}

const getUser = (id) => {
  let n = id.toLowerCase()
  console.log(n,"in line 40")
  console.log("getUser-----------", users)
  console.log("line 41 in users.js",users.find((user) => user.name === n))
  return users.find((user) => user.name === id);
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getAllUsers };
