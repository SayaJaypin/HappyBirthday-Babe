/**
 * Romantic Birthday Web Experience
 * Targeted for September 19th, 2004
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. LOADER & TYPING EFFECT
     ========================================================================== */
  const loaderOverlay = document.getElementById('loadingOverlay');
  const loaderBar = document.getElementById('loaderBar');
  const loaderTypingText = document.getElementById('loaderTypingText');
  const enterSiteBtn = document.getElementById('enterSiteBtn');

  const typingPhrases = [
    "Gathering sweet moments...",
    "Baking virtual birthday cake...",
    "Waking up the Capybara mascot...",
    "Tuning Daniel Caesar - Always...",
    "Everything is ready for you!"
  ];

  let phraseIdx = 0;
  let charIdx = 0;

  function typeText() {
    if (phraseIdx < typingPhrases.length) {
      const currentPhrase = typingPhrases[phraseIdx];
      if (charIdx < currentPhrase.length) {
        loaderTypingText.textContent += currentPhrase.charAt(charIdx);
        charIdx++;
        setTimeout(typeText, 45);
      } else {
        setTimeout(() => {
          loaderTypingText.textContent = '';
          charIdx = 0;
          phraseIdx++;
          typeText();
        }, 800);
      }
    }
  }

  typeText();

  // Progress Bar Simulation
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 5;
    loaderBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(progressInterval);
      enterSiteBtn.classList.remove('hidden');
    }
  }, 100);

  enterSiteBtn.addEventListener('click', () => {
    loaderOverlay.style.opacity = '0';
    setTimeout(() => {
      loaderOverlay.style.display = 'none';
      playAudio();
    }, 500);
  });

  /* ==========================================================================
     2. AUDIO ENGINE & MUSIC PLAYER
     ========================================================================== */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const vinylDisk = document.getElementById('vinylDisk');
  const audioScrubber = document.getElementById('audioScrubber');
  const volumeControl = document.getElementById('volumeControl');
  const mainCapybara = document.getElementById('mainCapybara');

  let isPlaying = false;

  function playAudio() {
    bgMusic.play().then(() => {
      isPlaying = true;
      updateAudioUI();
    }).catch(() => {
      isPlaying = false;
      updateAudioUI();
    });
  }

  function pauseAudio() {
    bgMusic.pause();
    isPlaying = false;
    updateAudioUI();
  }

  function updateAudioUI() {
    if (isPlaying) {
      musicToggleBtn.classList.add('music-playing');
      vinylDisk.classList.add('spinning');
      playPauseBtn.textContent = '⏸';
      mainCapybara.classList.remove('idle');
      mainCapybara.classList.add('dancing');
    } else {
      musicToggleBtn.classList.remove('music-playing');
      vinylDisk.classList.remove('spinning');
      playPauseBtn.textContent = '▶';
      mainCapybara.classList.remove('dancing');
      mainCapybara.classList.add('idle');
    }
  }

  musicToggleBtn.addEventListener('click', () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  });

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  });

  bgMusic.addEventListener('timeupdate', () => {
    if (bgMusic.duration) {
      const pct = (bgMusic.currentTime / bgMusic.duration) * 100;
      audioScrubber.value = pct;
    }
  });

  audioScrubber.addEventListener('input', (e) => {
    if (bgMusic.duration) {
      bgMusic.currentTime = (e.target.value / 100) * bgMusic.duration;
    }
  });

  volumeControl.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value;
  });

  /* ==========================================================================
     3. BIRTHDAY COUNTDOWN ENGINE
     ========================================================================== */
  function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let targetDate = new Date(`September 19, ${currentYear} 00:00:00`);

    if (now > targetDate) {
      targetDate = new Date(`September 19, ${currentYear + 1} 00:00:00`);
    }

    const diff = targetDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = d < 10 ? `0${d}` : d;
    document.getElementById('hours').textContent = h < 10 ? `0${h}` : h;
    document.getElementById('minutes').textContent = m < 10 ? `0${m}` : m;
    document.getElementById('seconds').textContent = s < 10 ? `0${s}` : s;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     4. CAPYBARA MASCOT INTERACTIVITY
     ========================================================================== */
  const capyBubbleText = document.getElementById('capyBubbleText');
  const capyHeldItem = document.getElementById('capyHeldItem');

  const capyMessages = [
    "Happy Birthday to the sweetest girl! 🦫💕",
    "You are doing amazing every day!",
    "Here's a warm capybara hug for you!",
    "Always remember how loved you are!",
    "Don't forget to eat some birthday cake!"
  ];

  mainCapybara.addEventListener('click', () => {
    const randomMsg = capyMessages[Math.floor(Math.random() * capyMessages.length)];
    capyBubbleText.textContent = randomMsg;
    
    // Toggle held item visually
    const items = capyHeldItem.children;
    for (let item of items) item.classList.add('hidden');
    const randomItemIdx = Math.floor(Math.random() * items.length);
    items[randomItemIdx].classList.remove('hidden');

    // Bounce capybara
    mainCapybara.style.transform = 'scale(1.15) rotate(5deg)';
    setTimeout(() => {
      mainCapybara.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  });

  /* ==========================================================================
     5. LIGHTBOX MODAL
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightbox');
  const galleryCards = document.querySelectorAll('.gallery-card');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      const caption = card.getAttribute('data-caption');
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightboxModal.classList.add('active');
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-overlay')) {
      lightboxModal.classList.remove('active');
    }
  });

  /* ==========================================================================
     6. GIFT TREASURY MODAL
     ========================================================================== */
  const giftCards = document.querySelectorAll('.gift-card');
  const giftModal = document.getElementById('giftModal');
  const giftModalBody = document.getElementById('giftModalBody');
  const closeGiftModal = document.getElementById('closeGiftModal');

  const giftData = {
    coupon: {
      title: "🎫 Unlimited Love Coupon",
      desc: "Good for 1x Midnight Snack Date, 1x Unlimited Hug Pass, and 1x Movie Night Pick!"
    },
    flowers: {
      title: "💐 Eternal Pink Bouquet",
      desc: "These virtual roses and pink peonies will never wither, remaining as fresh as my love."
    },
    chocolates: {
      title: "🍫 Artisan Chocolate Box",
      desc: "Filled with sweet caramel, strawberry truffle, and milk chocolate delight!"
    },
    jar: {
      title: "🏺 100 Love Notes Jar",
      desc: "Reason #1: Your genuine laughter makes everything better."
    },
    bottle: {
      title: "🍾 Wish Bottle",
      desc: "I wished for your endless happiness and peace today and forever."
    },
    ring: {
      title: "💍 Eternal Promise Card",
      desc: "I promise to hold your hand through every season of life."
    }
  };

  giftCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-gift');
      const data = giftData[key];
      if (data) {
        giftModalBody.innerHTML = `
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 10px;">${data.title}</h3>
          <p style="color: var(--color-soft-brown); line-height: 1.6;">${data.desc}</p>
        `;
        giftModal.classList.add('active');
      }
    });
  });

  closeGiftModal.addEventListener('click', () => giftModal.classList.remove('active'));

  /* ==========================================================================
     7. ENVELOPE WAX SEAL INTERACTIVITY
     ========================================================================== */
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('waxSeal');

  waxSeal.addEventListener('click', () => {
    envelope.classList.add('open');
  });

  /* ==========================================================================
     8. 3D CAKE CANDLE BLOWING
     ========================================================================== */
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const candles = document.querySelectorAll('.candle');
  const wishMessage = document.getElementById('wishMessage');

  blowCandlesBtn.addEventListener('click', () => {
    candles.forEach(candle => candle.classList.add('extinguished'));
    wishMessage.classList.remove('hidden');
    triggerConfetti();
  });

  function triggerConfetti() {
    // Canvas sparkle effect during celebration
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(window.innerWidth / 2, window.innerHeight / 2, true));
    }
  }

  /* ==========================================================================
     9. COMPLIMENT GENERATOR
     ========================================================================== */
  const compliments = [
    "Your smile is my absolute favorite sight in the world. 💖",
    "You have the kindest, gentlest soul.",
    "Everything is more fun when I'm with you.",
    "You look breathtakingly beautiful today and every day.",
    "Thank you for existing and being you!"
  ];

  const generateSurpriseBtn = document.getElementById('generateSurpriseBtn');
  const complimentText = document.getElementById('complimentText');

  generateSurpriseBtn.addEventListener('click', () => {
    const randomComp = compliments[Math.floor(Math.random() * compliments.length)];
    complimentText.textContent = randomComp;
  });

  /* ==========================================================================
     10. AMBIENT PARTICLE CANVAS SYSTEM
     ========================================================================== */
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.size = Math.random() * 8 + 4;
      this.speedX = isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.5;
      this.speedY = isBurst ? (Math.random() - 0.5) * 8 : -Math.random() * 1.5 - 0.5;
      this.color = `hsla(${Math.random() * 40 + 340}, 100%, 75%, ${Math.random() * 0.4 + 0.4})`;
      this.shape = Math.random() > 0.5 ? 'heart' : 'circle';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      if (this.shape === 'circle') {
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      } else {
        // Draw Heart Shape
        ctx.arc(this.x - this.size / 4, this.y - this.size / 4, this.size / 4, 0, Math.PI, true);
        ctx.arc(this.x + this.size / 4, this.y - this.size / 4, this.size / 4, 0, Math.PI, true);
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  animateParticles();

});
