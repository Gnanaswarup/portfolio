// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Typewriter effect =====
const phrases = [
    'Curious Learner & Tech Explorer',
    'MCA Student',
    'Python Developer',
    'Data Enthusiast',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
        typeEl.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(type, 400); return; }
    } else {
        typeEl.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) { deleting = true; setTimeout(type, 1800); return; }
    }
    setTimeout(type, deleting ? 50 : 80);
}
type();

// ===== Particle canvas =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.section-header, .skill-card, .project-card, .contact-card, .fact-card, .about-text, .stats-card');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== Skill bar animation =====
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animated'), 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
skillCards.forEach(c => skillObserver.observe(c));

// ===== Contact form =====
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = '✓ Sent!';
        document.getElementById('formSuccess').style.display = 'block';
        e.target.reset();
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;
            document.getElementById('formSuccess').style.display = 'none';
        }, 4000);
    }, 1200);
}

// ===== Hamburger (mobile nav) =====
document.getElementById('hamburger').addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '70px';
    links.style.right = '24px';
    links.style.background = '#0b1628';
    links.style.padding = '16px 24px';
    links.style.borderRadius = '12px';
    links.style.border = '1px solid rgba(59,130,246,0.15)';
    links.style.gap = '16px';
});
