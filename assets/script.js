function onLoad() {
  const buttons = [
    { label: "Time In / Out", page: "time" },
    { label: "Logs", page: "logs" },
    { label: "Employees", page: "employees" },
    { label: "Credits", page: "credits" },
  ];

  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");

  if (!navbar || !content) {
    console.error("Navbar or content element not found!");
    return;
  }

  // Clear and rebuild navbar
  navbar.innerHTML = "";
  buttons.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.className = "w-full p-2 rounded text-left text-white hover:bg-neutral-700 transition text-center";
    btn.addEventListener("click", () => {
      // Update URL without reload
      const newUrl = `?page=${item.page}`;
      history.pushState({ page: item.page }, "", newUrl);
      loadPage(item.page);
      highlightActiveButton(item.page);
    });
    navbar.appendChild(btn);
  });

  // Load initial page
  const params = new URLSearchParams(window.location.search);
  const currentPage = params.get("page") || "time";
  loadPage(currentPage);
  highlightActiveButton(currentPage);

  // Handle back/forward navigation
  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || new URLSearchParams(window.location.search).get("page");
    loadPage(page);
    highlightActiveButton(page);
  });

  // Function: load main content
  function loadPage(page) {
    switch (page) {
      case "logs":
        content.innerHTML = `<h1 class="text-2xl p-4">🗂 Logs</h1><p class="p-4">Here you can view employee log records.</p>`;
        break;
      case "employees":
        content.innerHTML = `<h1 class="text-2xl p-4">👥 Employees</h1><p class="p-4">Manage your employees here.</p>`;
        break;
      case "credits":
        content.innerHTML = `<h1 class="text-2xl p-4">💳 Credits</h1><p class="p-4">Developed by your amazing team!</p>`;
        break;
      default:
        content.innerHTML = `<h1 class="text-2xl p-4">🕒 Time In / Out</h1><p class="p-4">Record employee attendance here.</p>`;
    }
  }

  // Function: highlight active button
  function highlightActiveButton(activePage) {
    Array.from(navbar.children).forEach((btn, i) => {
      const btnPage = buttons[i].page;
      btn.classList.toggle("bg-neutral-700", btnPage === activePage);
    });
  }
}
