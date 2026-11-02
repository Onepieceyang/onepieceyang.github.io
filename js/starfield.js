(function () {
  var canvas = document.createElement('canvas');
  canvas.id = 'starfield-canvas';
  var style = canvas.style;
  style.position = 'fixed';
  style.top = '0';
  style.left = '0';
  style.width = '100%';
  style.height = '100%';
  style.zIndex = '-1';
  style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var stars = [];
  var w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    var count = Math.floor((w * h) / 4500);
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        driftX: (Math.random() - 0.5) * 0.05,
        driftY: (Math.random() - 0.5) * 0.05
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.driftX;
      s.y += s.driftY;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;
      var alpha = s.baseAlpha + Math.sin(s.phase) * 0.25;
      s.phase += s.twinkleSpeed;
      if (alpha < 0.05) alpha = 0.05;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  requestAnimationFrame(draw);

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      initStars();
    }, 200);
  });
})();
