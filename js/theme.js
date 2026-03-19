/**
 * js/theme.js — Theme Toggle Logic (Light/Dark Mode)
 * Persists user preference via localStorage
 */

(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Icons (Lucide-like SVG strings or simple text/emoji)
  const sunIcon = `<span>☀️</span>`;
  const moonIcon = `<span>🌙</span>`;

  // Function to set theme
  function setTheme(isLight) {
    if (isLight) {
      body.classList.add('light-mode');
      if (themeToggle) themeToggle.innerHTML = moonIcon;
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      if (themeToggle) themeToggle.innerHTML = sunIcon;
      localStorage.setItem('theme', 'dark');
    }
  }

  // Initial check (before page load to prevent flash)
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light') {
    setTheme(true);
  } else {
    setTheme(false);
  }

  // Event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyLight = body.classList.contains('light-mode');
      setTheme(!isCurrentlyLight);
    });
  }
})();
