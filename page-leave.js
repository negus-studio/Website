  //Page Leave message
  const documentTitleStore = document.title;
  const documentTitleOnBlur = "Come back! We miss you"; // Define your custom title here

  // Set original title if user is on the site
  window.addEventListener("focus", () => {
    document.title = documentTitleStore;
  });

  // If user leaves tab, set the alternative title
  window.addEventListener("blur", () => {
    document.title = documentTitleOnBlur;
  });