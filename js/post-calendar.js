(function () {
  var aside = document.getElementById('aside-content');
  if (!aside) return;

  function getPostDays() {
    var days = {};
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var m = links[i].getAttribute('href') && links[i].getAttribute('href').match(/^\/(\d{4})\/(\d{2})\/(\d{2})\//);
      if (m) {
        var key = m[1] + '-' + m[2] + '-' + m[3];
        if (!days[key]) days[key] = m[1] + '/' + m[2] + '/' + m[3];
      }
    }
    return days;
  }

  function render() {
    var postDays = getPostDays();
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    var weekNames = ['日','一','二','三','四','五','六'];

    var cells = '';
    for (var w = 0; w < weekNames.length; w++) {
      cells += '<div class="pc-cell pc-week">' + weekNames[w] + '</div>';
    }
    for (var b = 0; b < firstDay; b++) {
      cells += '<div class="pc-cell pc-blank"></div>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var mm = String(month + 1).padStart(2, '0');
      var dd = String(d).padStart(2, '0');
      var key = year + '-' + mm + '-' + dd;
      var has = postDays[key];
      var cls = 'pc-cell' + (has ? ' pc-has' : '') + (d === today.getDate() ? ' pc-today' : '');
      cells += has
        ? '<a class="' + cls + '" href="/' + year + '/' + mm + '/' + dd + '/" title="' + key + ' 有文章">' + d + '</a>'
        : '<div class="' + cls + '">' + d + '</div>';
    }

    var widget = document.createElement('div');
    widget.className = 'card-widget card-post-calendar';
    widget.innerHTML =
      '<div class="item-headline"><i class="fas fa-calendar-days"></i><span>发文日历</span></div>'
      + '<div class="pc-title">' + year + ' 年 ' + monthNames[month] + '</div>'
      + '<div class="pc-grid">' + cells + '</div>';
    aside.appendChild(widget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
