/* var $wrap = $('.face'),
  $lEye = $('.eye'),
  lFollowX = 5,
  lFollowY = 10,
  x = 0,
  y = 0,
  friction = 1 / 12; */
var $wrap = $('.face'),
  $lEye = $('.eye'),
  lFollowX = 2.5,
  lFollowY = 5,
  x = 0,
  y = 0,
  friction = 1 / 12;
  
function animate() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  $lEye.css({
    '-webit-transform': 'translate(' + -x + 'px, ' + -y + 'px)',
    '-moz-transform': 'translate(' + -x + 'px, ' + -y + 'px)',
    'transform': 'translate(' + -x + 'px, ' + -y + 'px)'
  });

  $wrap.css({
    'transform': 'translate(-50%, -50%) perspective(600px) rotateY(' + -x + 'deg) rotateX(' + y + 'deg)'
  });
  window.requestAnimationFrame(animate);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-50, Math.min(50, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-50, Math.min(50, $(window).height() / 2 - e.clientY));
  lFollowX = (5 * lMouseX) / 50; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (3 * lMouseY) / 40;

});

animate();