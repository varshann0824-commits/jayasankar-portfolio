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
