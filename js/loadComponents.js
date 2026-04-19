document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");

  if (navbarContainer) {
    fetch("components/navbar.html")
      .then(response => response.text())
      .then(data => {
        navbarContainer.innerHTML = data;

        // 🔥 run navbar logic AFTER it's injected
        initNavbar();
      })
      .catch(error => console.error("Error loading navbar:", error));
  }
});

function initNavbar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  function toggleMenu() {
    nav.classList.toggle("active");

    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  // make it available to onclick=""
  window.toggleMenu = toggleMenu;

  // close on link click
  document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // close when tapping background
  nav.addEventListener("click", (e) => {
    if (e.target === nav) {
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}
