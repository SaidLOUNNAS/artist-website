(function ($) {
  'use strict';

  var browserWindow = $(window);

  // :: 1.0 Preloader Active Code
  browserWindow.on('load', function () {
    $('.preloader').fadeOut('slow', function () {
      $(this).remove();
    });
  });

  // :: 2.0 Nav Active Code
  if ($.fn.classyNav) {
    $('#musicaNav').classyNav();
  }

  // :: 3.0 Sliders Active Code
  if ($.fn.owlCarousel) {
    var welcomeSlide = $('.hero-slides');
    var featured_shows = $('.featured-shows-slides');
    var music_player = $('.music-player-slides');
    var discography = $('.discography-slides');

    welcomeSlide.owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 7000,
      smartSpeed: 1000,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
    });

    welcomeSlide.on('translate.owl.carousel', function () {
      var slideLayer = $('[data-animation]');
      slideLayer.each(function () {
        var anim_name = $(this).data('animation');
        $(this)
          .removeClass('animated ' + anim_name)
          .css('opacity', '0');
      });
    });

    welcomeSlide.on('translated.owl.carousel', function () {
      var slideLayer = welcomeSlide.find('.owl-item.active').find('[data-animation]');
      slideLayer.each(function () {
        var anim_name = $(this).data('animation');
        $(this)
          .addClass('animated ' + anim_name)
          .css('opacity', '1');
      });
    });

    $('[data-delay]').each(function () {
      var anim_del = $(this).data('delay');
      $(this).css('animation-delay', anim_del);
    });

    $('[data-duration]').each(function () {
      var anim_dur = $(this).data('duration');
      $(this).css('animation-duration', anim_dur);
    });

    featured_shows.owlCarousel({
      items: 3,
      margin: 30,
      loop: true,
      nav: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 600,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });

    music_player.owlCarousel({
      items: 3,
      margin: 45,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 750,
      responsive: {
        0: {
          items: 1,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    discography.owlCarousel({
      items: 6,
      margin: 30,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      smartSpeed: 600,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 4,
        },
        992: {
          items: 6,
        },
      },
    });
  }

  // :: 4.0 ScrollUp Active Code
  if ($.fn.scrollUp) {
    browserWindow.scrollUp({
      scrollSpeed: 1500,
      scrollText: '<i class="fa fa-angle-up"></i>',
    });
  }

  //:: 5.0 CounterUp Active Code
  if ($.fn.counterUp) {
    $('.counter').counterUp({
      delay: 10,
      time: 2000,
    });
  }

  //:: 6.0 Sticky Active Code
  if ($.fn.sticky) {
    $('.musica-main-menu').sticky({
      topSpacing: 0,
    });
  }

  // // :: 7.0 Progress Bar Active Code
  // if ($.fn.circleProgress) {
  //   $('#circle').circleProgress({
  //     size: 160,
  //     emptyFill: 'rgba(0, 0, 0, .0)',
  //     fill: '#cc1573',
  //     thickness: '4',
  //     reverse: true,
  //   });
  //   $('#circle2').circleProgress({
  //     size: 160,
  //     emptyFill: 'rgba(0, 0, 0, .0)',
  //     fill: '#cc1573',
  //     thickness: '4',
  //     reverse: true,
  //   });
  //   $('#circle3').circleProgress({
  //     size: 160,
  //     emptyFill: 'rgba(0, 0, 0, .0)',
  //     fill: '#cc1573',
  //     thickness: '4',
  //     reverse: true,
  //   });
  //   $('#circle4').circleProgress({
  //     size: 160,
  //     emptyFill: 'rgba(0, 0, 0, .0)',
  //     fill: '#cc1573',
  //     thickness: '4',
  //     reverse: true,
  //   });
  // }

  // :: 8.0 audioPlayer Active Code
  if ($.fn.audioPlayer) {
    $('audio').audioPlayer();
  }

  //:: 9.0 Tooltip Active Code
  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //:: 10.0 niceScroll Active Code
  // if ($.fn.niceScroll) {
  //   $('.album-all-songs').niceScroll({
  //     background: '#fff',
  //   });
  // }

  //:: 11.0 ScrollDown Active Code

  // :: 12.0 prevent default a click
  // $('a[href="#"]').on('click', function ($) {
  //   $.preventDefault();
  // });

  // :: 13.0 wow Active Code
  if (browserWindow.width() > 767) {
    new WOW().init();
  }
})(jQuery);

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// add the concerts
const ref = firebase.database().ref('users');
//$('#emp-table').find('tbody').html('');
var new_html = '';
window.onload = function () {
  initApp();
  displayEmpData();
};

function initApp() {
  document.getElementById('add_emp').addEventListener('click', addNewEmp, false);
}
// INSERT DATA
function addNewEmp() {
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var map = document.getElementById('map').value;
  var comp = document.getElementById('comp').value;
  var timeStamp = new Date().getTime();
  var empID = 'EMP_' + timeStamp;
  ref.child(empID).set({
    name: name,
    date: date,
    time: time,
    map: map,
    comp: comp,
    emp_id: empID,
  });
  $('#name').val('');
  $('#date').val('');
  $('#time').val('');
  $('#map').val('');
  $('#comp').val('');
}

//Display Employee Data

function displayEmpData() {
  ref.on('child_added', function (empData) {
    console.log(empData.val());

    new_html += '<tr id="' + empData.val().emp_id + '">';
    new_html += '<td id="name_' + empData.val().emp_id + '">' + empData.val().name + '</td>';
    new_html += '<td id="date_' + empData.val().emp_id + '">' + empData.val().date + '</td>';
    new_html += '<td id="time_' + empData.val().emp_id + '">' + empData.val().time + '</td>';
    new_html += '<td id="map_' + empData.val().emp_id + '">' + empData.val().map + '</td>';
    new_html += '<td id="comp_' + empData.val().emp_id + '">' + empData.val().comp + '</td>';
    new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editEmp"';
    new_html += 'data-toggle="tooltip" data-emp-id="' + empData.val().emp_id + '" title="Edit">&#xE254;</i></a>';
    new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
    new_html += 'data-toggle="tooltip"  data-emp-id="' + empData.val().emp_id + '" title="Delete">&#xE872;</i></a>';
    new_html += '</td>';
    new_html += '</tr>';

    $('#emp-table').html(new_html);
  });

  //$('#emp-table').find('tbody').append(new_html);
}

$(document).on('click', '.delete', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).once('value', function (emp) {
    var modal_header = '';

    modal_header += '<h4 class="modal-title">Supprimer ' + emp.val().name + '</h4>';
    modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = '';
    modal_body += '<p>Voulez-vous vraiment supprimer ces enregistrements?</p>';
    modal_body += '<p class="text-warning"><small></small></p>';
    var modal_footer = '';
    modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="' + emp_id + '" class="btn btn-danger deleteEmpData" value="Delete">';
    $('#deleteEmployeeModal').find('.modal-header').html(modal_header);
    $('#deleteEmployeeModal').find('.modal-body').html(modal_body);
    $('#deleteEmployeeModal').find('.modal-footer').html(modal_footer);
    $('#deleteEmployeeModal').modal();
  });
});

$(document).on('click', '.editEmp', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).once('value', function (emp) {
    var modal_header = '';

    modal_header += '<h4 class="modal-title">Ajouter ' + emp.val().name + '</h4>';
    modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

    var modal_body = '';
    modal_body += '<div class="form-group">';
    modal_body += '<label>Name</label>';
    modal_body += '<input id="edit-name" type="text" value="' + emp.val().name + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Date</label>';
    modal_body += '<input type="date" id="edit-date" value="' + emp.val().date + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Heure</label>';
    modal_body += '<input type="time" id="edit-date" value="' + emp.val().time + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Localisation</label>';
    modal_body += '<input id="edit-map" type="text" value="' + emp.val().map + '" class="form-control" required>';
    modal_body += '</div>';

    modal_body += '<div class="form-group">';
    modal_body += '<label>Complet</label>';
    modal_body += '<input id="edit-comp" type="text" value="' + emp.val().comp + '" class="form-control" required>';
    modal_body += '</div>';

    var modal_footer = '';
    modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
    modal_footer += '<input type="submit" data-dismiss="modal" data-emp-id="' + emp_id + '"  class="btn btn-danger updateEmpData" value="Save">';
    $('#editEmployeeModal').find('.modal-header').html(modal_header);
    $('#editEmployeeModal').find('.modal-body').html(modal_body);
    $('#editEmployeeModal').find('.modal-footer').html(modal_footer);
    $('#editEmployeeModal').modal();
  });
});

$(document).on('click', '.deleteEmpData', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.child(emp_id).remove();

  $('#' + emp_id).remove();
});

$(document).on('click', '.updateEmpData', function () {
  var emp_id = $(this).attr('data-emp-id');

  var name = document.getElementById('edit-name').value;
  var date = document.getElementById('edit-date').value;
  var time = document.getElementById('edit-time').value;
  var map = document.getElementById('edit-map').value;
  var comp = document.getElementById('edit-comp').value;

  ref.child(emp_id).update({
    name: name,
    date: date,
    time: time,
    map: map,
    comp: comp,
  });

  $('#name_' + emp_id).html(name);
  $('#date_' + emp_id).html(date);
  $('#time_' + emp_id).html(time);
  $('#map_' + emp_id).html(map);
  $('#comp' + emp_id).html(comp);
});

$(document).on('click', '.dltAllData', function () {
  var emp_id = $(this).attr('data-emp-id');

  ref.remove();

  $('#emp-table').remove();
});
