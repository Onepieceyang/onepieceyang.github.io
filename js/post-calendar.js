(function () {
  function init() {
    try {
      var aside = document.getElementById('aside-content');
      if (!aside || document.getElementById('pc-widget')) return;

      var style = document.createElement('style');
      style.textContent =
        '#pc-widget{background:var(--card-bg,#fff);border-radius:8px;padding:16px 18px;margin-bottom:16px;box-shadow:var(--card-box-shadow)}' +
        '#pc-widget .pc-head{font-weight:600;margin-bottom:10px;display:flex;align-items:center;gap:8px;font-size:1em}' +
        '#pc-widget .pc-month{text-align:center;font-weight:600;margin-bottom:8px;color:var(--text-color,#4c4948)}' +
        '#pc-widget .pc-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}' +
        '#pc-widget .pc-cell{display:flex;align-items:center;justify-content:center;height:28px;font-size:13px;border-radius:6px;color:var(--text-color,#4c4948)}' +
        '#pc-widget .pc-week{color:var(--meta-color,#999);font-size:12px;font-weight:600}' +
        '#pc-widget a.pc-cell{text-decoration:none}' +
        '#pc-widget .pc-has{background:rgba(74,144,217,.18);color:var(--link-color,#4a90d9);font-weight:600}' +
        '#pc-widget .pc-has:hover{background:rgba(74,144,217,.35)}' +
        '#pc-widget .pc-today{border:1px solid var(--link-color,#4a90d9)}';
      document.head.appendChild(style);

      var days = {};
      var links = document.querySelectorAll('a[href]');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href') || '';
        var m = href.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\//);
        if (m && !days[m[1] + '-' + m[2] + '-' + m[3]]) {
          days[m[1] + '-' + m[2] + '-' + m[3]] = href;
        }
      }

      var now = new Date();
      var y = now.getFullYear();
      var mo = now.getMonth();
      var firstDay = new Date(y, mo, 1).getDay();
      var daysInMonth = new Date(y, mo + 1, 0).getDate();
      var monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
      var weekNames = ['日','一','二','三','四','五','六'];

      var cells = '';
      for (var w = 0; w < 7; w++) cells += '<div class="pc-cell pc-week">' + weekNames[w] + '</div>';
      for (var b = 0; b < firstDay; b++) cells += '<div class="pc-cell"></div>';
      for (var d = 1; d <= daysInMonth; d++) {
        var mm = String(mo + 1).padStart(2, '0');
        var dd = String(d).padStart(2, '0');
        var key = y + '-' + mm + '-' + dd;
        var postUrl = days[key];
        var cls = 'pc-cell' + (postUrl ? ' pc-has' : '') + (d === now.getDate() ? ' pc-today' : '');
        cells += postUrl
          ? '<a class="' + cls + '" href="' + postUrl + '" title="' + key + '">' + d + '</a>'
          : '<div class="' + cls + '">' + d + '</div>';
      }

      var widget = document.createElement('div');
      widget.id = 'pc-widget';
      widget.innerHTML =
        '<div class="pc-head">发文日历</div>'
        + '<div class="pc-month">' + y + ' 年 ' + monthNames[mo] + '</div>'
        + '<div class="pc-grid">' + cells + '</div>';
      aside.insertBefore(widget, aside.firstChild);
    } catch (e) {
      if (window.console) console.warn('calendar skipped:', e);
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(init, 300);
  } else {
    window.addEventListener('load', function () { setTimeout(init, 300); });
  }
})();
