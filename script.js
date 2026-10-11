/**
 * ============================================================================
 * WEBSITE ULANG TAHUN KE-18 ANA AYUNINGTYAS — SCRIPT ENGINE
 * SCENE-BY-SCENE INTERACTIVE MULTI-STEP PRESENTATION (NOT 1 LONG PAGE)
 * ============================================================================
 */

(function () {
  'use strict';

  // --- GLOBAL STATE ---
  let currentScene = 0; // 0: Intro, 1: Main, 2: Message, 3: Gallery, 4: Finale
  const totalScenes = 5;

  // --- AUDIO SYSTEM ---
  let isMuted = false;
  let bgmPlaying = false;

  const audioElements = {
    engine: document.getElementById('audio-engine'),
    countdown: document.getElementById('audio-countdown'),
    bgm: document.getElementById('audio-bgm'),
    drive: document.getElementById('audio-drive')
  };

  function playDriveSound() {
    if (isMuted) return;
    if (audioElements.drive) {
      audioElements.drive.currentTime = 0;
      audioElements.drive.volume = 1.0;
      audioElements.drive.play().catch(() => {});
    }
  }

  function playEngineSound() {
    if (isMuted) return;
    if (audioElements.engine) {
      audioElements.engine.currentTime = 0;
      audioElements.engine.volume = 0.7;
      audioElements.engine.play().catch(() => {});
    }
  }

  function playCountdownSound() {
    if (isMuted) return;
    if (audioElements.countdown) {
      audioElements.countdown.currentTime = 0;
      audioElements.countdown.volume = 1.0;
      audioElements.countdown.play().catch(() => {});
    }
  }


  function startBackgroundMusic() {
    if (bgmPlaying || isMuted) return;
    bgmPlaying = true;
    if (audioElements.bgm) {
      audioElements.bgm.loop = true;
      audioElements.bgm.volume = 0.35;
      audioElements.bgm.play().catch(() => {});
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('btn-audio-toggle');
    const icon = document.getElementById('audio-icon');

    if (isMuted) {
      btn.classList.add('muted');
      icon.textContent = '🔇';
      if (audioElements.bgm) audioElements.bgm.pause();
      if (audioElements.engine) audioElements.engine.pause();
      if (audioElements.countdown) audioElements.countdown.pause();
      if (audioElements.drive) audioElements.drive.pause();
      bgmPlaying = false;
      showToast('Suara dinonaktifkan 🔇');
    } else {
      btn.classList.remove('muted');
      icon.textContent = '🔊';
      getAudioContext();
      startBackgroundMusic();
      showToast('Suara diaktifkan 🔊');
    }
  }

  // --- CONFETTI SYSTEM ---
  function fireGrandConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#CC0000', '#FFD700', '#FF6B2B', '#FFFFFF', '#87CEEB']
      });

      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.65 },
          colors: ['#FFD700', '#CC0000', '#FF6B2B']
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 75,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.65 },
          colors: ['#FFD700', '#CC0000', '#FFFFFF']
        });
      }, 450);

      setTimeout(() => {
        confetti({
          particleCount: 45,
          spread: 120,
          origin: { y: 0.5 },
          shapes: ['star'],
          colors: ['#FFD700', '#FFA000', '#FFFFFF']
        });
      }, 700);
    }
  }

  function fireMiniConfetti(x, y) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: x || 0.5, y: y || 0.5 },
        colors: ['#FFD700', '#FF6B2B', '#CC0000']
      });
    }
  }

  // --- TOAST NOTIFICATIONS ---
  let toastTimer = null;
  function showToast(text, icon = '📋') {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = toast.querySelector('.toast-icon');

    if (toastText) toastText.textContent = text;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- SCENE MANAGER (TRANSITION BETWEEN INDIVIDUAL SCENES) ---
  const sceneElements = document.querySelectorAll('.scene');
  const progressSegments = document.querySelectorAll('.scene-progress-nav .progress-segment');
  let introCountdownTimer = null;

  function goToScene(index) {
    if (index < 0 || index >= totalScenes) return;
    currentScene = index;

    // 1. Update scene active classes
    sceneElements.forEach(el => {
      const sceneNum = parseInt(el.getAttribute('data-scene'), 10);
      el.classList.toggle('active', sceneNum === index);
      
      // Reset scroll of inner content container
      const scrollWrap = el.querySelector('.scene-scroll-content');
      if (scrollWrap) scrollWrap.scrollTop = 0;
    });

    // 2. Update Top Story-Style Progress Bar
    progressSegments.forEach((seg, i) => {
      seg.classList.remove('completed', 'active');
      if (i < index) {
        seg.classList.add('completed');
      } else if (i === index) {
        seg.classList.add('active');
      }
    });

    // 3. Trigger Scene-Specific Actions
    if (index === 0) {
      // Reset McQueen to idle state on the left
      const rig = document.getElementById('mcqueenIntroRig');
      if (rig) {
        rig.classList.remove('go');
        rig.classList.add('idle');
        rig.style.animation = 'none';
      }
      // Reset road scroll
      const roadLines = document.getElementById('introRoadLines');
      if (roadLines) roadLines.classList.remove('scrolling');
      // Reset traffic lights to off
      const bulbs = document.querySelectorAll('.traffic-light-bulb');
      bulbs.forEach(b => { b.className = 'traffic-light-bulb'; });
      // Show start button
      const btnStart = document.getElementById('btn-start-engine');
      if (btnStart) btnStart.style.display = 'inline-flex';
    } else if (index === 1) {
      // Main Birthday Scene
      clearTimeout(introCountdownTimer);
      setTimeout(() => {
        fireGrandConfetti();
        startBackgroundMusic();
      }, 500);
    } else if (index === 2) {
      // Personal Message Scene
      clearTimeout(introCountdownTimer);
    } else if (index === 3) {
      // Photo Gallery Scene
      clearTimeout(introCountdownTimer);
      carousel.goToSlide(0);
    } else if (index === 4) {
      // Grand Finale Scene
      clearTimeout(introCountdownTimer);
      setTimeout(() => {
        triggerMcqueenSpeedout();
        fireGrandConfetti();
      }, 400);
    }
  }

  // Traffic lights sequence - called after Start button is clicked
  function startIntroSequence() {
    clearTimeout(introCountdownTimer);
    const bulbs = document.querySelectorAll('.traffic-light-bulb');
    const rig = document.getElementById('mcqueenIntroRig');
    const roadLines = document.getElementById('introRoadLines');

    playCountdownSound();

    if (bulbs.length >= 3) {
      // RED - 1st beep (~1s)
      setTimeout(() => {
        bulbs[0].className = 'traffic-light-bulb red active';
        bulbs[1].className = 'traffic-light-bulb yellow';
        bulbs[2].className = 'traffic-light-bulb green';
      }, 1000);

      // YELLOW - 2nd beep (~2s)
      setTimeout(() => {
        bulbs[0].className = 'traffic-light-bulb red';
        bulbs[1].className = 'traffic-light-bulb yellow active';
      }, 2000);

      // GREEN — GO! - 3rd long beep (~3s)
      setTimeout(() => {
        bulbs[1].className = 'traffic-light-bulb yellow';
        bulbs[2].className = 'traffic-light-bulb green active';

        playDriveSound();

        // Remove idle, add GO class, scroll road
        if (rig) {
          rig.classList.remove('idle');
          rig.classList.add('go');
        }
        if (roadLines) roadLines.classList.add('scrolling');

        // Transition to Scene 2 after McQueen exits (1.2s after GO)
        introCountdownTimer = setTimeout(() => {
          if (currentScene === 0) goToScene(1);
        }, 1200);
      }, 3000);
    }
  }

  // --- MCQUEEN SPEED-OUT (SCENE 5) ---
  function triggerMcqueenSpeedout() {
    const speedoutCar = document.getElementById('mcqueenSpeedoutCar');
    if (speedoutCar) {
      speedoutCar.classList.remove('zoom');
      void speedoutCar.offsetWidth; // force reflow
      speedoutCar.classList.add('zoom');
    }
  }

  // --- SCENE 4: CAROUSEL / SLIDESHOW ---
  const carousel = {
    currentIndex: 0,
    totalSlides: 8,
    track: document.getElementById('carouselTrack'),
    dots: document.querySelectorAll('#carouselDots .dot'),
    counter: document.getElementById('carouselCounter'),
    viewport: document.getElementById('carouselViewport'),
    touchStartX: 0,
    touchEndX: 0,

    goToSlide(index) {
      if (index < 0) index = this.totalSlides - 1;
      if (index >= this.totalSlides) index = 0;
      this.currentIndex = index;

      if (this.track) {
        this.track.style.transform = `translateX(-${index * 100}%)`;
      }

      this.dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
      });

      if (this.counter) {
        this.counter.textContent = `${index + 1} / ${this.totalSlides}`;
      }
    },

    next() {
      this.goToSlide(this.currentIndex + 1);
    },

    prev() {
      this.goToSlide(this.currentIndex - 1);
    },

    init() {
      const btnNext = document.getElementById('btnCarouselNext');
      const btnPrev = document.getElementById('btnCarouselPrev');

      if (btnNext) btnNext.addEventListener('click', () => this.next());
      if (btnPrev) btnPrev.addEventListener('click', () => this.prev());

      this.dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.index, 10);
          this.goToSlide(idx);
        });
      });

      // Touch Gestures for Mobile Swipe inside gallery
      if (this.viewport) {
        this.viewport.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.viewport.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          const diffX = this.touchStartX - this.touchEndX;
          if (Math.abs(diffX) > 40) {
            if (diffX > 0) this.next(); // swipe left -> next
            else this.prev();           // swipe right -> prev
          }
        }, { passive: true });
      }
    }
  };

  // --- LIGHTBOX PREVIEW ---
  const photoData = [
    { src: 'assets/photos/foto1.jpg', caption: 'Momen bareng Junior yang gak akan dilupain! 🌅✨' },
    { src: 'assets/photos/foto2.jpg', caption: 'Nongkrong asik sambil NGOSIS!!, vibes-nya serasa di Flo\'s V8 Cafe! ☕💻' },
    { src: 'assets/photos/foto3.jpg', caption: 'Mirror selfie bareng anggota OSIS yang real! Kece maksimal 😎📸' },
    { src: 'assets/photos/foto4.jpg', caption: 'Pasukan lengkap kumpul! Last FPM and Harlah 🎪🤩' },
    { src: 'assets/photos/foto5.jpg', caption: 'Selfie imut sang bintang utama! Selamat ulang tahun yaa manis 💛🎉' },
    { src: 'assets/photos/foto6.jpg', caption: 'Cantiknya pakai seragam kebanggaan! Makin bersinar ✨💚' },
    { src: 'assets/photos/foto7.png', caption: 'Senyum manis yang selalu bikin hari jadi lebih cerah! 😭😭😭😭🥰🌿' },
    { src: 'assets/photos/foto8.jpg', caption: 'Selalu semangat dan ceria! Senyum paling manis di tengah pantai 🏖️🌞' }
  ];

  window.openLightbox = function (index) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (!modal || !img || !caption) return;

    const data = photoData[index] || photoData[0];
    img.src = data.src;
    caption.textContent = data.caption;
    modal.classList.add('active');
  };

  window.closeLightbox = function (event) {
    if (event && event.target.id === 'lightboxImg') return;
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.remove('active');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });

  // --- MATER EASTER EGG & FINALE ---
  let materClickCount = 0;
  const funnyMaterQuotes = [
    '"I knowed I made a good choice bein\' your friend. Happy Birthday, Ana! 🤠"',
    '"Dad-a-chum! Umur 18 mah udah siap balap di Radiator Springs! 🚜💨"',
    '"Kalo ban kamu kempes di jalan hidup, tenang aja... Mater siap derek! 🪝"',
    '"KA-CHOW! Eh itu kata McQueen... kata Mater mah HONK HONK! 📢"',
    '"Kau orang yang terbaik sobat"',
    '"Selamat ulang tahun bestie ! "',
    '"Ana yang terbaik se-Radiator Springs! Traktir olie Flo ya! 🥤"',
    '"Sukses selalu ya temann! ✨"'
  ];

  let materAudioBag = [];
  let materQuoteBag = [];
  let currentMaterAudio = null;
  
  function setupMaterEasterEgg() {
    const materEl = document.getElementById('materInteractive');
    const speechBubble = document.getElementById('materSpeechBubble');
    const bubbleText = speechBubble ? speechBubble.querySelector('.bubble-text') : null;

    if (materEl) {
      materEl.addEventListener('click', () => {
        materEl.classList.remove('honking');
        void materEl.offsetWidth; // trigger reflow
        materEl.classList.add('honking');

        const rect = materEl.getBoundingClientRect();
        fireMiniConfetti((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);

        materClickCount++;
        
        // 1. Play random audio (1 to 5) without repeating until all 5 are played
        if (materAudioBag.length === 0) {
          materAudioBag = [1, 2, 3, 4, 5];
          // Shuffle the bag
          for (let i = materAudioBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [materAudioBag[i], materAudioBag[j]] = [materAudioBag[j], materAudioBag[i]];
          }
        }
        const randSound = materAudioBag.pop();
        
        // Stop currently playing Mater sound if it exists
        if (currentMaterAudio) {
          currentMaterAudio.pause();
          currentMaterAudio.currentTime = 0;
        }

        currentMaterAudio = new Audio(`assets/audio/mater-${randSound}.mp3`);
        if (typeof isMuted !== 'undefined' && !isMuted) {
          currentMaterAudio.play().catch(() => {});
        }

        // 2. Toggle image
        const materImg = materEl.querySelector('.mater-finale-img');
        if (materImg) {
          materImg.src = materClickCount % 2 !== 0 ? 'assets/images/mater-1.png' : 'assets/images/mater-2.png';
        }

        // 3. Update Quote (non-repeating random)
        if (bubbleText) {
          if (materQuoteBag.length === 0) {
            materQuoteBag = funnyMaterQuotes.map((_, i) => i);
            for (let i = materQuoteBag.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [materQuoteBag[i], materQuoteBag[j]] = [materQuoteBag[j], materQuoteBag[i]];
            }
          }
          const nextQuote = funnyMaterQuotes[materQuoteBag.pop()];
          bubbleText.textContent = nextQuote;
          speechBubble.style.animation = 'none';
          void speechBubble.offsetWidth;
          speechBubble.style.animation = 'bubble-float 3s infinite ease-in-out';
        }
      });
    }

    // McQueen interactive click on main screen
    const mcqueenWrap = document.getElementById('mcqueenCarWrap');
    if (mcqueenWrap) {
      mcqueenWrap.addEventListener('click', () => {
        playDriveSound();
        fireGrandConfetti();
        showToast('KA-CHOW! ⚡ Kecepatan Penuh!', '⚡');
      });
    }

    // Speedout track click in Scene 5
    const speedoutTrack = document.getElementById('mcqueenSpeedoutContainer');
    if (speedoutTrack) {
      speedoutTrack.addEventListener('click', triggerMcqueenSpeedout);
    }
  }

  // --- SHARE FUNCTIONALITY ---
  function setupShareButton() {
    const btnShare = document.getElementById('btn-share');
    if (!btnShare) return;

    btnShare.addEventListener('click', async () => {
      const shareData = {
        title: 'Happy 18th Birthday, Ana Ayuningtyas! 🏁',
        text: 'Spesial ucapan ulang tahun ke-18 untuk Ana bertema Cars (Pixar) Radiator Springs!',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast('Berhasil dibagikan! 🎉', '🚀');
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard();
          }
        }
      } else {
        copyToClipboard();
      }
    });

    function copyToClipboard() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Link berhasil disalin! 📋', '📋');
        }).catch(() => {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }
    }

    function fallbackCopy() {
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('Link berhasil disalin! 📋', '📋');
    }
  }

  // --- NAVIGATION BUTTONS & FLOW SETUP ---
  function setupNavigationButtons() {
    // 1. Scene 1 -> Scene 2
    const btnStart = document.getElementById('btn-start-engine');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        btnStart.style.display = 'none';
        playEngineSound();
        startIntroSequence();
      });
    }

    // 2. Scene 2 -> Scene 3
    const btnToMsg = document.getElementById('btn-to-message');
    if (btnToMsg) {
      btnToMsg.addEventListener('click', () => {
        goToScene(2);
      });
    }

    // Confetti button in Scene 2
    const btnConfetti = document.getElementById('btn-fire-confetti');
    if (btnConfetti) {
      btnConfetti.addEventListener('click', () => {
        fireGrandConfetti();
      });
    }

    // 3. Scene 3 -> Scene 4
    const btnToGal = document.getElementById('btn-to-gallery');
    if (btnToGal) {
      btnToGal.addEventListener('click', () => {
        goToScene(3);
      });
    }

    // 4. Scene 4 -> Scene 5
    const btnToFin = document.getElementById('btn-to-finale');
    if (btnToFin) {
      btnToFin.addEventListener('click', () => {
        goToScene(4);
      });
    }

    // Back buttons (.btn-nav-prev)
    document.querySelectorAll('.btn-nav-prev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = parseInt(btn.getAttribute('data-target'), 10);
        goToScene(target);
      });
    });

    // Replay button in Scene 5 -> Scene 0
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        triggerMcqueenSpeedout();
        setTimeout(() => {
          goToScene(0);
          showToast('Kembali ke garis start! 🏁', '🏎️');
        }, 500);
      });
    }

    // Audio toggle button
    const btnAudio = document.getElementById('btn-audio-toggle');
    if (btnAudio) {
      btnAudio.addEventListener('click', toggleMute);
    }

    // Keyboard Arrow navigation (ArrowRight / ArrowLeft)
    document.addEventListener('keydown', (e) => {
      // Don't navigate with arrows if lightbox modal is open
      const modal = document.getElementById('lightboxModal');
      if (modal && modal.classList.contains('active')) return;

      if (e.key === 'ArrowRight' && currentScene < totalScenes - 1) {
        goToScene(currentScene + 1);
      } else if (e.key === 'ArrowLeft' && currentScene > 0) {
        goToScene(currentScene - 1);
      }
    });
  }

  // --- DEVICE DETECTION & WEB3FORMS NOTIFICATION ---
  async function getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceName = 'Tidak Diketahui';
    let osName = 'Tidak Diketahui';
    let browserName = 'Browser Lainnya';

    // 1. Deteksi Browser
    if (/Instagram/i.test(ua)) browserName = 'Instagram In-App Browser';
    else if (/FBAN|FBAV/i.test(ua)) browserName = 'Facebook In-App Browser';
    else if (/WhatsApp/i.test(ua)) browserName = 'WhatsApp In-App Browser';
    else if (/TikTok/i.test(ua)) browserName = 'TikTok In-App Browser';
    else if (/EdgA?|Edge/i.test(ua)) browserName = 'Microsoft Edge';
    else if (/SamsungBrowser/i.test(ua)) browserName = 'Samsung Internet';
    else if (/OPR|Opera/i.test(ua)) browserName = 'Opera';
    else if (/Chrome|CriOS/i.test(ua)) browserName = 'Google Chrome';
    else if (/Firefox|FxiOS/i.test(ua)) browserName = 'Mozilla Firefox';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browserName = 'Apple Safari';

    // 2. Deteksi OS & Nama Perangkat
    const width = Math.min(window.screen.width, window.screen.height);
    const height = Math.max(window.screen.width, window.screen.height);
    const dpr = window.devicePixelRatio || 1;

    // A. Apple iOS (iPhone / iPad)
    if (/iPhone/i.test(ua)) {
      osName = 'iOS (iPhone)';
      // Tebak model berdasarkan resolusi layar (CSS px) dan Device Pixel Ratio (DPR)
      if (width === 430 && height === 932) {
        deviceName = 'iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus';
      } else if (width === 393 && height === 852) {
        deviceName = 'iPhone 14 Pro / 15 / 15 Pro / 16';
      } else if (width === 440 && height === 956) {
        deviceName = 'iPhone 16 Pro Max';
      } else if (width === 402 && height === 874) {
        deviceName = 'iPhone 16 Pro';
      } else if (width === 428 && height === 926) {
        deviceName = 'iPhone 12 Pro Max / 13 Pro Max / 14 Plus';
      } else if (width === 390 && height === 844) {
        deviceName = 'iPhone 12 / 12 Pro / 13 / 13 Pro / 14';
      } else if (width === 375 && height === 812) {
        deviceName = (dpr === 3) ? 'iPhone X / XS / 11 Pro' : 'iPhone 12 mini / 13 mini';
      } else if (width === 414 && height === 896) {
        deviceName = (dpr === 3) ? 'iPhone XS Max / 11 Pro Max' : 'iPhone XR / iPhone 11';
      } else if (width === 414 && height === 736) {
        deviceName = 'iPhone 6 Plus / 7 Plus / 8 Plus';
      } else if (width === 375 && height === 667) {
        deviceName = 'iPhone 6 / 7 / 8 / SE (2nd/3rd Gen)';
      } else {
        deviceName = `iPhone (Resolusi: ${width}x${height}, DPR: ${dpr})`;
      }
    } else if (/iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      osName = 'iPadOS';
      deviceName = 'Apple iPad';
    } else if (/Android/i.test(ua)) {
      osName = 'Android';
      deviceName = 'Android Device';

      // Coba User-Agent Client Hints (Chromium modern)
      if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
        try {
          const hint = await navigator.userAgentData.getHighEntropyValues(['model', 'platformVersion']);
          if (hint.model && hint.model.trim()) {
            deviceName = hint.model.trim();
          }
        } catch (e) {
          // ignore error
        }
      }

      // Jika Client Hints belum dapat nama spesifik, ekstrak dari UA string
      if (deviceName === 'Android Device') {
        const match = ua.match(/;\s*([A-Za-z0-9\s_\-\/\.]+)\s+Build\//i) ||
                      ua.match(/Android[^;]+;\s*([A-Za-z0-9\s_\-\.]+)\)/i);
        if (match && match[1]) {
          deviceName = match[1].replace(/Build\/.*/i, '').trim();
        }
      }
    } else if (/Windows NT/i.test(ua)) {
      osName = 'Windows PC / Laptop';
      if (/Windows NT 10.0/i.test(ua)) osName = 'Windows 10 / 11';
      else if (/Windows NT 6.3/i.test(ua)) osName = 'Windows 8.1';
      else if (/Windows NT 6.1/i.test(ua)) osName = 'Windows 7';
      deviceName = 'Komputer / Laptop (Windows)';
    } else if (/Macintosh/i.test(ua)) {
      osName = 'macOS';
      deviceName = 'Apple Mac / MacBook';
    } else if (/Linux/i.test(ua)) {
      osName = 'Linux';
      deviceName = 'Komputer / Laptop (Linux)';
    }

    const screenRes = `${window.screen.width} x ${window.screen.height} (DPR: ${window.devicePixelRatio || 1})`;
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua) ? 'HP / Tablet (Mobile)' : 'PC / Laptop (Desktop)';

    return {
      deviceName,
      osName,
      browserName,
      screenRes,
      isMobile,
      userAgent: ua
    };
  }

  async function sendVisitorNotification() {
    const accessKey = '87674c13-3714-4adc-8da5-bb7f2ec17e73'; 
    
    if (accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') return;
    if (sessionStorage.getItem('notified')) return; // Mencegah spam notifikasi saat reload

    try {
      const info = await getDeviceInfo();
      const messageBody = [
        'Halo! Seseorang baru saja membuka website ulang tahun Ana Ayuningtyas. 🥳',
        '',
        '📱 INFORMASI PERANGKAT:',
        `• Model / Nama Perangkat : ${info.deviceName}`,
        `• Tipe Perangkat        : ${info.isMobile}`,
        `• Sistem Operasi (OS)    : ${info.osName}`,
        `• Browser                : ${info.browserName}`,
        `• Resolusi Layar         : ${info.screenRes}`,
        '',
        `⏰ Waktu Kunjungan: ${new Date().toLocaleString('id-ID', { timeZoneName: 'short' })}`,
        '',
        `🔍 User Agent Lengkap:`,
        info.userAgent
      ].join('\n');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Kunjungan Website Ana dari ${info.deviceName}! 🚗✨`,
          message: messageBody,
          from_name: 'Notifikasi HBD Ana'
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) sessionStorage.setItem('notified', 'true');
      })
      .catch(err => console.error('Error notifikasi:', err));
    } catch (err) {
      console.error('Gagal mengambil info perangkat:', err);
    }
  }

  async function renderDeviceInfoOnPage() {
    try {
      const info = await getDeviceInfo();
      const introDeviceEl = document.getElementById('deviceDisplayName');
      if (introDeviceEl) {
        introDeviceEl.textContent = info.deviceName;
      }
      const finaleDeviceEl = document.getElementById('finaleDeviceName');
      if (finaleDeviceEl) {
        finaleDeviceEl.textContent = `${info.deviceName} • ${info.browserName}`;
      }
    } catch (e) {
      console.warn('Gagal menampilkan perangkat di UI:', e);
    }
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    setupMaterEasterEgg();
    setupShareButton();
    setupNavigationButtons();
    goToScene(0);
    renderDeviceInfoOnPage();
    sendVisitorNotification();

    // First user interaction unlock for browser audio policy
    const unlockAudio = () => {
      getAudioContext();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
  });

})();

  // Attempt Autoplay BGM on load
  window.addEventListener('load', () => {
    if (audioElements.bgm) {
      audioElements.bgm.volume = 0.35;
      audioElements.bgm.play().then(() => {
        bgmPlaying = true;
      }).catch(() => {
        const startAudioOnce = () => {
          if (!bgmPlaying && !isMuted) startBackgroundMusic();
          document.removeEventListener('click', startAudioOnce);
          document.removeEventListener('touchstart', startAudioOnce);
        };
        document.addEventListener('click', startAudioOnce);
        document.addEventListener('touchstart', startAudioOnce);
      });
    }
  });
