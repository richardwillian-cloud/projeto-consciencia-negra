(function () {
  document.documentElement.classList.add('js');
  var items = document.querySelectorAll('.item');

  function set(item, open) {
    item.classList.toggle('open', open);
    item.querySelector('.head').setAttribute('aria-expanded', open);
  }

  // Clique nos títulos (um item aberto por vez)
  items.forEach(function (item) {
    item.querySelector('.head').addEventListener('click', function () {
      var willOpen = !item.classList.contains('open');
      items.forEach(function (i) { if (i !== item) set(i, false); });
      set(item, willOpen);
      if (willOpen) {
        setTimeout(function () {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
      }
    });
  });

  // Abrir / fechar tudo
  document.getElementById('abrir').onclick = function () {
    items.forEach(function (i) { set(i, true); });
  };
  document.getElementById('fechar').onclick = function () {
    items.forEach(function (i) { set(i, false); });
  };

  // Animação de entrada ao rolar
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (i) { io.observe(i); });
  } else {
    items.forEach(function (i) { i.classList.add('show'); });
  }
})();