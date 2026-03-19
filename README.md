# 🚀 Basa Divakar Reddy — Portfolio

Personal portfolio of **Basa Divakar Reddy**, Full Stack Developer & B.Tech CSE (AI) student
from Visakhapatnam, India.

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Full single-page site (all sections)
├── css/
│   ├── reset.css           ← Browser normalization
│   ├── variables.css       ← All design tokens (colors, fonts)
│   ├── animations.css      ← Keyframes + scroll reveal classes
│   ├── components.css      ← All UI: nav, buttons, cards, form
│   └── layout.css          ← Section grids + responsive breakpoints
├── js/
│   ├── cursor.js           ← Custom neon cursor + trailing ring
│   ├── particles.js        ← Canvas particle network + grid overlay
│   ├── animations.js       ← Scroll reveal + glitch + role typer
│   ├── tilt.js             ← 3D card tilt on hover
│   ├── form.js             ← Form validation + submit handler
│   └── main.js             ← Nav shrink, mobile menu, active links
├── assets/
│   ├── images/
│   │   └── (add avatar.jpg here)
│   └── resume.pdf          ← Replace with your actual resume PDF
└── README.md
```

---

## ✏️ What to Personalize

Everything personal is already filled in. Just do these final steps:

### 1. Add Your Photo (Optional)
- Add your photo as `assets/images/avatar.jpg` (square, ~400×400px)
- In `index.html`, find `<span class="avatar-initials">BDR</span>`
- Replace it with: `<img src="assets/images/avatar.jpg" alt="Basa Divakar Reddy" />`
- Also add to `css/components.css` inside `.about-avatar`:
  ```css
  .about-avatar img { position:relative; z-index:1; width:100%; height:100%; object-fit:cover; border-radius:50%; }
  ```

### 2. Add Your Resume
- Drop your PDF into `assets/` and name it `resume.pdf`

### 3. Update Project Links
- When Crop Care AI goes live, update its card in `index.html`
- Search for `href="https://github.com/basadivakarreddy-bit/agro-ai-helper-62"` and add a live link

### 4. Connect the Contact Form (Free — 5 mins)
Open `js/form.js` and replace the fake `await new Promise(...)` with:

**Formspree (easiest):**
1. Go to https://formspree.io → sign up → New Form
2. Copy your form ID (e.g. `xpzgkwla`)
3. Replace the placeholder with:
```js
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: fname.value,
    email: femail.value,
    message: fmsg.value
  })
});
```

---

## 🎨 Change the Color Theme

Edit `css/variables.css` — change just these 3 lines:
```css
--neon:  #00ffe1;   /* Main glow (currently cyan) */
--neon2: #ff2d78;   /* Secondary (currently pink)  */
--neon3: #a259ff;   /* Tertiary  (currently violet) */
```

---

## 🌐 Deploy Free in 2 Minutes

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/basadivakarreddy-bit/portfolio.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Source: main branch → Save
Your site: `https://basadivakarreddy-bit.github.io/portfolio`

### Vercel (Faster CDN, Recommended)
```bash
npm install -g vercel
vercel
```
Follow prompts → done in 60 seconds.

---

## ⚡ Performance Checklist

- [ ] Compress avatar.jpg to under 150kb → https://squoosh.app
- [ ] Compress resume.pdf to under 500kb → https://smallpdf.com
- [ ] Add favicon: `<link rel="icon" href="assets/icons/favicon.ico">` in `<head>`
- [ ] Test on mobile before sharing with recruiters

---

Built with pure HTML, CSS, and JavaScript. No frameworks. No build tools.
Open `index.html` in any browser and it works immediately. 🎉
