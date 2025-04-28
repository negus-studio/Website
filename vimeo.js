function initVimeoBGVideo() {
  // Select all elements that have [data-vimeo-bg-init]
  const vimeoPlayers = document.querySelectorAll('[data-vimeo-bg-init]');

  vimeoPlayers.forEach(function(vimeoElement, index) {
    
    // Choose Vimeo Video ID based on screen size
    const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed
    const vimeoVideoID = isMobile 
      ? vimeoElement.getAttribute('data-vimeo-video-id-mobile') 
      : vimeoElement.getAttribute('data-vimeo-video-id-desktop');
    
    if (!vimeoVideoID) return;

    const vimeoVideoURL = `https://player.vimeo.com/video/${vimeoVideoID}?api=1&background=1&autoplay=0&loop=1&muted=1`;
    vimeoElement.querySelector('iframe').setAttribute('src', vimeoVideoURL);

    // Assign an ID to each element
    const videoIndexID = 'vimeo-bg-index-' + index;
    vimeoElement.setAttribute('id', videoIndexID);

    const iframeID = vimeoElement.id;
    const player = new Vimeo.Player(iframeID);

    let videoAspectRatio;

    // Update Aspect Ratio if [data-vimeo-update-size="true"]
    if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
      player.getVideoWidth().then(function(width) {
        player.getVideoHeight().then(function(height) {
          videoAspectRatio = height / width;
          const beforeEl = vimeoElement.querySelector('.vimeo-player__before');
          if (beforeEl) {
            beforeEl.style.paddingTop = videoAspectRatio * 100 + '%';
          }
        });
      });
    }

    // Function to adjust video sizing
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

    // Adjust video sizing initially
    if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
      adjustVideoSizing();
      player.getVideoWidth().then(function() {
        player.getVideoHeight().then(function() {
          adjustVideoSizing();
        });
      });
    } else {
      adjustVideoSizing();
    }

    // Adjust video sizing on resize
    window.addEventListener('resize', adjustVideoSizing);

    // Loaded
    player.on('play', function() {
      vimeoElement.setAttribute('data-vimeo-loaded', 'true');
    });

    // Autoplay
    if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'false') {
      // Autoplay = false
      player.pause();
    } else {
      // Autoplay = true
      // If paused-by-user === false, do scroll-based autoplay
      if (vimeoElement.getAttribute('data-vimeo-paused-by-user') === 'false') {
        function checkVisibility() {
          const rect = vimeoElement.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          inView ? vimeoPlayerPlay() : vimeoPlayerPause();
        }

        // Initial check
        checkVisibility();

        // Handle scroll
        window.addEventListener('scroll', checkVisibility);
      }
    }

    // Function: Play Video
    function vimeoPlayerPlay() {
      vimeoElement.setAttribute('data-vimeo-activated', 'true');
      vimeoElement.setAttribute('data-vimeo-playing', 'true');
      player.play();
    }

    // Function: Pause Video
    function vimeoPlayerPause() {
      vimeoElement.setAttribute('data-vimeo-playing', 'false');
      player.pause();
    }

    // Click: Play
    const playBtn = vimeoElement.querySelector('[data-vimeo-control="play"]');
    if (playBtn) {
      playBtn.addEventListener('click', function() {
        vimeoPlayerPlay();
      });
    }

    // Click: Pause
    const pauseBtn = vimeoElement.querySelector('[data-vimeo-control="pause"]');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function() {
        vimeoPlayerPause();
        // If paused by user => kill the scroll-based autoplay
        if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
          vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true');
          window.removeEventListener('scroll', checkVisibility);
        }
      });
    }
  });
}

// Initialize Vimeo Background Video
document.addEventListener('DOMContentLoaded', function() {
  initVimeoBGVideo();
});
