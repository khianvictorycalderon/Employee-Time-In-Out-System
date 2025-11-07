let menuOpen = false;

function highlightActiveButton(activePage) {
  const navbar = document.getElementById("navbar");
  Array.from(navbar.children).forEach(btn => {
    btn.classList.toggle("bg-neutral-700", btn.dataset.page === activePage);
  });
}

function handleMenuButton() {
  menuOpen = !menuOpen;
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-button");

  if (menuOpen) {
    navbar.className =
      "block lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full z-40";
    menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/></svg>`;
  } else {
    navbar.className =
      "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="2" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  }
}