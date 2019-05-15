(function () {
  $('#alert').hide();
  $('#updateBtn').click(function (d) {
    if ($('#phone').val() != '' && $('#email').val() != '' && $('#dob').val() != '') {
      $('#alert').hide();
      $('#alert').fadeIn();
    }
  });
})();