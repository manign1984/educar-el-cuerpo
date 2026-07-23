(() => {
  const filters = [...document.querySelectorAll('[data-context-filter]')];
  const events = [...document.querySelectorAll('#timeline li')];
  const status = document.getElementById('contextFilterStatus');

  const setFilter = (filter) => {
    let visible = 0;
    filters.forEach((button) => {
      const active = button.dataset.contextFilter === filter;
      button.setAttribute('aria-pressed', String(active));
    });

    events.forEach((event) => {
      const axes = (event.dataset.axes || '').split(' ');
      const show = filter === 'all' || axes.includes(filter);
      event.hidden = !show;
      if (show) {
        visible += 1;
        requestAnimationFrame(() => event.classList.add('is-visible'));
      } else {
        event.classList.remove('is-visible');
      }
    });

    if (status) {
      const label = filter === 'all'
        ? 'todos los procesos'
        : filters.find((button) => button.dataset.contextFilter === filter)?.dataset.filterLabel || filter;
      status.textContent = `${visible} hitos visibles · enfoque: ${label}.`;
    }
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.contextFilter));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hidden) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -8%'});

  events.forEach((event) => observer.observe(event));
  setFilter('all');
})();
