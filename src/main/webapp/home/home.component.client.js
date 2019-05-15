(function () {
  // initialize page, set initial event handlers
  RegisterCloseEvents();

  $('#addcourseBtn').click(function () {
    // course title is taken from input field
    let courseTitle = ($('#addcourseTitle').val() == '' ? "Untitled Course" : $('#addcourseTitle').val());
    console.log(courseTitle);
    let courseTemplate = $('#courseTemplate');

    // clone course row template and populate field with course title
    let clone = courseTemplate.contents().clone();
    clone.find('.courseTitle').text(courseTitle);

    // add new row to list and register close event handler
    $('#courselist').append(clone).children(':last').hide().fadeIn();
    $('#courselist').children('h5').fadeIn();
    RegisterCloseEvents();
  });

  // adds course row removal event handlers
  function RegisterCloseEvents() {
    $('.close').click(function () {
      let target = $(this).closest('.list-group-item');
      console.log(target);
      target.fadeOut(function () {
        console.log(target.siblings());
        if (target.siblings('.list-group-item').length == 0) {
          target.siblings('h5').fadeOut();
        }
        target.remove();
      });
    });
  }
})();