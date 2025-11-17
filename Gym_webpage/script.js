AOS.init();

// DARK/LIGHT MODE
const toggle = document.getElementById('toggleMode');
const body = document.body;
const nav = document.getElementById('navbar');
toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    nav.classList.toggle('light');
    toggle.textContent = body.classList.contains('light') ? 'Dark' : 'Light';
});

// COUNTERS
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const update = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const speed = 50;
        if (count < target) {
            counter.innerText = count + 1;
            setTimeout(update, speed);
        } else counter.innerText = target;
    };
    update();
});

// BILLING SWITCH
const switchBtn = document.getElementById('billingSwitch');
const prices = document.querySelectorAll('.price');

switchBtn.addEventListener('change', () => {
    prices.forEach(price => {
        price.textContent = switchBtn.checked
            ? `₹${price.getAttribute('data-year')}`
            : `₹${price.getAttribute('data-month')}`;
    });
});

// CONTACT FORM VALIDATION
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message Sent Successfully!');
    form.reset();
});

// WHATSAPP BUTTON
const whatsapp = document.getElementById('whatsapp');
whatsapp.onclick = () => {
    window.open('https://wa.me/919515507061', '_blank');
};