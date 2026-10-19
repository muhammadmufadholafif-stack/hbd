/**
 * ============================================================================
 * SURAT KHUSUS PERMINTAAN MAAF UNTUK ANA — SCRIPT ENGINE
 * ============================================================================
 */

(function () {
  'use strict';

  // ACCESS KEYS UNTUK DUA EMAIL
  const KEY_AFIF_FIFA = '87674c13-3714-4adc-8da5-bb7f2ec17e73'; // Email afiffifa
  const KEY_MUHAMMAD  = 'f964af1d-a64e-4b92-aee0-c8bee44a4a81'; // Email muhammadmufadholafif
  const ALL_KEYS = [KEY_AFIF_FIFA, KEY_MUHAMMAD];

  // --- AUDIO SYSTEM ---
  let isMuted = false;
  let bgmPlaying = false;
  const bgmAudio = document.getElementById('audio-bgm');
  const btnAudioToggle = document.getElementById('btnAudioToggle');
  const audioText = document.getElementById('audioText');
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Gentle celestial chime chord for opening & interactions
  function playCelestialChime() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Soft gentle harmonic
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + index * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.08);
        osc.stop(ctx.currentTime + index * 0.08 + 1.3);
      });
    } catch (e) {
      console.log('Audio synthesis:', e);
    }
  }

  function startBgm() {
    if (!bgmAudio || bgmPlaying || isMuted) return;
    bgmAudio.volume = 0.85;
    bgmAudio.play()
      .then(() => {
        bgmPlaying = true;
        updateAudioButtonUI(true);
      })
      .catch(() => {});
  }

  function toggleAudio() {
    isMuted = !isMuted;
    if (isMuted) {
      if (bgmAudio) bgmAudio.pause();
      bgmPlaying = false;
      updateAudioButtonUI(false);
    } else {
      getAudioContext();
      if (bgmAudio) {
        bgmAudio.volume = 0.85;
        bgmAudio.play().catch(() => {});
        bgmPlaying = true;
      }
      updateAudioButtonUI(true);
    }
  }

  function updateAudioButtonUI(active) {
    if (!btnAudioToggle) return;
    if (active) {
      btnAudioToggle.classList.remove('muted');
      if (audioText) audioText.textContent = 'Musik Nyala';
    } else {
      btnAudioToggle.classList.add('muted');
      if (audioText) audioText.textContent = 'Hening';
    }
  }

  // --- STARRY SKY CANVAS ---
  function initStarrySky() {
    const canvas = document.getElementById('skyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
    });

    const stars = [];
    const starCount = Math.floor(Math.min(width, 1400) * 0.12);

    function createStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85,
          radius: Math.random() * 1.5 + 0.4,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.4 ? '#ffffff' : '#ffd700'
        });
      }
    }
    createStars();

    // Shooting star system
    let shootingStar = null;
    function triggerShootingStar() {
      if (Math.random() < 0.008 && !shootingStar) {
        shootingStar = {
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 60,
          speed: Math.random() * 10 + 10,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1.0
        };
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw starry dots
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += Math.sin(Date.now() * s.speed) * 0.015;
        const currentAlpha = Math.max(0.15, Math.min(1, s.alpha));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw shooting star
      triggerShootingStar();
      if (shootingStar) {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = shootingStar.alpha;

        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, 'rgba(255, 215, 0, 1)');
        ctx.strokeStyle = grad;

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.025;

        if (shootingStar.alpha <= 0) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1.0;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- ENVELOPE OPENING LOGIC ---
  function openEnvelope() {
    const envelopeStage = document.getElementById('envelopeStage');
    const letterStage = document.getElementById('letterStage');

    if (!envelopeStage || !letterStage) return;

    // Trigger audio & sound
    getAudioContext();
    playCelestialChime();
    startBgm();

    // Fire gentle gold confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#FFFFFF', '#FFB300']
      });
    }

    envelopeStage.classList.add('opened');

    setTimeout(() => {
      letterStage.classList.add('visible');
      letterStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);

    // Track letter read event
    sendEventNotification('Ana membuka dan membaca isi surat permintaan maaf (halaman terpisah)!');
  }

  // --- INTERACTIVE RESPONSES ---
  function setupInteractions() {
    const envelopeBox = document.getElementById('envelopeBox');
    const waxSeal = document.getElementById('waxSeal');
    if (envelopeBox) envelopeBox.addEventListener('click', openEnvelope);
    if (waxSeal) waxSeal.addEventListener('click', openEnvelope);

    if (btnAudioToggle) {
      btnAudioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio();
      });
    }

    // Interactive Runaway Button: Dimaafin gak? (MAX 10X KABUR)
    const btnForgiveYes = document.getElementById('btnForgiveYes');
    const btnForgiveNo = document.getElementById('btnForgiveNo');
    const forgiveZone = document.getElementById('forgiveButtonsZone');
    const forgiveSuccess = document.getElementById('forgiveSuccessBanner');
    const forgiveReject = document.getElementById('forgiveRejectBanner');

    if (btnForgiveYes && btnForgiveNo && forgiveZone) {
      let dodgeCount = 0;
      const maxDodges = 10;

      const playfulPhrases = [
        "Eits, gak kena! 😜",
        "Gak bisa diklik wkwk 🏃",
        "Masa nggak sih? 🥺",
        "Pencet yang hijau ajaa 🤍",
        "Masih gigih nolak nih? 😭",
        "Tetep gak bisa 💨",
        "Tombol ini licin! 😝",
        "Dikit lagi nyerah kan? wkwk",
        "Tinggal 1x lagi kabur! 🏃💨"
      ];

      function dodgeNoButton() {
        dodgeCount++;

        if (dodgeCount >= maxDodges) {
          // Hitungan ke-10: Berhenti kabur dan kembali rapi ke dalam kotak
          btnForgiveNo.classList.add('can-be-clicked');
          btnForgiveNo.innerHTML = `<span class="btn-icon">🥺</span> Yaudah deh boleh...`;
          btnForgiveNo.style.position = '';
          btnForgiveNo.style.left = '';
          btnForgiveNo.style.top = '';
          btnForgiveNo.style.zIndex = '5';
          btnForgiveNo.style.boxShadow = '';
          return;
        }

        // Full Screen (Viewport) Bounds dengan padding aman
        const paddingX = 20;
        const paddingTop = 70; // Menghindari tombol audio di atas
        const paddingBottom = 40; // Menghindari bar navigasi bawah

        const btnWidth = Math.min(btnForgiveNo.offsetWidth || 180, window.innerWidth - 40);
        const btnHeight = btnForgiveNo.offsetHeight || 45;

        const maxX = Math.max(paddingX, window.innerWidth - btnWidth - paddingX);
        const maxY = Math.max(paddingTop, window.innerHeight - btnHeight - paddingBottom);

        const currentRect = btnForgiveNo.getBoundingClientRect();
        const currentX = currentRect.left || (window.innerWidth / 2);
        const currentY = currentRect.top || (window.innerHeight / 2);

        let randomX, randomY;
        let tries = 0;
        do {
          randomX = Math.floor(paddingX + Math.random() * (maxX - paddingX));
          randomY = Math.floor(paddingTop + Math.random() * (maxY - paddingTop));
          tries++;
        } while (tries < 10 && Math.hypot(randomX - currentX, randomY - currentY) < 120);

        // Terbang ke area layar penuh secara dinamis
        btnForgiveNo.style.position = 'fixed';
        btnForgiveNo.style.zIndex = '9999';
        btnForgiveNo.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(239, 68, 68, 0.6)';
        btnForgiveNo.style.left = `${randomX}px`;
        btnForgiveNo.style.top = `${randomY}px`;

        const phrase = playfulPhrases[(dodgeCount - 1) % playfulPhrases.length];
        btnForgiveNo.innerHTML = `<span class="btn-icon">😜</span> ${phrase} (${dodgeCount}/${maxDodges})`;
      }

      btnForgiveNo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (dodgeCount < maxDodges) {
          dodgeNoButton();
        } else {
          // Klik ke-10 (berhasil dipencet)
          btnForgiveNo.style.display = 'none';
          forgiveZone.style.display = 'none';
          if (forgiveReject) {
            forgiveReject.style.display = 'block';
            forgiveReject.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          sendEventNotification("Ana memilih 'Nggak dimaafin' setelah 10x ngejar tombol di halaman surat!");
        }
      });

      btnForgiveYes.addEventListener('click', () => {
        getAudioContext();
        playCelestialChime();
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#10B981', '#FFD700', '#FFFFFF', '#FF6B2B']
          });
        }
        btnForgiveNo.style.display = 'none';
        forgiveZone.style.display = 'none';
        if (forgiveSuccess) {
          forgiveSuccess.style.display = 'block';
          forgiveSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        sendEventNotification("Ana menekan: 'Iya, dimaafin! 🤍' di halaman surat!");
      });
    }

    // Modal controls
    const readModal = document.getElementById('readModal');
    const btnAcknowledge = document.getElementById('btnAcknowledge');

    if (btnAcknowledge) {
      btnAcknowledge.addEventListener('click', () => {
        getAudioContext();
        playCelestialChime();

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#FFFFFF', '#FFD700', '#A7F3D0']
          });
        }

        if (readModal) readModal.classList.add('active');
        sendEventNotification("Ana menekan: 'Pesanmu sudah kubaca kok'");
      });
    }

    // Close modals
    document.querySelectorAll('.btn-modal-close, .modal-backdrop').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target === el || e.target.classList.contains('btn-modal-close')) {
          if (readModal) readModal.classList.remove('active');
        }
      });
    });

    // Form reply submission (private)
    const replyForm = document.getElementById('replyForm');
    const replyInput = document.getElementById('replyInput');
    const replyStatus = document.getElementById('replyStatus');
    const btnSubmitReply = document.getElementById('btnSubmitReply');

    if (replyForm && replyInput) {
      replyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = replyInput.value.trim();
        if (!text) {
          if (replyStatus) {
            replyStatus.textContent = 'Tulis pesannya dulu yaa...';
            replyStatus.className = 'reply-status-msg error';
          }
          return;
        }

        if (btnSubmitReply) {
          btnSubmitReply.disabled = true;
          btnSubmitReply.innerHTML = '<span>Mengirim...</span> <span class="btn-arrow">⏳</span>';
        }

        if (replyStatus) {
          replyStatus.textContent = 'Sedang mengirimkan pesanmu...';
          replyStatus.className = 'reply-status-msg';
          replyStatus.style.display = 'block';
        }

        try {
          const dev = getDeviceInfo();
          const timestamp = new Date().toLocaleString('id-ID');

          // Kirim ke kedua email menggunakan format JSON yang lebih kompatibel di semua browser & mobile
          const sendPromises = ALL_KEYS.map((key) => {
            const payload = {
              access_key: key,
              subject: `[PESAN DARI ANA] Balasan Surat Maaf (${timestamp})`,
              from_name: 'Ana Ayuningtyas',
              name: 'Ana Ayuningtyas',
              message: text,
              Pesan_Lengkap: text,
              Perangkat: dev.deviceName,
              Waktu_Kirim: dev.time
            };

            return fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .catch(err => {
              console.warn('Gagal fetch JSON, mencoba via FormData...', err);
              // Fallback FormData jika JSON diblokir ekstensi/proxy
              const fd = new FormData();
              fd.append('access_key', key);
              fd.append('subject', `[PESAN DARI ANA] Balasan Surat Maaf (${timestamp})`);
              fd.append('name', 'Ana Ayuningtyas');
              fd.append('message', text);
              return fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
                .then(r => r.json())
                .catch(() => ({}));
            });
          });

          const results = await Promise.all(sendPromises);
          console.log('Web3Forms reply results:', results);

          const isAnySuccess = results.some(r => r && r.success);

          if (isAnySuccess) {
            replyStatus.textContent = 'Pesanmu sudah sampai dengan aman. Makasih banyak yaa Ana 🤍';
            replyStatus.className = 'reply-status-msg success';
            replyInput.value = '';
          } else {
            const errMsg = results.find(r => r && r.message)?.message || 'Periksa koneksi internetmu.';
            replyStatus.textContent = `Pesan belum terkirim (${errMsg}). Boleh coba tekan kirim lagi yaa.`;
            replyStatus.className = 'reply-status-msg error';
          }
        } catch (err) {
          console.error('Submit error:', err);
          replyStatus.textContent = 'Gagal mengirim otomatis. Pastikan koneksi internet aktif yaa.';
          replyStatus.className = 'reply-status-msg error';
        } finally {
          if (btnSubmitReply) {
            btnSubmitReply.disabled = false;
            btnSubmitReply.innerHTML = '<span>Kirim Pesan</span> <span class="btn-arrow">✉️</span>';
          }
        }
      });
    }

    // First user gesture unlocks audio
    const unlockUserGesture = () => {
      getAudioContext();
      if (!bgmPlaying && !isMuted) startBgm();
      document.removeEventListener('click', unlockUserGesture);
      document.removeEventListener('touchstart', unlockUserGesture);
    };
    document.addEventListener('click', unlockUserGesture);
    document.addEventListener('touchstart', unlockUserGesture);
  }

  // --- DEVICE DETECTION & WEB3FORMS NOTIFICATION ---
  function getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceName = 'Desktop / Laptop';
    let isMobile = 'Desktop';

    if (/iPhone/i.test(ua)) {
      deviceName = 'Apple iPhone';
      isMobile = 'HP (Mobile)';
    } else if (/iPad/i.test(ua)) {
      deviceName = 'Apple iPad';
      isMobile = 'Tablet';
    } else if (/Android/i.test(ua)) {
      isMobile = 'HP (Mobile)';
      const match = ua.match(/Android[^;]+; ([^;)]+)\)/);
      deviceName = match ? `Android (${match[1].trim()})` : 'Android Device';
    }

    return {
      deviceName,
      isMobile,
      userAgent: ua,
      screenRes: `${window.screen.width}x${window.screen.height}`,
      time: new Date().toLocaleString('id-ID', { timeZoneName: 'short' })
    };
  }

  async function sendVisitorNotification() {
    if (sessionStorage.getItem('notif_visitor_sent')) return; // Cegah spam saat refresh
    try {
      const dev = getDeviceInfo();
      sessionStorage.setItem('notif_visitor_sent', 'true');
      ALL_KEYS.forEach((key) => {
        const formData = new FormData();
        formData.append('access_key', key);
        formData.append('subject', `[SURAT MAAF] Halaman Pesan Dibuka: ${dev.deviceName}`);
        formData.append('from_name', 'Pesan Permintaan Maaf untuk Ana');
        formData.append('message', `Seseorang membuka halaman pesan permintaan maaf khusus untuk Ana:\n\n• Perangkat: ${dev.deviceName}\n• Resolusi: ${dev.screenRes}\n• Waktu: ${dev.time}`);

        fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData }).catch(() => {});
      });
    } catch (e) {}
  }

  function sendEventNotification(eventDescription) {
    try {
      const dev = getDeviceInfo();
      ALL_KEYS.forEach((key) => {
        const formData = new FormData();
        formData.append('access_key', key);
        formData.append('subject', `[AKTIVITAS SURAT MAAF] ${eventDescription}`);
        formData.append('from_name', 'Aktivitas Pesan Maaf');
        formData.append('message', `${eventDescription}\n\nPerangkat: ${dev.deviceName}\nWaktu: ${dev.time}`);

        fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData }).catch(() => {});
      });
    } catch (e) {}
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initStarrySky();
    setupInteractions();
    sendVisitorNotification();
  });

})();
