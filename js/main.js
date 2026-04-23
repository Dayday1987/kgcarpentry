document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO SLIDER ================= */

  const heroSlides = document.getElementById("slides");
  const dotsContainer = document.getElementById("dots");

  if (heroSlides && dotsContainer) {

    let index = 0;
    let interval;
    let startX = 0;
    let endX = 0;

    const totalSlides = heroSlides.children.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => {
        index = i;
        updateHeroSlider();
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.children;

    function updateHeroSlider() {
      heroSlides.style.transform = `translateX(-${index * 100}%)`;

      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
      dots[index].classList.add("active");
    }

    function nextSlide() {
      index = (index + 1) % totalSlides;
      updateHeroSlider();
    }

    function prevSlide() {
      index = (index - 1 + totalSlides) % totalSlides;
      updateHeroSlider();
    }

    // Global buttons
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    function startAutoSlide() {
      interval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
      clearInterval(interval);
    }

    function restartAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    const slider = document.querySelector(".slider");

    if (slider) {
      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        endX = startX;
      });

      slider.addEventListener("touchmove", (e) => {
        endX = e.touches[0].clientX;
      });

      slider.addEventListener("touchend", () => {
        const threshold = 50;

        if (startX - endX > threshold) nextSlide();
        else if (endX - startX > threshold) prevSlide();

        restartAutoSlide();
      });

      if (window.innerWidth >= 768) {
        slider.addEventListener("mouseenter", stopAutoSlide);
        slider.addEventListener("mouseleave", startAutoSlide);
      }
    }

    updateHeroSlider();
    startAutoSlide();
  }

  /* ================= BEFORE / AFTER ================= */

  const baSliders = document.querySelectorAll(".ba-slider");

  if (baSliders.length) {
    baSliders.forEach(slider => {
      const afterWrapper = slider.querySelector(".after-wrapper");
      const handle = slider.querySelector(".ba-handle");

      let isDragging = false;

      afterWrapper.style.width = "50%";
      handle.style.left = "50%";

      function updatePosition(x) {
        const rect = slider.getBoundingClientRect();
        let position = x - rect.left;

        position = Math.max(0, Math.min(position, rect.width));

        const percent = (position / rect.width) * 100;

        afterWrapper.style.width = percent + "%";
        handle.style.left = percent + "%";
      }

      slider.addEventListener("mousedown", e => {
        isDragging = true;
        updatePosition(e.clientX);
      });

      window.addEventListener("mouseup", () => isDragging = false);

      window.addEventListener("mousemove", e => {
        if (!isDragging) return;
        updatePosition(e.clientX);
      });

      slider.addEventListener("touchstart", e => {
        isDragging = true;
        updatePosition(e.touches[0].clientX);
      });

      window.addEventListener("touchend", () => isDragging = false);

      window.addEventListener("touchmove", e => {
        if (!isDragging) return;
        updatePosition(e.touches[0].clientX);
      });
    });
  }

  /* ================= REVIEW SLIDER ================= */

  const reviewSlides = document.getElementById("reviewSlides");

  if (reviewSlides) {

    let reviewIndex = 0;
    const reviewItems = reviewSlides.children;

    function updateReviewSlider() {
      const slideWidth = reviewItems[0].offsetWidth;
      reviewSlides.style.transform = `translateX(-${reviewIndex * slideWidth}px)`;
    }

    function nextReview() {
      reviewIndex = (reviewIndex + 1) % reviewItems.length;
      updateReviewSlider();
    }

    function prevReview() {
      reviewIndex = (reviewIndex - 1 + reviewItems.length) % reviewItems.length;
      updateReviewSlider();
    }

    window.nextReview = nextReview;
    window.prevReview = prevReview;

    window.addEventListener("resize", updateReviewSlider);

    setInterval(nextReview, 5000);

    updateReviewSlider();
  }

});

/* ================= SCROLL ANIMATIONS ================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

/* ================= GALLERY FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // active button
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach(item => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

  });
});

/* ================= LIGHTBOX ================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const serviceSlides = document.querySelectorAll(".services-slide");

  // 🔥 STOP if not on services page
  if (serviceSlides.length === 0) return;

  let index = 0;

  function showSlide(i) {
    serviceSlides.forEach(slide => slide.classList.remove("active"));
    serviceSlides[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % serviceSlides.length;
    showSlide(index);
  }

  setInterval(nextSlide, 4000);

});
