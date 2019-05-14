(function () {
  RegisterCloseEvents();

  $('#addcourseBtn').click(function () {
    let courseTitle = ($('#addcourseTitle').val() == '' ? "Untitled Course" : $('#addcourseTitle').val());
    console.log(courseTitle);
    let spacelessCourseTitle = courseTitle.replace(/\s/g, '_');

    let courseTemplate = $('#courseTemplate');
    let clone = courseTemplate.contents().clone();
    clone.find('.courseTitle').text(courseTitle);
    clone.attr('id', spacelessCourseTitle);

    $('#courselist').append(clone).children(':last').hide().fadeIn();
    $('#courselist').children('h5').fadeIn();
    RegisterCloseEvents();
  });

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