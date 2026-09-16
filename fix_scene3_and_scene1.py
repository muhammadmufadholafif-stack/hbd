import os

style_path = r'c:\Users\Hype AMD\Downloads\rahasia\style.css'
script_path = r'c:\Users\Hype AMD\Downloads\rahasia\script.js'
html_path = r'c:\Users\Hype AMD\Downloads\rahasia\index.html'

# 1. Update style.css
with open(style_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Add message-container alignment
if '.message-container' not in css:
    css += "\n.message-container {\n  justify-content: flex-start;\n  padding-top: 80px;\n}\n"

# Reduce card-body font size
css = css.replace(
    'font-size: clamp(0.95rem, 2.6vw, 1.12rem);',
    'font-size: clamp(0.85rem, 2.4vw, 1rem);'
)

# Enhance idle bounce for "jalan ditempat"
old_idle = '''@keyframes mc-idle-bounce {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}'''
new_idle = '''@keyframes mc-idle-bounce {
  0%   { transform: translateY(0) rotate(0deg); }
  25%  { transform: translateY(-3px) rotate(0.5deg); }
  50%  { transform: translateY(0) rotate(0deg); }
  75%  { transform: translateY(-2px) rotate(-0.5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}'''
css = css.replace(old_idle, new_idle)

# Speed up idle animation
css = css.replace(
    'animation: mc-idle-bounce 0.5s infinite alternate ease-in-out;',
    'animation: mc-idle-bounce 0.25s infinite ease-in-out;'
)
css = css.replace(
    'animation: mc-drive-in 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;',
    '/* animation removed for idle start */'
)

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(css)


# 2. Update script.js
with open(script_path, 'r', encoding='utf-8') as f:
    js = f.read()

old_scene0 = '''      if (rig) {
        rig.classList.remove('go', 'idle');
        void rig.offsetWidth; // force reflow to restart animation
        rig.style.animation = 'mc-drive-in 1.0s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
        setTimeout(() => { rig.classList.add('idle'); }, 1050);
      }'''

new_scene0 = '''      if (rig) {
        rig.classList.remove('go');
        rig.classList.add('idle');
        rig.style.animation = 'none';
      }'''
js = js.replace(old_scene0, new_scene0)

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(js)


# 3. Update index.html
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace(
    '<div class="mcqueen-race-wrap" id="mcqueenIntroRig">',
    '<div class="mcqueen-race-wrap idle" id="mcqueenIntroRig">'
)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Done")
