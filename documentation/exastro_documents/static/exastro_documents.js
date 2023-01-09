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

  
  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
  let toc = '<ol id="fixed-toc">';
  headings.forEach( function(heading, index) {
    heading.id = 'heading-0' + (index+1);
    let id = heading.id;
    toc = toc + '<li><a href="#' + id + '">' + heading.textContent + '</a></li>';
  });
  toc = toc + '</ol>';
  let set_position = 0;
  window.addEventListener('scroll', function() {
      if (set_position < document.documentElement.scrollTop) {
          direction= 'down';
      } else {
          direction= 'up';
      }
      set_position = document.documentElement.scrollTop;
      let scroll = window.scrollY;//スクロール量を取得
      let height = window.innerHeight;//画面の高さを取得
      let offset = height - 100;
      // const toc_completed = document.getElementById('fixed-toc');
      const targets = document.querySelectorAll('#tableOfContents li');
      headings.forEach( function( heading , index) {
          let i = index + 1;
          let target = targets[i];
          let pos = heading.getBoundingClientRect().top + scroll;//見出しの位置
          if ( scroll >pos - height + offset ) {//スクロール量が見出しを超えた
              if (headings[index + 1] !== undefined){// 次の見出しがある＝最後の見出しではない
                  let next_pos = headings[index + 1].getBoundingClientRect().top + scroll;//次の見出しの位置
                  if ( scroll > next_pos - height + offset ) { // スクロール量が次の見出しも超えている
                      target.classList.remove('current');
                  } else if (target.classList.contains('current') == true) { // すでにcurrentがついている
                      return;
                  } else if ( i == 1 ){// 1つ目
                      target.classList.add('current')
                  } else { // 次の見出しは見えてない
                      target.classList.add('current');
                  }
              } else { //最後の見出しの時
                  if(target != undefined ) {
                      target.classList.add('current');
                  }
              }
          } else { //スクロール量が見出しを超えてない
              if(target != undefined ) {
                  target.classList.remove('current');
              }
          }
      });
  });
});