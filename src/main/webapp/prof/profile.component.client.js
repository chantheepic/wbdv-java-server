(function () {
  // initialize page
  $('#alert').hide();

  // simple checks to ensure all fields are filled. If so, raise success alert
  $('#updateBtn').click(function (d) {
    if ($('#phone').val() != '' && $('#email').val() != '' && $('#dob').val() != '') {
      $('#alert').hide();
      $('#alert').fadeIn();
    }
  });
})();