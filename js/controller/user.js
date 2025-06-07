const users = [
    new User("Pieroxdz", "markinpiero005@gmail.com", "123456789"),
    new User("User1", "user1@gmail.com", "123456789"),
    new User("User2", "user2@gmail.com", "123456789"),
]

function getUsers() {
    return users;
}

function createUser(nickname, email, password) {
    //Usamos el constructo rde la clase User para crear un nuevo usuario
    const user = new User(nickname, email, password);
    users.push(user);
    return user;
}

function updateUser(i, nickname, email, password) {
    users[i].nickname = nickname;
    users[i].email = email;
    users[i].password = password;
}

function deleteUser(i) {
    users.splice(i, 1);
}