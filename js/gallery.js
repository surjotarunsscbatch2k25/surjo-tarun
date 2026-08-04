/* =========================================
   Surjo Tarun Premium Gallery
   Apple Photos Style + Glassmorphism
   ========================================= */

const albumsData = [
  {
    id: "school",
    title: "School Life",
    cover: "images/1.jpg",          // ← এখানে তোমার কভার ছবির নাম দাও
    photos: [
      { src: "images/1.jpg", title: "School Life 1" },
      { src: "images/2.jpg", title: "School Life 2" },
      { src: "images/3.jpg", title: "School Life 3" },
      { src: "images/4.jpg", title: "School Life 4" },
      // আরও ছবি যোগ করতে এভাবে লিখো
    ]
  },
  {
    id: "farewell",
    title: "Farewell 2025",
    cover: "images/5.jpg",
    photos: [
      { src: "images/5.jpg", title: "Farewell 1" },
      { src: "images/6.jpg", title: "Farewell 2" },
      { src: "images/7.jpg", title: "Farewell 3" },
    ]
  },
  {
    id: "teachers",
    title: "Teachers",
    cover: "images/8.jpg",
    photos: [
      { src: "images/8.jpg", title: "Teachers 1" },
      { src: "images/9.jpg", title: "Teachers 2" },
    ]
  },
  {
    id: "sports",
    title: "Sports",
    cover: "images/10.jpg",
    photos: [
      { src: "images/10.jpg", title: "Sports 1" },
      { src: "images/11.jpg", title: "Sports 2" },
    ]
  },
  {
    id: "picnic",
    title: "Picnic",
    cover: "images/12.jpg",
    photos: [
      { src: "images/12.jpg", title: "Picnic 1" },
      { src: "images/13.jpg", title: "Picnic 2" },
    ]
  }
];

// ========== State ==========
let currentAlbum = null;
let currentPhotos = [];
let currentIndex = 0;
let currentZoom = 1;
let touchStartX = 0;
let touchEndX = 0;

// ========== DOM Elements ==========
const albumsGrid = document.getElementById("albumsGrid");
const albumView = document.getElementById("albumView");
const photosGrid = document.getElementById("photosGrid");
const currentAlbumTitle = document.getElementById("currentAlbumTitle");
const currentAlbumMeta = document.getElementById("currentAlbumMeta");
const backToAlbumsBtn = document.getElementById("backToAlbums");
const filterTabs = document.getElementById("filterTabs");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const zoomResetBtn = document.getElementById("zoomReset");

// ========== Initialize ==========
document.addEventListener("DOMContentLoaded", () => {
  renderAlbums("all");
  setupFilterButtons();
  setupLightboxControls();
  setupKeyboard();
  setupSwipe();
});

// ========== Render Album Cards ==========
function renderAlbums(filter = "all") {
  albumsGrid.innerHTML = "";
  albumView.classList.add("hidden");
  document.querySelector(".albums-section").classList.remove("hidden");

  const filtered = filter === "all" 
    ? albumsData 
    : albumsData.filter(a => a.id === filter);

  if (filtered.length === 0) {
    albumsGrid.innerHTML = `<p style="text-align:center;color:#64748b;grid-column:1/-1;">কোনো অ্যালবাম পাওয়া যায়নি</p>`;
    return;
  }

  filtered.forEach(album => {
    const card = document.createElement("div");
    card.className = "album-card";
    card.innerHTML = `
      <img src="\( {album.cover}" alt=" \){album.title}" class="album-cover" loading="lazy">
      <div class="album-body">
        <h3 class="album-title">${album.title}</h3>
        <p class="album-meta">
          <i class="fas fa-images"></i> ${album.photos.length} Photos
        </p>
        <div class="album-open-btn">
          Open Album <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openAlbum(album));
    albumsGrid.appendChild(card);
  });
}

// ========== Open Album ==========
function openAlbum(album) {
  currentAlbum = album;
  currentPhotos = album.photos;

  document.querySelector(".albums-section").classList.add("hidden");
  albumView.classList.remove("hidden");

  currentAlbumTitle.textContent = album.title;
  currentAlbumMeta.textContent = `${album.photos.length} Photos`;

  photosGrid.innerHTML = "";
  album.photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "photo-item";
    item.innerHTML = `<img src="\( {photo.src}" alt=" \){photo.title}" loading="lazy">`;
    item.addEventListener("click", () => openLightbox(index));
    photosGrid.appendChild(item);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========== Back to Albums ==========
backToAlbumsBtn.addEventListener("click", () => {
  albumView.classList.add("hidden");
  document.querySelector(".albums-section").classList.remove("hidden");
  currentAlbum = null;
});

// ========== Filter Buttons ==========
function setupFilterButtons() {
  const buttons = filterTabs.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderAlbums(filter);
    });
  });
}

// ========== Lightbox ==========
function openLightbox(index) {
  currentIndex = index;
  currentZoom = 1;
  updateLightboxImage();
  lightbox.classList.remove("hidden");
  setTimeout(() => lightbox.classList.add("active"), 10);
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  setTimeout(() => {
    lightbox.classList.add("hidden");
    lightboxImage.style.transform = "scale(1)";
  }, 300);
  document.body.style.overflow = "";
}

function updateLightboxImage() {
  const photo = currentPhotos[currentIndex];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
  lightboxTitle.textContent = photo.title;
  lightboxImage.style.transform = `scale(${currentZoom})`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentPhotos.length;
  currentZoom = 1;
  updateLightboxImage();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
  currentZoom = 1;
  updateLightboxImage();
}

// ========== Lightbox Controls ==========
function setupLightboxControls() {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNext);
  lightboxPrev.addEventListener("click", showPrev);

  zoomInBtn.addEventListener("click", () => {
    currentZoom = Math.min(currentZoom + 0.3, 3);
    lightboxImage.style.transform = `scale(${currentZoom})`;
  });

  zoomOutBtn.addEventListener("click", () => {
    currentZoom = Math.max(currentZoom - 0.3, 1);
    lightboxImage.style.transform = `scale(${currentZoom})`;
  });

  zoomResetBtn.addEventListener("click", () => {
    currentZoom = 1;
    lightboxImage.style.transform = `scale(1)`;
  });

  // Click outside image to close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// ========== Keyboard Support ==========
function setupKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}

// ========== Mobile Swipe ==========
function setupSwipe() {
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) < 50) return; // minimum swipe distance

  if (diff > 0) showNext();      // swipe left → next
  else showPrev();               // swipe right → prev
}
