const fs = require('fs');
const files = ['css/reset.css', 'css/variables.css', 'css/animations.css', 'css/components.css', 'css/layout.css'];
let combined = '';
for (const file of files) {
  combined += fs.readFileSync(file, 'utf8') + '\n';
}
// simple minification: remove comments and extra whitespace
combined = combined.replace(/\/\*[\s\S]*?\*\//g, '');
combined = combined.replace(/\s+/g, ' ');
combined = combined.replace(/\s*{\s*/g, '{');
combined = combined.replace(/\s*}\s*/g, '}');
combined = combined.replace(/\s*:\s*/g, ':');
combined = combined.replace(/\s*;\s*/g, ';');
fs.writeFileSync('css/bundle.min.css', combined);
console.log('CSS combined and minified successfully to css/bundle.min.css');
