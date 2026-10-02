const fs = require('fs');
const { execSync } = require('child_process');

// 1. Re-minify CSS
const cssFiles = ['css/reset.css', 'css/variables.css', 'css/animations.css', 'css/components.css', 'css/layout.css'];
let combinedCSS = '';
for (const file of cssFiles) {
  combinedCSS += fs.readFileSync(file, 'utf8') + '\n';
}
combinedCSS = combinedCSS.replace(/\/\*[\s\S]*?\*\//g, '');
combinedCSS = combinedCSS.replace(/\s+/g, ' ');
combinedCSS = combinedCSS.replace(/\s*{\s*/g, '{');
combinedCSS = combinedCSS.replace(/\s*}\s*/g, '}');
combinedCSS = combinedCSS.replace(/\s*:\s*/g, ':');
combinedCSS = combinedCSS.replace(/\s*;\s*/g, ';');
fs.writeFileSync('css/bundle.min.css', combinedCSS);
console.log('CSS re-minified.');

// 2. Convert Images to webp
const images = [
  'assets/img/projects/Nexus QR.png',
  'assets/img/projects/code_converter_preview_1773925957416.png',
  'assets/img/projects/engineering_maths_new.png',
  'assets/img/projects/portfolio_preview.png'
];
for (const img of images) {
  if (fs.existsSync(img)) {
    const outImg = img.replace('.png', '.webp').replace('Nexus QR', 'nexus_qr'); // handle space
    try {
      execSync(`sips -s format webp "${img}" --out "${outImg}"`);
      console.log(`Converted ${img} to webp.`);
    } catch (e) {
      console.log(`Failed to convert ${img}`);
    }
  }
}

// 3. Process index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Remove devicon stylesheet
html = html.replace(/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/gh\/devicons\/devicon@v[^"]+" \/>\n?/, '');

// B. Replace individual CSS with bundle
html = html.replace(/<link rel="stylesheet" href="css\/reset\.css" \/>\n\s*<link rel="stylesheet" href="css\/variables\.css" \/>\n\s*<link rel="stylesheet" href="css\/animations\.css" \/>\n\s*<link rel="stylesheet" href="css\/components\.css" \/>\n\s*<link rel="stylesheet" href="css\/layout\.css" \/>/, '<link rel="stylesheet" href="css/bundle.min.css" />');

// C. Wrap in <main>
html = html.replace(/<!-- ===== HERO ===== -->/, '<main>\n  <!-- ===== HERO ===== -->');
html = html.replace(/(<\/section>\n\n\s*<footer>)/, '</main>\n$1');

// D. Update .about-avatar
html = html.replace(/<div class="about-avatar">\n\s*<div class="about-ring r1">/, '<div class="about-avatar">\n        <div class="avatar-bg"></div>\n        <div class="about-ring r1">');

// E. Add defer to scripts
html = html.replace(/<script src="js\/(.*?)"><\/script>/g, '<script src="js/$1" defer></script>');

// F. Replace <i class="devicon-..."> with SVG img
const iconMap = {
  'devicon-html5-plain': 'html5/html5-plain.svg',
  'devicon-css3-plain': 'css3/css3-plain.svg',
  'devicon-javascript-plain': 'javascript/javascript-plain.svg',
  'devicon-react-original': 'react/react-original.svg',
  'devicon-nodejs-plain': 'nodejs/nodejs-plain.svg',
  'devicon-express-original': 'express/express-original.svg',
  'devicon-git-plain': 'git/git-plain.svg',
  'devicon-github-original': 'github/github-original.svg',
  'devicon-vscode-plain': 'vscode/vscode-plain.svg',
  'devicon-c-plain': 'c/c-plain.svg',
  'devicon-android-plain': 'android/android-plain.svg',
  'devicon-linkedin-plain': 'linkedin/linkedin-plain.svg'
};
for (const [cls, path] of Object.entries(iconMap)) {
  const regex = new RegExp(`<i class="${cls}(?: colored)?".*?><\\/i>`, 'g');
  html = html.replace(regex, `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}" alt="${cls.replace('devicon-','').split('-')[0]}" style="width: 2.22rem; height: 2.22rem;" />`);
}
// For Android inline style
html = html.replace(/<img src="https:\/\/cdn.jsdelivr.net\/gh\/devicons\/devicon@latest\/icons\/android\/android-plain.svg" alt="android" style="width: 2.22rem; height: 2.22rem;" style="margin-right: 4px; font-size: 1.1em;" \/>/g, '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-plain.svg" alt="android" style="width: 1.1em; height: 1.1em; margin-right: 4px; vertical-align: middle;" />');

// G. Image optimization & lazy loading
// Nexus QR
html = html.replace(/"assets\/img\/projects\/Nexus QR\.png"/g, '"assets/img/projects/nexus_qr.webp" loading="lazy" decoding="async" width="800" height="500"');
html = html.replace(/"assets\/img\/projects\/code_converter_preview_1773925957416\.png"/g, '"assets/img/projects/code_converter_preview_1773925957416.webp" loading="lazy" decoding="async" width="800" height="500"');
html = html.replace(/"assets\/img\/projects\/engineering_maths_new\.png"/g, '"assets/img/projects/engineering_maths_new.webp" loading="lazy" decoding="async" width="800" height="500"');
html = html.replace(/"assets\/img\/projects\/portfolio_preview\.png"/g, '"assets/img/projects/portfolio_preview.webp" loading="lazy" decoding="async" width="800" height="500"');

// H. Accessibility for GITHUB links
html = html.replace(/<a class="card-link" href="([^"]+)" target="_blank" rel="noopener">GitHub ↗<\/a>/g, (match, href) => {
  let proj = '';
  if (href.includes('Code-Converter')) proj = 'Code Converter';
  else if (href.includes('Nexus-QR')) proj = 'Nexus QR';
  else if (href.includes('engineering-math')) proj = 'Engineering Maths';
  else if (href.includes('FUTURE_FS_01')) proj = 'My Portfolio';
  return `<a class="card-link" href="${href}" target="_blank" rel="noopener" aria-label="View ${proj} on GitHub">GitHub ↗</a>`;
});

fs.writeFileSync('index.html', html);
console.log('index.html updated successfully.');
