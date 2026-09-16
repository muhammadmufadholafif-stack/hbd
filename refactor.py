import os

filepath = r'c:\Users\Hype AMD\Downloads\rahasia\script.js'
with open(filepath, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add drive to audioElements
code = code.replace(
    "bgm: document.getElementById('audio-bgm')",
    "bgm: document.getElementById('audio-bgm'),\n    drive: document.getElementById('audio-drive')"
)

# 2. Add playDriveSound
drive_sound_func = '''  function playDriveSound() {
    if (isMuted) return;
    if (audioElements.drive) {
      audioElements.drive.currentTime = 0;
      audioElements.drive.volume = 1.0;
      audioElements.drive.play().catch(() => {});
    }
  }

'''
code = code.replace('  function playEngineSound() {', drive_sound_func + '  function playEngineSound() {')

# 3. Add to mute
code = code.replace(
    'if (audioElements.countdown) audioElements.countdown.pause();',
    'if (audioElements.countdown) audioElements.countdown.pause();\n      if (audioElements.drive) audioElements.drive.pause();'
)

# 4. Add playDriveSound to startIntroSequence
go_block = """      // GREEN — GO! - 3rd long beep (~3s)
      setTimeout(() => {
        bulbs[1].className = 'traffic-light-bulb yellow';
        bulbs[2].className = 'traffic-light-bulb green active';"""

go_block_new = go_block + "\n\n        playDriveSound();"
code = code.replace(go_block, go_block_new)

# 5. Remove playEngineSound from other places
# Scene 2 Load
scene2_load = '''    } else if (index === 1) {
      // Main Birthday Scene
      clearTimeout(introCountdownTimer);
      playEngineSound();'''
scene2_load_new = '''    } else if (index === 1) {
      // Main Birthday Scene
      clearTimeout(introCountdownTimer);'''
code = code.replace(scene2_load, scene2_load_new)

# Speedout
speedout = '''      speedoutCar.classList.add('zoom');
      playEngineSound();'''
speedout_new = '''      speedoutCar.classList.add('zoom');'''
code = code.replace(speedout, speedout_new)

# McQueen click
mcqueen_click = '''    if (mcqueenWrap) {
      mcqueenWrap.addEventListener('click', () => {
        playEngineSound();'''
mcqueen_click_new = '''    if (mcqueenWrap) {
      mcqueenWrap.addEventListener('click', () => {'''
code = code.replace(mcqueen_click, mcqueen_click_new)

# 6. Add BGM Autoplay
autoplay_code = '''
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
'''
code += autoplay_code

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(code)

print("Success")
