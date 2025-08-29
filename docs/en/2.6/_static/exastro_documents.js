
$(function () {

  $("#multiColumnIndex li>a").each(function(){
    var text = $(this).text();
   $(this).text(text.replace(/^([0-9]+\.) /,''));
  });

  $('#menuButton').on('click', function () {
    $('#sideMenu').toggleClass('on');
  });

  $(document).click(function(event){
    var target = $(event.target);
    if(target[0].id === "tocButton"){
      $('#tableOfContents').toggleClass('on');
    }else{
      $('#tableOfContents').removeClass('on');
    }
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

  $("figure img").click(function () {
    $("#grayBack").html($(this).prop("outerHTML"));
    $("#grayBack").fadeIn(200);
    return false;
  });

  $("#grayBack").click(function () {
    $("#grayBack").fadeOut(200);
    return false;
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

  var hash = location.hash;
  if (hash) {
    $('body,html').scrollTop(0);
    anlerScroll(hash);
  }

  $('a[href^="#"]').on('touchstart click', function (e) {
    e.preventDefault();
  }).on('touchend mouseup', function (e) {
    e.preventDefault();
    if (e.which !== 3) {
      anlerScroll($(this).attr('href'));
    }
  });

  const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6,h7,h8,h9');
  window.addEventListener('scroll', function () {
    let offset = 200;
    const targets = document.querySelectorAll('#tableOfContents li');

    if (targets.length > 1) {
      let hasCurrent = false;
      headings.forEach(function (heading, index) {

        let target = targets[index];

        if (offset < heading.getBoundingClientRect().top && !hasCurrent) {
          target.classList.add('current');
          hasCurrent = true;
        } else if (index + 1 == headings.length && !hasCurrent) {
          target.classList.add('current');
        } else if (offset >= heading.getBoundingClientRect().top
          && offset < headings[index + 1].getBoundingClientRect().top) {
          target.classList.add('current');
          hasCurrent = true;
        } else if (target.classList.contains('current')) {
          target.classList.remove('current');
        }

      });
    } else {
      if ( targets[0] ) {
       targets[0].classList.add('current');
      }
    }
  });
});

window.onload = function () {
  filterInit();
}

var ftStartRow = 0;
var ftColumnList = [];
var ftListStatement = {};
function filterInit() {
  var filterTables = $("table.filter-table");
  for (var h = 0; h < filterTables.length; h++) {
    var filterTable = filterTables[h];
    var ftRow = filterTable.rows;
    var filterButton = '';
    for (var i = 0; i < ftRow.length; i++) {
      var ftFields = filterTable.rows[i].cells;
      for (var j = 0; j < ftFields.length; j++) {
        ftStartRow = i + 1;
        filterButton = '<div class="ft-filter">';
        filterButton += '<span class="ft-button iconButtonIcon icon icon-filter" id="ft-button-' + h + '-' + j + '" onclick="ftToggle(' + h + ', ' + j + ')"></span>';
        filterButton += '<div class="ft-list" id="ft-list-' + h + '-' + j + '" style="display:none">';
        filterButton += filterCreate(filterTable, h, j);
        filterButton += '</div>';
        filterButton += '</div>';
        ftFields[j].innerHTML = ftFields[j].innerHTML + filterButton;
        ftColumnList.push(j);
      }
      if (filterButton != '') {
        gSortBtnRow = i;
        break;
      }
    }
  }
}
function filterCreate(filterTable, tableNumber, ftColumn) {
  var ftRow = filterTable.rows;
  var fieldList = [];
  var wNotNum = 0;
  var fieldListSave = {};
  var rcList = '';
  for (var i = ftStartRow; i < ftRow.length; i++) {
    var j = i - ftStartRow;
    fieldList[j] = ftRow[i].cells[ftColumn].innerText.toString();
    if (fieldList[j].match(/^[-]?[0-9,\.]+$/)) {
    } else {
      wNotNum = 1;
    }
  }
  if (wNotNum == 0) {
    fieldList.sort(sortNumA);
  } else {
    fieldList.sort(sortStrA);
  }
  var fieldListId = id = 'select-all-' + tableNumber + '-' + ftColumn;
  rcList += '<div class="ft-check-row">';
  rcList += '<input type="checkbox" id="' + fieldListId + '" checked onclick="tFilterAllSet(' + tableNumber + ', ' + ftColumn + ')">';
  rcList += '<label for="' + fieldListId + '">(すべて)</label>';
  rcList += '</div>';
  rcList += '<form name="ft-form-' + tableNumber + '-' + ftColumn + '">';
  for (var i = 0; i < fieldList.length; i++) {
    fieldValue = trim(fieldList[i]);
    if (fieldValue in fieldListSave) {
    } else {
      fieldListId = id = 'ft-data-' + tableNumber + '-' + ftColumn + '-r' + i;
      rcList += '<div class="ft-check-row">';
      rcList += '<input type="checkbox" id="' + fieldListId + '" value="' + fieldValue + '" checked onclick="tFilterClick(' + tableNumber + ', ' + ftColumn + ')">';
      rcList += '<label for="' + fieldListId + '">' + (fieldValue == '' ? '(空白)' : fieldValue) + '</label>';
      rcList += '</div>';
      fieldListSave[fieldValue] = '1';
    }
  }
  rcList += '</form>';
  rcList += '<div class="ft-input-area">';
  rcList += '<input type="text" placeholder="フィルタ" id="ftFilterString' + tableNumber + '-' + ftColumn + '">';
  rcList += '</div>';
  rcList += '<div class="ft-button-area">';
  rcList += '<input type="button" value="OK" onclick="tFilterGo(' + tableNumber + ')">';
  rcList += '<input type="button" value="Cancel" onclick="tFilterCancel(' + tableNumber + ', ' + ftColumn + ')">';
  rcList += '</div>';
  return rcList;
}
function tFilterClick(tableNumber, ftColumn) {
  var wForm = document.forms['ft-form-' + tableNumber + '-' + ftColumn];
  var wCntOn = 0;
  var wCntOff = 0;
  var wAll = document.getElementById('select-all-' + tableNumber + '-' + ftColumn);
  for (var i = 0; i < wForm.elements.length; i++) {
    if (wForm.elements[i].type == 'checkbox') {
      if (wForm.elements[i].checked) { wCntOn++; }
      else { wCntOff++; }
    }
  }
  if ((wCntOn == 0) || (wCntOff == 0)) {
    wAll.checked = true;
    tFilterAllSet(tableNumber, ftColumn);
  } else {
    wAll.checked = false;
  }
}
function tFilterCancel(tableNumber, ftColumn) {
  tFilterSave(tableNumber, ftColumn, 'load');
  ftToggle(tableNumber, '');
}
function tFilterGo(tableNumber) {
  var filterTable = $("table.filter-table")[tableNumber];
  var ftRow = filterTable.rows;
  for (var i = 0; i < ftRow.length; i++) {
    if (ftRow[i].style.display == "none") {
      ftRow[i].style.display = "";
    }
  }
  for (var wColList = 0; wColList < ftColumnList.length; wColList++) {
    var wCol = ftColumnList[wColList];
    var wAll = document.getElementById('select-all-' + tableNumber + '-' + wCol);
    var fieldListSave = {};
    var wFilterBtn = document.getElementById('ft-button-' + tableNumber + '-' + wCol);
    var wFilterStr = document.getElementById('ftFilterString' + tableNumber + '-' + wCol);
    var wForm = document.forms['ft-form-' + tableNumber + '-' + wCol];
    for (var i = 0; i < wForm.elements.length; i++) {
      if (wForm.elements[i].type == 'checkbox') {
        if (wForm.elements[i].checked) {
          fieldListSave[wForm.elements[i].value] = 1;
        }
      }
    }
    if ((wAll.checked) && (trim(wFilterStr.value) == '')) {
      wFilterBtn.classList.remove('selected');
    }
    else {
      wFilterBtn.classList.add('selected');
      for (var i = ftStartRow; i < ftRow.length; i++) {
        var fieldValue = trim(ftRow[i].cells[wCol].innerText.toString());
        if (!wAll.checked) {
          if (fieldValue in fieldListSave) {
          }
          else {
            ftRow[i].style.display = "none";
          }
        }
        if (wFilterStr.value != '') {
          reg = new RegExp(wFilterStr.value);
          if (fieldValue.match(reg)) {
          }
          else {
            ftRow[i].style.display = "none";
          }
        }
      }
    }
  }
  ftToggle(tableNumber, '');
}
function tFilterSave(tableNumber, ftColumn, argFunc) {
  var wAllCheck = document.getElementById('select-all-' + tableNumber + '-' + ftColumn);
  if (argFunc == 'save') {
    ftListStatement[wAllCheck.id] = wAllCheck.checked;
  } else {
    wAllCheck.checked = ftListStatement[wAllCheck.id];
  }
  var wForm = document.forms['ft-form-' + tableNumber + '-' + ftColumn];
  for (var i = 0; i < wForm.elements.length; i++) {
    if (wForm.elements[i].type == 'checkbox') {
      if (argFunc == 'save') {
        ftListStatement[wForm.elements[i].id] = wForm.elements[i].checked;
      } else {
        wForm.elements[i].checked = ftListStatement[wForm.elements[i].id];
      }
    }
  }
  var wStrInput = document.getElementById('ftFilterString' + tableNumber + '-' + ftColumn);
  if (argFunc == 'save') {
    ftListStatement[wStrInput.id] = wStrInput.value;
  } else {
    wStrInput.value = ftListStatement[wStrInput.id];
  }
}
function ftToggle(tableNumber, ftColumn) {
  for (var i = 0; i < ftColumnList.length; i++) {
    document.getElementById("ft-list-" + tableNumber + '-' + ftColumnList[i]).style.display = 'none';
  }
  if (ftColumn !== '') {
    document.getElementById("ft-list-" + tableNumber + '-' + ftColumn).style.display = '';
    tFilterSave(tableNumber, ftColumn, 'save');
  }
}
function tFilterAllSet(tableNumber, ftColumn) {
  var wChecked = false;
  var wForm = document.forms['ft-form-' + tableNumber + '-' + ftColumn];
  if (document.getElementById('select-all-' + tableNumber + '-' + ftColumn).checked) {
    wChecked = true;
  }
  for (var i = 0; i < wForm.elements.length; i++) {
    if (wForm.elements[i].type == 'checkbox') {
      wForm.elements[i].checked = wChecked;
    }
  }
}
function sortNumA(a, b) {
  a = parseInt(a.replace(/,/g, ''));
  b = parseInt(b.replace(/,/g, ''));
  return a - b;
}
function sortStrA(a, b) {
  a = a.toString().toLowerCase();
  b = b.toString().toLowerCase();
  if (a < b) { return -1; }
  else if (a > b) { return 1; }
  return 0;
}
function trim(argStr) {
  var rcStr = argStr;
  rcStr = rcStr.replace(/^[ 　\r\n]+/g, '');
  rcStr = rcStr.replace(/[ 　\r\n]+$/g, '');
  return rcStr;
}