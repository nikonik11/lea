/**
 * Highlights the active section link in the "Dans cet article" sidebar
 * table of contents while the reader scrolls through the article.
 */
(function () {
  var tocContainer = document.querySelector('[data-article-toc]');
  if (!tocContainer) return;

  var links = Array.prototype.slice.call(tocContainer.querySelectorAll('[data-toc-link]'));
  if (!links.length) return;

  var targets = links
    .map(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var target = document.getElementById(id);
      return target ? { link: link, target: target } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  function setActive(link) {
    links.forEach(function (item) {
      item.classList.toggle('is-active', item === link);
    });
  }

  if (!('IntersectionObserver' in window)) {
    setActive(links[0]);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = targets.find(function (item) {
          return item.target === entry.target;
        });
        if (match) setActive(match.link);
      });
    },
    {
      rootMargin: '-15% 0px -70% 0px',
      threshold: 0,
    }
  );

  targets.forEach(function (item) {
    observer.observe(item.target);
  });

  setActive(links[0]);
})();
