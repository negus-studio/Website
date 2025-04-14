	//Loader
  function initLoaderThreeSteps() { 
    var tl = gsap.timeline();

    gsap.defaults({
      ease: "Expo.easeInOut",
      duration: 1.2
    });

    /* Loading numbers */
    var randomNumbers1 = gsap.utils.random([2, 3, 4]);
    var randomNumbers2 = gsap.utils.random([5, 6]);
    var randomNumbers3 = gsap.utils.random([1, 5]);
    var randomNumbers4 = gsap.utils.random([7, 8, 9]);

    /* Loading Timeline */
    tl.set(".loading-screen", { display: "block" });
    tl.set(".loading__progress-inner", { scaleY: 0 });
    tl.set(".loading__number-group.is--first .loading__number-wrap, .loading__percentage", { yPercent: 100 });
    tl.set(".loading__number-group.is--second .loading__number-wrap, .loading__number-group.is--third .loading__number-wrap", { yPercent: 10 });

    tl.to(".loading__progress-inner", { scaleY: (randomNumbers1 + "" + randomNumbers3) / 100 });
    tl.to(".loading__percentage", { yPercent: 0 }, "<");
    tl.to(".loading__number-group.is--second .loading__number-wrap", { yPercent: (randomNumbers1 - 1) * -10 }, "<");
    tl.to(".loading__number-group.is--third .loading__number-wrap", { yPercent: (randomNumbers3 - 1) * -10 }, "<");

    tl.to(".loading__progress-inner", { scaleY: (randomNumbers2 + "" + randomNumbers4) / 100 });
    tl.to(".loading__number-group.is--second .loading__number-wrap", { yPercent: (randomNumbers2 - 1) * -10 }, "<");
    tl.to(".loading__number-group.is--third .loading__number-wrap", { yPercent: (randomNumbers4 - 1) * -10 }, "<");

    tl.to(".loading__progress-inner", { scaleY: 1 });
    tl.to(".loading__number-group.is--second .loading__number-wrap", { yPercent: -90 }, "<");
    tl.to(".loading__number-group.is--third .loading__number-wrap", { yPercent: -90 }, "<");
    tl.to(".loading__number-group.is--first .loading__number-wrap", { yPercent: 0 }, "<");

    // Fade out and remove .loading-container
    tl.to(".loading-container", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.querySelector(".loading-container").style.display = "none";
      }
    });
  }

  /* Init Loading Function */
  document.addEventListener("DOMContentLoaded", () => {
    initLoaderThreeSteps();
  });