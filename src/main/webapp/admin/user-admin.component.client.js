(function () {
  $('#alert').hide();
  var userService = new AdminUserServiceClient();
  // okay for this to have additional param?
  let selectedId = { selected: false, id: 0 };
  $(main);

  function main() {
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
    findAllUsers();
  }

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

  function ClearFormFields() {
    $('#usernameFld').val('');
    $('#passwordFld').val('');
    $('#firstNameFld').val('');
    $('#lastNameFld').val('');
    $('#roleFld').val($('#roleFld').find('option')[0].text);
  }

  function createUser() {
    let usern = $('#usernameFld').val();
    let pswd = $('#passwordFld').val();
    let fname = $('#firstNameFld').val();
    let lname = $('#lastNameFld').val();
    let role = $('#roleFld').val();

    if (usern != '' && pswd != '' && fname != '' && role != '') {
      let newUser = new User(usern, pswd, fname, lname, role);
      userService.createUser(newUser);
      ClearFormFields();
      $('#alert').hide();
    } else {
      $('#alert').fadeIn();
    }
  }

  function findAllUsers() {
    let registeredUsers = userService.findAllUsers();
    renderUsers(registeredUsers);
    deleteUser();
    findUserById();
  }

  function findUserById() {
    $('.edit').click(function () {
      let targetId = $(this).closest('tr')[0].id;
      let target = userService.findUserById(targetId);
      selectedId['selected'] = true;
      selectedId['id'] = targetId;
      $('#usernameFld').val(target.getUsername());
      $('#passwordFld').val(target.getPassword());
      $('#firstNameFld').val(target.getFirstName());
      $('#lastNameFld').val(target.getLastName());
      $('#roleFld').val(target.getRole());
    });
  }

  function updateUser() {
    if (selectedId['selected'] == true) {
      let usern = $('#usernameFld').val();
      let pswd = $('#passwordFld').val();
      let fname = $('#firstNameFld').val();
      let lname = $('#lastNameFld').val();
      let role = $('#roleFld').val();
      let update = new User(usern, pswd, fname, lname, role);

      userService.updateUser(selectedId['id'], update);
      selectedId['selected'] = false;
      selectedId['id'] = 0;
      ClearFormFields();
    }
  }

  // okay for this to have additional param?
  function renderUser(user, id) {
    let userTemplate = $('#userTemplate');
    let clone = userTemplate.contents().clone();
    clone.find('.username').text(user.getUsername());
    clone.find('.password').text(user.getPassword());
    clone.find('.firstName').text(user.getFirstName());
    clone.find('.lastName').text(user.getLastName());
    clone.find('.role').text(user.getRole());
    clone.attr('id', id);
    $('tbody').append(clone);
  }

  function renderUsers(registeredUsers) {
    $('tbody').empty();
    for (var index in registeredUsers) {
      renderUser(registeredUsers[index], index);
    }
  }

  function deleteUser() {
    $('.close').click(function () {
      let target = $(this).closest('tr');
      userService.deleteUser(target[0].id);
      target.fadeOut(function () {
        if (target.siblings('.list-group-item').length == 0) {
          target.siblings('h5').fadeOut();
        }
        target.remove();
      });
    });

  }
})();