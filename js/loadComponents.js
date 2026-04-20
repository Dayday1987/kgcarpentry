document.addEventListener("DOMContentLoaded", function () {

  loadComponent("navbar", "components/navbar.html", initNavbar);
  loadComponent("footer", "components/footer.html");

});

function loadComponent(id, file, callback) {
  const container = document.getElementById(id);

  if (container) {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        container.innerHTML = data;
        if (callback) callback();
      })
      .catch(err => console.error(`Error loading ${id}:`, err));
  }
}

function initNavbar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  function toggleMenu() {
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  window.toggleMenu = toggleMenu;

  document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  nav.addEventListener("click", (e) => {
    if (e.target === nav) {
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}
