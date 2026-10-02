const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix unescaped ampersands in hrefs and text (mostly Google Fonts URL)
html = html.replace(/&family/g, '&amp;family').replace(/&display/g, '&amp;display');
html = html.replace(/& Web Tool/g, '&amp; Web Tool');
html = html.replace(/Engineering Maths AI Platform/g, 'Engineering Maths AI Platform'); // no ampersand here
html = html.replace(/Technology & Sciences/g, 'Technology &amp; Sciences');

// 2. Add type to buttons
html = html.replace(/<button id="theme-toggle"/g, '<button type="button" id="theme-toggle"');
html = html.replace(/<button class="nav-menu-btn"/g, '<button type="button" class="nav-menu-btn"');
html = html.replace(/<button class="btn-primary"/g, '<button type="button" class="btn-primary"');
html = html.replace(/<button class="btn-secondary"/g, '<button type="button" class="btn-secondary"');

// 3. Remove inline styles
// a. The tech icons I added:
html = html.replace(/style="width: 2\.22rem; height: 2\.22rem;"/g, 'class="tech-icon-img"');
// b. The 2.5rem icons:
html = html.replace(/style="width: 2\.5rem; height: 2\.5rem; object-fit: contain; border-radius: 4px;"/g, 'class="cert-icon-img rounded"');
html = html.replace(/style="width: 2\.5rem; height: 2\.5rem; object-fit: contain;"/g, 'class="cert-icon-img"');
// c. The 2rem icons:
html = html.replace(/style="width: 2rem; height: 2rem;"/g, 'class="cert-icon-sm"');
// d. The font-size: 2.2rem emojis:
html = html.replace(/style="font-size: 2\.2rem;"/g, 'class="emoji-icon"');
// e. Resume button:
html = html.replace(/style="margin-top:1\.8rem;display:inline-flex;"/g, 'class="btn-primary resume-btn"');
// f. Email icon:
html = html.replace(/style="font-size:1\.2rem;"/g, 'class="email-icon"');
// g. Form groups:
html = html.replace(/style="margin-bottom:1\.5rem;"/g, 'class="form-group full form-group-spaced"');
// h. Progress bars:
// style="--fill:100%" can stay if the linter ignores CSS vars, but wait, the linter complained.
html = html.replace(/style="--fill:100%"/g, 'class="edu-progress full-progress"');
// i. Footer text:
html = html.replace(/style="margin-top:0\.4rem;font-size:0\.75rem;"/g, 'class="footer-sub"');

// 4. Fix self-closing tags (/> to >) for void elements
html = html.replace(/<meta([^>]+)\/>/g, '<meta$1>');
html = html.replace(/<link([^>]+)\/>/g, '<link$1>');
html = html.replace(/<img([^>]+)\/>/g, '<img$1>');
html = html.replace(/<input([^>]+)\/>/g, '<input$1>');

fs.writeFileSync('index.html', html);

// Append CSS for the extracted inline styles
let css = fs.readFileSync('css/bundle.min.css', 'utf8');
css += `.tech-icon-img{width:2.22rem;height:2.22rem;}.cert-icon-img{width:2.5rem;height:2.5rem;object-fit:contain;}.cert-icon-img.rounded{border-radius:4px;}.cert-icon-sm{width:2rem;height:2rem;}.emoji-icon{font-size:2.2rem;}.resume-btn{margin-top:1.8rem;display:inline-flex;}.email-icon{font-size:1.2rem;}.form-group-spaced{margin-bottom:1.5rem !important;}.full-progress{--fill:100%;}.footer-sub{margin-top:0.4rem;font-size:0.75rem;}`;
fs.writeFileSync('css/bundle.min.css', css);

console.log('Fixed lint errors');
