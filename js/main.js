document.addEventListener("DOMContentLoaded", () => {

  let index = 0;
  const slides = document.querySelectorAll(".services-slide");

  if (!slides.length) return; // 🔥 prevents errors on other pages

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  setInterval(nextSlide, 4000);

});
