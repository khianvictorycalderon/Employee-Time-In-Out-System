// ================== PAGE LOADER ==================
const validPages = ["time", "logs", "employees", "readme", "credits"];

async function loadPage(page) {
  const content = document.getElementById("content");

  switch (page) {
    case "employees":
      content.innerHTML = pageEmployeesContent;
      await renderEmployees(); // Load employees once the page is displayed
      break;

    case "logs":
      content.innerHTML = pageLogsContent;
      await renderLogs();
      initLogsSearch();
      break;

    case "readme":
      content.innerHTML = pageReadMeContent;
      break;

    case "credits":
      content.innerHTML = pageCreditsContent;
      break;

    default:
      content.innerHTML = pageTimeInOutContent;
  }

  // collapse mobile navbar if needed
  if (window.innerWidth < 1024) {
    document.getElementById("navbar").className =
      "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    document.getElementById("menu-button").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="2" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    menuOpen = false;
  }
}

// ================== INITIAL PAGE HANDLING ==================
function initPages() {
  const params = new URLSearchParams(window.location.search);
  let currentPage = params.get("page");

  // Redirect to ?page=time if empty or invalid
  if (!validPages.includes(currentPage)) {
    window.location.replace("?page=time");
    return; // stop execution until redirect
  }

  loadPage(currentPage);

  // Setup navbar buttons
  const navbar = document.getElementById("navbar");
  navbar.innerHTML = "";
  const buttons = [
    { label: "Time In / Out", page: "time" },
    { label: "Logs", page: "logs" },
    { label: "Employees", page: "employees" },
    { label: "Read Me", page: "readme" },
    { label: "Credits", page: "credits" },
  ];

  buttons.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.dataset.page = item.page;
    btn.className = "w-full p-2 text-left text-white hover:bg-neutral-700 transition text-center";
    btn.addEventListener("click", () => {
      history.pushState({ page: item.page }, "", `?page=${item.page}`);
      loadPage(item.page);
      highlightActiveButton(item.page);
    });
    navbar.appendChild(btn);
  });

  highlightActiveButton(currentPage);

  window.addEventListener("popstate", e => {
    const page = e.state?.page || new URLSearchParams(window.location.search).get("page");
    loadPage(page);
    highlightActiveButton(page);
  });
}

window.onload = initPages;
