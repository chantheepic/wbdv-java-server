
(function () {
  // initialize page
  $('#alert').hide();

  // redirect suer to profile if form checks pass
  $('#registerBtn').click(function () {
    if (PswCheck()) {
      document.location.replace('../prof/profile.template.client.html');
    }
  });

  // simple password checks. raise alert if password or username is empty or if passwords don't match
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