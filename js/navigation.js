(() => {
  const c = window.SITE_CONTENT;
  const topbar = document.getElementById('topbar');
  const sectionCount = document.getElementById('sectionCount');
  const sectionName = document.getElementById('sectionName');
  const progressTrack = document.querySelector('.progress-track');
  const progressBar = document.getElementById('progressBar');
  const sections = c.sections.map(([id]) => document.getElementById(id));
  const buttons = [...document.querySelectorAll('#mainNav button')];
  let activeIndex = -1;
  let framePending = false;

  progressTrack?.setAttribute('role', 'progressbar');
  progressTrack?.setAttribute('aria-valuemin', '1');
  progressTrack?.setAttribute('aria-valuemax', String(c.sections.length));

  buttons.forEach((button, index) => {
    button.type = 'button';
    button.dataset.index = String(index);
    button.setAttribute('aria-label', `Ir a ${c.sections[index][1]}`);
  });

  const activate = index => {
    if (index < 0 || index >= c.sections.length || index === activeIndex) return;
    activeIndex = index;
    const [, name] = c.sections[index];
    sectionCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(c.sections.length).padStart(2, '0')}`;
    sectionName.textContent = name;
    progressBar.style.width = `${((index + 1) / c.sections.length) * 100}%`;
    progressTrack?.setAttribute('aria-valuenow', String(index + 1));
    progressTrack?.setAttribute('aria-valuetext', `${name}, sección ${index + 1} de ${c.sections.length}`);

    buttons.forEach((button, i) => {
      const current = i === index;
      button.classList.toggle('active', current);
      if (current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });

    if (window.innerWidth > 980) {
      buttons[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const calculateActive = () => {
    framePending = false;
    const marker = (topbar?.offsetHeight || 78) + Math.min(190, window.innerHeight * 0.3);
    let index = 0;

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      index = sections.length - 1;
    } else {
      sections.forEach((section, i) => {
        if (section?.getBoundingClientRect().top <= marker) index = i;
      });
    }
    activate(index);
  };

  const requestCalculation = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(calculateActive);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(requestCalculation, {
      root: null,
      rootMargin: `-${topbar?.offsetHeight || 78}px 0px -42% 0px`,
      threshold: [0, 0.08, 0.2, 0.45, 0.7, 1]
    });
    sections.forEach(section => section && observer.observe(section));
  }

  addEventListener('scroll', requestCalculation, { passive: true });
  addEventListener('resize', requestCalculation, { passive: true });
  addEventListener('hashchange', requestCalculation);
  calculateActive();
})();
