function AdminUserServiceClient() {
  let registeredUsers = {};
  let idIndex = 0;

  var self = this;

  let deploy = true;
  this.url = 'http://localhost:8080/api/users';
  if(deploy){
    this.url = 'https://webd-chanmin-park-server-java.herokuapp.com/api/users'
  }

  this.createUser = function createUser(user, callback) {
    registeredUsers[idIndex] = user;
    idIndex++;

    $.ajax({
      type: 'POST',
      url: this.url,
      data: JSON.stringify({"username":user.username,
                            "password":user.password,
                            "firstName":user.firstName,
                            "lastName":user.lastName,
                            "role":user.role}),
      success: function(data) {console.log(data)},
      contentType: "application/json",
      dataType: 'json'
  });
  };
  this.findAllUsers = function findAllUsers(callback) {

    $.get(this.url, function (d) {
      console.log(d);
    })
    return registeredUsers;
  };
  this.findUserById = function findUserById(userId, callback) {
    return registeredUsers[userId];
  };
  this.deleteUser = function deleteUser(userId, callback) {
    $.ajax({
      url: this.url,
      type: 'DELETE',
      success: function (d) {
        console.log(d)
      }
    });

    delete registeredUsers[userId];
  };
  this.updateUser = function updateUser(userId, user, callback) {
    registeredUsers[userId] = user;
  };
}
