// JavaScript Document

$(function(){

$('#menuButton').on('click', function(){
  $('#sideMenu').toggleClass('on');
});

$('#tocButton').on('click', function(){
 $('#tableOfContents').toggleClass('on');
});

/*
Page Top Link
*/
$( window ).scroll( function(){
  if ( $( this ).scrollTop() > $( this ).height() ){
    $('#pageTopLink').addClass('on');
  } else {
    $('#pageTopLink').removeClass('on');
  }
});


});

$( window ).on('load', function(){

  /*
  Anker scroll
  */
  var anlerScroll = function( hash ) {
    var speed = 300,
    fixedMenuheight =  $('#header').height() + $('#toolbar').height();
    var target = $ ( hash == '#' || hash == '' ? 'html' : hash );
    var position = target.offset().top - fixedMenuheight - 16;
    $('body, html').animate({ scrollTop : position }, speed, 'swing' );
  }

  // Page Open
  var hash = location.hash;
  if ( hash ){
    $('body,html').scrollTop( 0 );
    anlerScroll( hash );
  }

  // Click Event
  $('a[href^="#"]').on('touchstart click', function( e ){
    e.preventDefault();
    }).on('touchend mouseup', function( e ){
    e.preventDefault();
    if ( e.which !== 3 ) {
      anlerScroll( $( this ).attr('href') );
    }
  });

  // Table of Contents
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6,h7,h8,h9');
  let set_position = 0;
  window.addEventListener('scroll', function() {
      if (set_position < document.documentElement.scrollTop) {
          direction= 'down';
      } else {
          direction= 'up';
      }
      set_position = document.documentElement.scrollTop;
      let scroll = window.scrollY;
      let height = window.innerHeight;
      let offset = height - 100;
      const targets = document.querySelectorAll('#tableOfContents li');
      if ( targets.length > 1 ) {
          headings.forEach( function( heading , index) {
              let i = index + 1;
              let target = targets[i];
              let pos = heading.getBoundingClientRect().top + scroll;
              if ( scroll >pos - height + offset ) {
                  if (headings[index + 1] !== undefined){
                      let next_pos = headings[index + 1].getBoundingClientRect().top + scroll;
                      if ( scroll > next_pos - height + offset ) { 
                          target.classList.remove('current');
                      } else if (target.classList.contains('current') == true) { 
                          return;
                      } else { 
                          target.classList.add('current');
                      }
                  } else { 
                      if(target != undefined ) {
                          target.classList.add('current');
                      }
                  }
              } else { 
                  if(target != undefined ) {
                      target.classList.remove('current');
                  }
              }
          });
       } else {
          targets[0].classList.add('current');
       }
  });
});