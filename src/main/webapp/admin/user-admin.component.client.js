(function () {
  // document preparation
  $('#alert').hide();
  var userService = new AdminUserServiceClient();
  // remember id of user the client is editing
  let selectedId = { selected: false, id: 0 };
  $(main);

  function main() {
    // event listeners for buttons
    $('.wbdv-search').click(function () {
      filterUsers();
    });
    $('.wbdv-create').click(function () {
      createUser();
      findAllUsers();
    });
    $('.wbdv-update').click(function () {
      updateUser();
      findAllUsers();
    });

    // load and render current registered users
    findAllUsers();
  }

  // hide all rows that contain unmatching user parameters
  function filterUsers() {
    let usern = $('#usernameFld').val();
    let pswd = $('#passwordFld').val();
    let fname = $('#firstNameFld').val();
    let lname = $('#lastNameFld').val();
    let role = $('#roleFld').val();
    let allUsers = $('tbody').children('tr');

    allUsers.each(function (index) {
      $(allUsers[index]).show();

      if (usern != '') {
        if ($(allUsers[index]).children('.username').text() != usern) {
          $(allUsers[index]).hide();
        }
      }
      if (pswd != '') {
        if ($(allUsers[index]).children('.password').text() != pswd) {
          $(allUsers[index]).hide();
        }
      }
      if (fname != '') {
        if ($(allUsers[index]).children('.firstName').text() != fname) {
          $(allUsers[index]).hide();
        }
      }
      if (lname != '') {
        if ($(allUsers[index]).children('.lastName').text() != lname) {
          $(allUsers[index]).hide();
        }
      }
      if (role != '') {
        if ($(allUsers[index]).children('.role').text() != role) {
          $(allUsers[index]).hide();
        }
      }
    })
  }

  // clear all input fields. Called on add and update.
  function ClearFormFields() {
    $('#usernameFld').val('');
    $('#passwordFld').val('');
    $('#firstNameFld').val('');
    $('#lastNameFld').val('');
    $('#roleFld').val($('#roleFld').find('option')[0].text);
  }

  // check if all fields are filled and then create new js user object
  // pass object to createUser of userService instance
  // show alert of empty fields exist
  function createUser() {
    let usern = $('#usernameFld').val();
    let pswd = $('#passwordFld').val();
    let fname = $('#firstNameFld').val();
    let lname = $('#lastNameFld').val();
    let role = $('#roleFld').val();

    if (usern != '' && pswd != '' && fname != '' && role != '') {
      let newUser = new User(-1, usern, pswd, fname, lname, role);
      userService.createUser(newUser, findAllUsers);
      ClearFormFields();
      $('#alert').hide();
    } else {
      $('#alert').fadeIn();
    }
  }

  // calls findAllUsers of userService instance. Pass all js user objects to render users
  function findAllUsers() {
    userService.findAllUsers(function (registeredUsers) {
      renderUsers(registeredUsers);
      deleteUser();
      findUserById();
    });
  }

  // find target id of user selected by client. for this implementation tr id is user id
  // findUserById of userService returns js user object with user of target id
  function findUserById() {
    $('.edit').click(function () {
      let targetId = $(this).closest('tr')[0].id;

      userService.findUserById(targetId, function (targetUser){
        selectedId['selected'] = true;
        selectedId['id'] = targetId;
        $('#usernameFld').val(targetUser.getUsername());
        $('#passwordFld').val(targetUser.getPassword());
        $('#firstNameFld').val(targetUser.getFirstName());
        $('#lastNameFld').val(targetUser.getLastName());
        $('#roleFld').val(targetUser.getRole());
      });
    });
  }

  // when update button is clicked, the input fields are used to create new js user object
  // user id is tracked as a package variable
  function updateUser() {
    if (selectedId['selected'] == true) {
      let usern = $('#usernameFld').val();
      let pswd = $('#passwordFld').val();
      let fname = $('#firstNameFld').val();
      let lname = $('#lastNameFld').val();
      let role = $('#roleFld').val();
      let update = new User(selectedId['id'], usern, pswd, fname, lname, role);

      userService.updateUser(update, findAllUsers);
      ClearFormFields();
      selectedId['selected'] = false;
      selectedId['id'] = 0;
    }
  }

  // clone template for row. use parameters from user object to populate template
  function renderUser(user) {
    let userTemplate = $('#userTemplate');
    let clone = userTemplate.contents().clone();
    clone.find('.username').text(user.getUsername());
    clone.find('.password').text(user.getPassword());
    clone.find('.firstName').text(user.getFirstName());
    clone.find('.lastName').text(user.getLastName());
    clone.find('.role').text(user.getRole());
    clone.attr('id', user.getId());
    $('tbody').append(clone);
  }

  // first clean out table then for each user object, pass to renderUser
  function renderUsers(registeredUsers) {
    $('tbody').empty();
    for (var index in registeredUsers) {
      renderUser(registeredUsers[index]);
    }
  }

  // find target id of user selected by client. for this implementation tr id is user id
  // send id to deleteUser of userService.
  function deleteUser() {
    $('.close').click(function () {
      let target = $(this).closest('tr');
      userService.deleteUser(target[0].id, findAllUsers);
    });

  }
})();