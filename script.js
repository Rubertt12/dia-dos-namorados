const startDate = new Date('2015-07-26T00:00:00');

// As quatro fotos são carregadas separadamente para evitar que o GitHub/Vercel
// altere ou corte os arquivos enviados. A ordem é: 9 -> 11 -> 10 -> 8.
const photoDataScripts = [
  'assets/photo1-data.js',
  'assets/photo2-data.js',
  'assets/photo3-data.js',
  'assets/photo4-data.js'
];

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

async function loadCorrectPhotos() {
  for (const src of photoDataScripts) {
    await loadScript(src);
  }

  const sources = [window.PHOTO1, window.PHOTO2, window.PHOTO3, window.PHOTO4];
  const images = [...document.querySelectorAll('.gallery .photo img')];

  images.forEach((img, index) => {
    const source = sources[index];
    if (!source) return;

    img.src = source;
    img.removeAttribute('srcset');

    const button = img.closest('.photo-open');
    if (button) button.dataset.full = source;
  });
}

loadCorrectPhotos();

function updateCounter() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = now - startDate;
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
}

updateCounter();
setInterval(updateCounter, 60 * 1000);

const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const showPlayer = () => {
  const box = document.getElementById('playerBox');
  const iframe = document.getElementById('ytPlayer');
  if (box.hidden) {
    box.hidden = false;
    if (!iframe.src) iframe.src = iframe.dataset.src;
  }
  document.getElementById('musica').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

document.getElementById('showPlayer')?.addEventListener('click', showPlayer);
document.getElementById('playMusic')?.addEventListener('click', showPlayer);

const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseMsg = document.getElementById('surpriseMsg');
surpriseBtn?.addEventListener('click', () => {
  surpriseMsg.hidden = false;
  burstHearts(26);
  surpriseBtn.textContent = 'NHAAA 💕';
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('.photo-open').forEach(btn => {
  btn.addEventListener('click', () => {
    const renderedPhoto = btn.querySelector('img');
    lightboxImg.src = renderedPhoto?.src || btn.dataset.full;
    lightboxCaption.textContent = btn.dataset.caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

function hideLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
}
closeLightbox?.addEventListener('click', hideLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) hideLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) hideLightbox();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const heartsLayer = document.getElementById('floatingHearts');
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = Math.random() > 0.5 ? '♥' : '💗';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (16 + Math.random() * 18) + 'px';
  heart.style.animationDuration = (8 + Math.random() * 6) + 's';
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
function burstHearts(total = 12) {
  for (let i = 0; i < total; i += 1) {
    setTimeout(createHeart, i * 80);
  }
}
setInterval(createHeart, 1000);
burstHearts(14);
