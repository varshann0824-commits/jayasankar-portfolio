document.documentElement.classList.add('js-motion');

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
  });
});

const bust = document.querySelector('#abstract-bust');
const heroVisual = document.querySelector('.hero-visual');
const canTilt = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (bust && heroVisual && canTilt) {
  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    bust.style.transform = `rotateY(${x * 22 - 18}deg) rotateX(${y * -9 + 4}deg) translateZ(6px)`;
  });
  heroVisual.addEventListener('pointerleave', () => {
    bust.style.transform = '';
  });
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const sequenceItems = document.querySelectorAll('.sequence-item');
if (sequenceItems.length) {
  const sequenceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.28, rootMargin: '0px 0px -10% 0px' });
  sequenceItems.forEach((item) => sequenceObserver.observe(item));
}

const progress = document.querySelector('.scroll-progress');
const motionCards = document.querySelectorAll('.motion-card');
const scrollShiftItems = document.querySelectorAll('[data-scroll-shift]');
const canScrollAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const updateScrollProgress = () => {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  if (canScrollAnimate) {
    scrollShiftItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      const distance = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight;
      const shift = Math.max(-14, Math.min(14, distance * 18));
      item.style.setProperty('--scroll-shift', `${shift.toFixed(2)}px`);
    });
  }
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

if (canScrollAnimate && window.matchMedia('(min-width: 760px)').matches) {
  motionCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -2.8}deg) rotateY(${x * 3.4}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const form = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `Portfolio enquiry from ${data.get('name')}`;
  const body = `Hi Yarram,%0D%0A%0D%0A${encodeURIComponent(data.get('message'))}%0D%0A%0D%0AYou can reply to me at ${encodeURIComponent(data.get('email'))}.`;
  window.location.href = `mailto:varshann0824@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  if (formNote) formNote.textContent = 'Your email app should open with the note ready to send.';
});
