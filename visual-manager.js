// Helper: Detect if device is mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Update sources for all responsive media
function updateMediaSources() {
  const mediaElements = document.querySelectorAll('.responsive-media');

  mediaElements.forEach(element => {
    const src = isMobile() ? element.getAttribute('data-src-mobile') : element.getAttribute('data-src-desktop');

    if (element.tagName.toLowerCase() === 'img') {
      // Handle <img> elements
      if (element.src !== src) {
        element.src = src;
      }
    } 
  });
}

// On page load
window.addEventListener('DOMContentLoaded', () => {
  updateMediaSources();
  //setupVimeoAutoplay();
});

// Also update on window resize
window.addEventListener('resize', () => {
  updateMediaSources();
});
