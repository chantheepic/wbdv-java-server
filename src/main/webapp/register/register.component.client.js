
(function () {
  $('#alert').hide();

  $('#registerBtn').click(function () {
    if (PswCheck()) {
      document.location.replace('../prof/profile.template.client.html');
    }
  });

  function PswCheck() {
    if ($('#usernameFld').val().length > 0 &&
      $('#passwordFld').val().length > 0 &&
      $('#passwordFld').val() === $('#verifyPasswordFld').val()) {
      $('#alert').hide();
      return true;
    } else {
      $('#alert').fadeIn();
      return false;
    }
  }
})();