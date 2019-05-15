function AdminUserServiceClient() {
  var self = this;

  // deployment url
  let deploy = true;
  this.url = 'http://localhost:8080/api/users';
  if (deploy) {
    this.url = 'https://webd-chanmin-park-server-java.herokuapp.com/api/users'
  }

  // take given js user object and send as JSON post request
  // For each returned JSON object, parse as a js user object and add to key value dictionary. 
  // return dictionary of js user objects
  this.createUser = function createUser(user, callback) {
    let registeredUsers = {};
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
      success: function (ret) {
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
      },
      contentType: "application/json",
      dataType: 'json'
    });
  };

  // For each returned JSON object, parse as a js user object and add to key value dictionary. 
  // return dictionary of js user objects
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

  // One JSON object is returned. Parse and return as js user object
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

  // use given userid and send ajax delete request
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

  // For each returned JSON object, parse as a js user object and add to key value dictionary. 
  // take given js user object and send as JSON put request
  this.updateUser = function updateUser(user, callback) {
    let registeredUsers = {};
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
      success: function (ret) {
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
      },
      contentType: "application/json",
      dataType: 'json'
    });
  };
}
