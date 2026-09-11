document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        links.classList.contains("open") ? "true" : "false"
      );
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const heroPhotos = document.querySelectorAll(".hero-photo__img");
  if (heroPhotos.length > 1 && !reduceMotion) {
    let photoIndex = 0;
    setInterval(() => {
      heroPhotos[photoIndex].classList.remove("is-active");
      photoIndex = (photoIndex + 1) % heroPhotos.length;
      heroPhotos[photoIndex].classList.add("is-active");
    }, 3500);
  }

  const audio = document.getElementById("bgAudio");
  const soundToggle = document.getElementById("soundToggle");
  const soundLabel = document.getElementById("soundLabel");
  const eqBars = document.getElementById("eqBars");
  const nowPlayingLabel = document.getElementById("nowPlayingLabel");
  if (audio && soundToggle && soundLabel) {
    soundToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            soundToggle.setAttribute("aria-pressed", "true");
            soundLabel.textContent = "Sound on";
            if (eqBars) eqBars.classList.add("is-playing");
            if (nowPlayingLabel) nowPlayingLabel.textContent = "Now playing";
          })
          .catch(() => {
            soundLabel.textContent = "Music unavailable";
            soundToggle.disabled = true;
          });
      } else {
        audio.pause();
        soundToggle.setAttribute("aria-pressed", "false");
        soundLabel.textContent = "Sound off";
        if (eqBars) eqBars.classList.remove("is-playing");
        if (nowPlayingLabel) nowPlayingLabel.textContent = "Music off";
      }
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
});
