(function () {
  const galleryImages = Array.from(document.querySelectorAll(".gallery img"));
  if (!galleryImages.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
    <button class="lightbox-next" aria-label="Next image">&#8250;</button>
    <figure class="lightbox-content">
      <img class="lightbox-img" src="" alt="" />
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector(".lightbox-img");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  const showNav = galleryImages.length > 1;
  prevBtn.style.display = showNav ? "" : "none";
  nextBtn.style.display = showNav ? "" : "none";

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    imgEl.src = img.currentSrc || img.src;
    imgEl.alt = img.alt;
    const figcaption = img.closest("figure")?.querySelector("figcaption");
    captionEl.textContent = figcaption ? figcaption.textContent : "";
  }

  function open(index) {
    show(index);
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-active");
  }

  function close() {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-active");
  }

  galleryImages.forEach((img, index) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => open(index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => show(currentIndex - 1));
  nextBtn.addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });
})();
