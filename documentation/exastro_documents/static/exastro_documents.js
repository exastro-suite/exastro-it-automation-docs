// JavaScript Document

$(function () {

  $('#menuButton').on('click', function () {
    $('#sideMenu').toggleClass('on');
  });

  $('#tocButton').on('click', function () {
    $('#tableOfContents').toggleClass('on');
  });

  /*
  Page Top Link
  */
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(this).height()) {
      $('#pageTopLink').addClass('on');
    } else {
      $('#pageTopLink').removeClass('on');
    }
  });


});

$(window).on('load', function () {

  /*
  Anker scroll
  */
  var anlerScroll = function (hash) {
    var speed = 300,
      fixedMenuheight = $('#header').height() + $('#toolbar').height();
    var target = $(hash == '#' || hash == '' ? 'html' : hash);
    var position = target.offset().top - fixedMenuheight - 16;
    $('body, html').animate({ scrollTop: position }, speed, 'swing');
  }

  // Page Open
  var hash = location.hash;
  if (hash) {
    $('body,html').scrollTop(0);
    anlerScroll(hash);
  }

  // Click Event
  $('a[href^="#"]').on('touchstart click', function (e) {
    e.preventDefault();
  }).on('touchend mouseup', function (e) {
    e.preventDefault();
    if (e.which !== 3) {
      anlerScroll($(this).attr('href'));
    }
  });

  // Table of Contents
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6,h7,h8,h9');
  window.addEventListener('scroll', function () {
    let offset = 200;
    const targets = document.querySelectorAll('#tableOfContents li');
    if (targets.length > 1) {
      let hasCurrent = false;
      headings.forEach(function (heading, index) {
        let target = targets[index];
        if ( offset < heading.getBoundingClientRect().top && ! hasCurrent ) {
          target.classList.add('current');
          hasCurrent = true;
        } else if ( index + 1 == headings.length && ! hasCurrent ) {
          target.classList.add('current');
        } else if ( offset >= heading.getBoundingClientRect().top
          && offset < headings[index + 1].getBoundingClientRect().top) {
          target.classList.add('current');
          hasCurrent = true;
        } else if ( target.classList.contains('current') ) {
          target.classList.remove('current');
        }
      });
    } else {
      targets[0].classList.add('current');
    }
  });
});