// Helper: Detect if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Function: Update media sources
  function updateMediaSources() {
    const mediaElements = document.querySelectorAll('.responsive-media');
  
    mediaElements.forEach(element => {
      const src = isMobile() ? element.getAttribute('data-src-mobile') : element.getAttribute('data-src-desktop');
  
      if (!src) return;
  
      if (element.tagName.toLowerCase() === 'img') {
        if (element.src !== src) {
          element.src = src;
        }
      } else if (element.tagName.toLowerCase() === 'iframe') {
        if (element.src !== src) {
          element.src = src;
        }
      }
    });
  }
  
  // Function: Initialize Vimeo Background Videos
  function initVimeoBGVideo() {
    const vimeoPlayers = document.querySelectorAll('[data-vimeo-bg-init]');
  
    vimeoPlayers.forEach(function(vimeoElement, index) {
      const vimeoVideoID = isMobile() 
        ? vimeoElement.getAttribute('data-vimeo-video-id-mobile') 
        : vimeoElement.getAttribute('data-vimeo-video-id-desktop');
      if (!vimeoVideoID) return;
  
      const vimeoVideoURL = `https://player.vimeo.com/video/${vimeoVideoID}?api=1&background=1&autoplay=0&loop=1&muted=1`;
      const iframe = vimeoElement.querySelector('iframe');
      if (!iframe) return;
  
      iframe.setAttribute('src', vimeoVideoURL);
  
      // Assign unique ID
      const videoIndexID = 'vimeo-bg-index-' + index;
      vimeoElement.setAttribute('id', videoIndexID);
  
      const player = new Vimeo.Player(videoIndexID);
      let videoAspectRatio;
  
      // Update Aspect Ratio if needed
      if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
        player.getVideoWidth().then(width => {
          player.getVideoHeight().then(height => {
            videoAspectRatio = height / width;
            const beforeEl = vimeoElement.querySelector('.vimeo-player__before');
            if (beforeEl) {
              beforeEl.style.paddingTop = videoAspectRatio * 100 + '%';
            }
            adjustVideoSizing();
          });
        });
      }
  
      function adjustVideoSizing() {
        const containerAspectRatio = (vimeoElement.offsetHeight / vimeoElement.offsetWidth) * 100;
        const iframeWrapper = vimeoElement.querySelector('.vimeo-bg__iframe-wrapper');
        if (iframeWrapper && videoAspectRatio) {
          if (containerAspectRatio > videoAspectRatio * 100) {
            iframeWrapper.style.width = `${(containerAspectRatio / (videoAspectRatio * 100)) * 100}%`;
          } else {
            iframeWrapper.style.width = '';
          }
        }
      }
  
      if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
        window.addEventListener('resize', adjustVideoSizing);
      }
  
      player.on('play', function() {
        vimeoElement.setAttribute('data-vimeo-loaded', 'true');
      });
  
      // Scroll-based autoplay
      if (vimeoElement.getAttribute('data-vimeo-autoplay') !== 'false') {
        let pausedByUser = vimeoElement.getAttribute('data-vimeo-paused-by-user') === 'true';
  
        function checkVisibility() {
          if (pausedByUser) return;
  
          const rect = vimeoElement.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          inView ? player.play() : player.pause();
        }
  
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
      }
  
      // Manual play/pause controls
      const playBtn = vimeoElement.querySelector('[data-vimeo-control="play"]');
      const pauseBtn = vimeoElement.querySelector('[data-vimeo-control="pause"]');
  
      if (playBtn) {
        playBtn.addEventListener('click', function() {
          player.play();
        });
      }
  
      if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
          player.pause();
          vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true');
        });
      }
    });
  }
  
  // Initialize everything on page load
  window.addEventListener('DOMContentLoaded', function() {
    updateMediaSources();
    initVimeoBGVideo();
  });
  
  // Update media sources on window resize
  window.addEventListener('resize', function() {
    updateMediaSources();
  });  