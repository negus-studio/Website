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
      } else if (element.tagName.toLowerCase() === 'iframe') {
        // Handle <iframe> elements (Vimeo)
        if (element.src !== src) {
          element.src = src;
        }
      }
    });
  }

  // Set up autoplay control for Vimeo iframes
  function setupVimeoAutoplay() {
    const iframes = document.querySelectorAll('iframe.responsive-vimeo');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const iframe = entry.target;
          const player = new Vimeo.Player(iframe);

          if (entry.isIntersecting) {
            player.play().catch(error => {
              console.log('Autoplay error:', error);
            });
          } else {
            player.pause().catch(error => {
              console.log('Pause error:', error);
            });
          }
        });
      }, { threshold: 0.5 }); // Adjust visibility threshold

      iframes.forEach(iframe => {
        observer.observe(iframe);
      });
    }
  }

  // On page load
  window.addEventListener('DOMContentLoaded', () => {
    updateMediaSources();
    setupVimeoAutoplay();
  });

  // Also update on window resize
  window.addEventListener('resize', () => {
    updateMediaSources();
  });