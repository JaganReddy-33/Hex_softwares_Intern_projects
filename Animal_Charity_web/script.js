AOS.init({ duration: 700, once: true });

/* NAVBAR hamburger */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* Theme toggle */
(function () {
  const themeBtn = document.getElementById('themeBtn');
  // check saved preference
  const saved = localStorage.getItem('pawhope-theme');
  if (saved === 'light') document.body.classList.add('light');
  themeBtn.onclick = () => {
    document.body.classList.toggle('light');
    localStorage.setItem('pawhope-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  }
})();

/* Navbar shadow on scroll */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* Lightbox */
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }

/* Pet modal data */
const pets = [
  { name: 'Snowy', age: '2 years', type: 'Cat', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1000&q=60', bio: 'A cuddly cat who loves naps and sunbeams. Ideal for indoor homes.', vax: 'Yes', good: 'Cats, older children' },
  { name: 'Bruno', age: '3 years', type: 'Dog', img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=60', bio: 'Energetic and playful, enjoys walks and games. Needs active family.', vax: 'Yes', good: 'Kids, Dogs' },
  { name: 'Luna', age: '1 year', type: 'Cat', img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=60', bio: 'Gentle and curious kitten, warms up quickly with patience.', vax: 'No', good: 'Adults, Cats' }
];

function openPetModal(i) {
  const p = pets[i];
  document.getElementById('petImage').src = p.img;
  document.getElementById('petName').innerText = `${p.name} • ${p.age} (${p.type})`;
  document.getElementById('petBio').innerText = p.bio;
  document.getElementById('petVax').innerText = p.vax;
  document.getElementById('petGood').innerText = p.good;
  document.getElementById('petModal').classList.add('open');
  document.getElementById('petModal').setAttribute('aria-hidden', 'false');
}
function closePetModal() {
  document.getElementById('petModal').classList.remove('open');
  document.getElementById('petModal').setAttribute('aria-hidden', 'true');
}

function applyAdoption() {
  closePetModal();
  location.hash = '#contact';
  alert('Thanks — adoption interest noted. Please fill the contact form to continue.');
}

/* Donate modal */
function openDonate() { document.getElementById('donateModal').classList.add('open'); }
function closeDonate() { document.getElementById('donateModal').classList.remove('open'); }
function donateAmount(v) {
  closeDonate();
  alert('Thanks for donating ₹' + v + ' — your support saves lives!');
}
function donateCustom() {
  const v = document.getElementById('customAmount').value || 0;
  if (isNaN(v) || v <= 0) alert('Enter a valid amount');
  else donateAmount(v);
}

/* Volunteer modal */
function openVolunteer() { document.getElementById('volModal').classList.add('open'); }
function closeVolunteer() { document.getElementById('volModal').classList.remove('open'); }

/* Contact form handler */
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  // simple validation
  const name = form.name?.value || '';
  const email = form.email?.value || '';
  const message = form.message?.value || '';
  if (!name || !email || !message) { alert('Please fill all required fields'); return; }
  // pretend sending
  alert('Thank you, ' + name + '! Your message has been received.');
  form.reset();
  // You can integrate a backend endpoint here.
}

/* Volunteer submit */
function handleVolunteer(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  if (!data.get('vname') || !data.get('vemail') || !data.get('vphone')) { alert('Please fill required fields'); return; }
  alert('Thanks for applying to volunteer! We will contact you at ' + data.get('vemail'));
  e.target.reset();
  closeVolunteer();
}

/* Counters animation when in view */
const nums = document.querySelectorAll('.num');
let counted = false;
function countUp() {
  if (counted) return;
  const top = document.getElementById('impact').getBoundingClientRect().top;
  if (top < window.innerHeight - 80) {
    nums.forEach(n => {
      const target = +n.getAttribute('data-target'); let cur = 0;
      const step = Math.max(1, Math.floor(target / 150));
      const timer = setInterval(() => { cur += step; if (cur >= target) { n.innerText = target; clearInterval(timer); } else n.innerText = cur; }, 16);
    });
    counted = true;
  }
}
window.addEventListener('scroll', countUp);
window.addEventListener('load', countUp);

/* simple helpful functions */
function scrollToElement(sel) {
  document.querySelector(sel).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* close modal when clicking outside */
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', (e) => { if (e.target === o) o.classList.remove('open'); });
});

/* accessible escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { document.querySelectorAll('.overlay.open').forEach(m => m.classList.remove('open')); }
});