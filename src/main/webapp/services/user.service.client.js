function AdminUserServiceClient() {
  var self = this;

  let deploy = false;
  this.url = 'http://localhost:8080/api/users';
  if (deploy) {
    this.url = 'https://webd-chanmin-park-server-java.herokuapp.com/api/users'
  }

  this.createUser = function createUser(user, callback) {
    $.ajax({
      type: 'POST',
      url: this.url,
      data: JSON.stringify({
        "username": user.username,
        "password": user.password,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "role": user.role
      }),
      success: function (data) { 
        callback();
        console.log(data);
      },
      contentType: "application/json",
      dataType: 'json'
    });
  };

  this.findAllUsers = function findAllUsers(callback) {
    let registeredUsers = {};
    $.get(this.url, function (ret) {
      for (var index in ret) {
        let userJava = ret[index];
        let userJs =
          new User(userJava.id,
            userJava.username,
            userJava.password,
            userJava.firstName,
            userJava.lastName,
            userJava.role);
        registeredUsers[index] = userJs;
      }
      callback(registeredUsers);
    })
  };

  this.findUserById = function findUserById(userId, callback) {
    $.get(`${this.url}/${userId}`, function (ret) {
      let userJava = ret;
      let userJs =
        new User(userJava.id,
          userJava.username,
          userJava.password,
          userJava.firstName,
          userJava.lastName,
          userJava.role);

      callback(userJs);
    })
  };

  this.deleteUser = function deleteUser(userId, callback) {
    $.ajax({
      url: `${this.url}/${userId}`,
      type: 'DELETE',
      success: function (d) {
        callback();
        console.log(d)
      }
    });
  };

  this.updateUser = function updateUser(user, callback) {
    $.ajax({
      type: 'PUT',
      url: this.url,
      data: JSON.stringify({
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "role": user.role
      }),
      success: function (data) { 
        callback();
        console.log(data);
      },
      contentType: "application/json",
      dataType: 'json'
    });
  };
}
