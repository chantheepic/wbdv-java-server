function User(id, username, password, firstName, lastName, role) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.role = role;

  this.setId = function setId(id) {
    this.id = id;
  }
  this.getId = function getId() {
    return this.id;
  }

  this.setUsername = function setUsername(username) {
    this.username = username;
  }
  this.getUsername = function getUsername() {
    return this.username;
  }

  this.setPassword = function setPassword(password) {
    this.password = password;
  }
  this.getPassword = function getPassword() {
    return this.password;
  }

  this.setFirstName = function setFirstName(firstName) {
    this.firstName = firstName;
  } 
  this.getFirstName = function getFirstName() {
    return this.firstName;
  }
  
  this.setLastName = function setLastName(lastName) {
    this.lastName = lastName;
  }
  this.getLastName = function getLastName() {
    return this.lastName;
  }

  this.setRole = function setRole(role) {
    this.role = role;
  }
  this.getRole = function getRole() {
    return this.role;
  }

  return this;
}