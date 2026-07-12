// ============================
//  CRUSH PROPOSAL CV – SWARA
//  script.js  💍
// ============================

/* ── Floating Hearts Canvas ── */
(function () {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = (canvas.width  = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const EMOJIS = ['❤️', '💕', '💖', '💗', '💍', '💘', '🌹', '✨', '💓'];
  const HEARTS  = [];
  const TOTAL   = 30;

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function spawnHeart() {
    return {
      x       : rand(0, W),
      y       : H + rand(20, 80),
      size    : rand(13, 36),
      speed   : rand(0.5, 2.0),
      drift   : rand(-0.7, 0.7),
      opacity : rand(0.4, 0.95),
      emoji   : EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      rotation: rand(-25, 25),
      rotSpeed: rand(-0.4, 0.4),
      wobble  : rand(0, Math.PI * 2),
      wobbleS : rand(0.01, 0.04),
    };
  }

  for (let i = 0; i < TOTAL; i++) {
    const h = spawnHeart();
    h.y = rand(0, H);
    HEARTS.push(h);
  }

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const h of HEARTS) {
      ctx.save();
      ctx.globalAlpha = h.opacity;
      ctx.font = `${h.size}px serif`;
      ctx.translate(h.x, h.y);
      ctx.rotate((h.rotation * Math.PI) / 180);
      ctx.fillText(h.emoji, 0, 0);
      ctx.restore();

      h.wobble += h.wobbleS;
      h.x      += h.drift + Math.sin(h.wobble) * 0.5;
      h.y      -= h.speed;
      h.rotation += h.rotSpeed;

      if (h.y + h.size < 0) Object.assign(h, spawnHeart());
    }
    requestAnimationFrame(draw);
  })();
})();


/* ── Skill Bar Animations ── */
(function () {
  const fills = document.querySelectorAll('.skill-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = (e.target.dataset.percent || 0) + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(el => obs.observe(el));
})();


/* ── Section Reveal ── */
(function () {
  const sections = document.querySelectorAll('.cv-section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(sec => {
    sec.style.opacity    = '0';
    sec.style.transform  = 'translateY(32px)';
    sec.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
    obs.observe(sec);
  });
})();


/* ── Sparkle Click Effect ── */
(function () {
  const SPARKS = ['💖', '✨', '🌸', '💕', '💍', '⭐', '🌹'];

  document.addEventListener('click', e => {
    const count = 7;
    for (let i = 0; i < count; i++) {
      const span  = document.createElement('span');
      span.textContent = SPARKS[Math.floor(Math.random() * SPARKS.length)];
      span.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        font-size:${11 + Math.random() * 18}px;
        pointer-events:none;z-index:9999;
        transform:translate(-50%,-50%);
      `;
      const angle  = (360 / count) * i + rand(-20, 20);
      const radius = rand(45, 75);
      const dx = Math.cos((angle * Math.PI) / 180) * radius;
      const dy = Math.sin((angle * Math.PI) / 180) * radius;

      span.animate(
        [
          { opacity: 1, transform: `translate(-50%,-50%) scale(1)` },
          { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)` }
        ],
        { duration: 900, easing: 'cubic-bezier(0,0.9,0.57,1)', fill: 'forwards' }
      );
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 950);
    }
  });

  function rand(a, b) { return Math.random() * (b - a) + a; }
})();


/* ── Typing Tagline ── */
(function () {
  const el = document.getElementById('love-tagline');
  if (!el) return;

  const phrases = [
    'Your Favourite Person, Forever & Always 💕',
    'The One Who Will Never Take You For Granted 🌹',
    'Your Personal Sunshine on Rainy Days ☀️',
    'Someone Who Thinks About You Way Too Much 😅❤️',
  ];

  let pIdx = 0, cIdx = 0, del = false;

  function type() {
    const cur = phrases[pIdx];
    el.textContent = del ? cur.slice(0, cIdx - 1) : cur.slice(0, cIdx + 1);
    del ? cIdx-- : cIdx++;

    if (!del && cIdx === cur.length) { del = true; setTimeout(type, 2400); return; }
    if (del && cIdx === 0) { del = false; pIdx = (pIdx + 1) % phrases.length; }

    setTimeout(type, del ? 38 : 62);
  }
  type();
})();


/* ── NO Button Runs Away ── */
function runAway(btn) {
  const vw = window.innerWidth  - btn.offsetWidth  - 20;
  const vh = window.innerHeight - btn.offsetHeight - 20;
  const x  = Math.floor(Math.random() * vw);
  const y  = Math.floor(Math.random() * vh);
  btn.style.position = 'fixed';
  btn.style.left     = x + 'px';
  btn.style.top      = y + 'px';
  btn.style.zIndex   = '9999';
  btn.style.transition = 'left 0.25s ease, top 0.25s ease';
}


/* ── YES Button Handler ── */
function handleYes() {
  // Hide buttons
  document.getElementById('proposal-buttons').style.display = 'none';

  // Show response message
  const msg = document.getElementById('response-message');
  msg.innerHTML = '🎉 SHE SAID YES!!! 💍 You just made me the happiest person alive! 🌹💕';

  // Fire confetti
  fireConfetti();

  // Extra hearts burst
  for (let i = 0; i < 20; i++) {
    setTimeout(() => burstHeart(), i * 120);
  }
}

function burstHeart() {
  const el = document.createElement('div');
  el.textContent = ['💖','💕','❤️','💍','🌹'][Math.floor(Math.random() * 5)];
  el.style.cssText = `
    position:fixed;
    left:${10 + Math.random() * 80}vw;
    top:${Math.random() * 100}vh;
    font-size:${24 + Math.random() * 30}px;
    pointer-events:none;
    z-index:9998;
    animation: floatBurst 2s ease forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2100);
}

/* ── Confetti burst ── */
function fireConfetti() {
  const container = document.getElementById('confetti-container');
  const colors    = ['#e8305a','#ff6b8a','#d4a843','#f0c96e','#ff94b4','#fff','#c0183f'];

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${2 + Math.random() * 3}s;
      animation-delay: ${Math.random() * 1.5}s;
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

/* ── CSS for float burst (injected) ── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatBurst {
      0%   { transform: translateY(0) scale(0.7) rotate(0deg); opacity:1; }
      100% { transform: translateY(-60vh) scale(1.3) rotate(40deg); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();
