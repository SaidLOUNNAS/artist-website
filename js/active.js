(function ($) {
  'use strict';

  var browserWindow = $(window);

  // Preloader Active Code
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

  // :: 8.0 audioPlayer Active Code
  if ($.fn.audioPlayer) {
    $('audio').audioPlayer();
  }

  //:: 9.0 Tooltip Active Code
  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip();
  }

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
var new_html = '';
window.onload = function () {
  initApp();
  displayEmpData();
};

function initApp() {
  document.getElementById('add_emp').addEventListener('click', addNewEmp, false);
}
function addNewEmp() {
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var map = document.getElementById('map').value;
  var concertScript = document.getElementById('concert - script').value;

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
}

//Display Employee Data

function displayEmpData() {
  ref.on('child_added', function (empData) {
    new_html += '<tr id="' + empData.val().emp_id + '">';
    new_html += '<td id="name_' + empData.val().emp_id + '">' + empData.val().name + '</td>';
    new_html += '<td id="date_' + empData.val().emp_id + '">' + empData.val().date + '</td>';
    new_html += '<td id="time_' + empData.val().emp_id + '">' + empData.val().time + '</td>';
    new_html += '<td id="map_' + empData.val().emp_id + '">' + empData.val().map + '</td>';
    new_html += '</td>';
    new_html += '</tr>';
    $('#emp-table').html(new_html);
  });
}

const tesref = firebase.database().ref('users');
const data = [];
tesref.once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot, index) {
    let childData = childSnapshot.val();
    data.push(childData);
  });
  data.forEach((childData, index) => {
    if (index < data.length) {
      datesconc.innerHTML =
        datesconc.innerHTML +
        `<div class="single-upcoming-shows d-flex align-items-center flex-wrap" data-index="0">
            <div class="shows-date">
              <h2>${childData.name}</h2>
            </div>
            <div class="shows-desc d-flex align-items-center">
              <div class="shows-img"></div>
              <div class="shows-name">
                <p>${childData.date}</p>
              </div>
            </div>
            <div class="shows-location">
              <p>${childData.map}</p>
            </div>
            <div class="shows-time">
              <p>${childData.time}</p>
            </div>
            <div class="buy-tickets">
              <a href="https://www.infoconcert.com/artiste/laylow-156907/concerts.html" class="btn musica-btn">
               Réserver
              </a>
            </div>
          </div>`;
    }
  });
});
