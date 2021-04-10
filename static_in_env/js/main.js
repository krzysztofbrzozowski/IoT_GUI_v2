var $W = $(window);
var $D = $(document);

function getWindowHeight() {
  return 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
}

function getWindowWidth() {
  return window.innerWidth;
}

$.fn.rearangePadding = function(correction) {
  if (getWindowHeight() > $('.header').height() + $('.main-footer').height() + $(this).height() + correction) {
    let padding = getWindowHeight() - ($('.header').height() + $('.main-footer').height() + $(this).height() + correction);
    $(this).css('padding-top', `${padding / 2}px`);
    $(this).css('padding-bottom', `${padding / 2}px`);
  }
  return this;
};

$('#index').rearangePadding(0);

$W.resize(function() {
  var id;
  clearTimeout(id);
  id = setTimeout(doneResizing, 50);
});

function doneResizing() {
    $('#index').rearangePadding(0);
}
