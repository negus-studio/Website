/*Navbar Script*/
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".w-nav-button");
  const navbarComponent = document.querySelector(".navbar-component");

  if (!menuButton || !navbarComponent) {
    console.warn("Navbar elements not found!");
    return;
  }

  const observer = new MutationObserver(() => {
  	
    if (menuButton.classList.contains("w--open")) {
    	navbarComponent.style.setProperty("mix-blend-mode", "normal", "important");
    } else {
    	setTimeout(() => {
      	navbarComponent.style.removeProperty("mix-blend-mode");
        console.log("Navbar closed - mix-blend-mode removed");
      }, 400); // 400ms delay
    }
  });

  observer.observe(menuButton, { attributes: true, attributeFilter: ["class"] });
});