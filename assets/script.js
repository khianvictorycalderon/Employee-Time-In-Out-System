var menuOpen = false;

// Pages
const pageTimeInOutContent = `
  <section class="p-6 max-w-md mx-auto text-center">
    <h1 class="text-3xl font-semibold mb-6">🕒 Time In / Out</h1>

    <form class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-6">
      <div class="space-y-3">
        <label for="employeeId" class="block text-lg font-medium text-gray-100">
          Employee ID
        </label>
        <input
          id="employeeId"
          name="employeeId"
          type="text"
          placeholder="Enter your ID..."
          class="w-full p-3 text-black rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
      >
        Log
      </button>
    </form>
  </section>
`;
const pageLogsContent = `
  <h2 class="text-2xl p-4">🗂 Logs</h2>
  <p class="p-4">Here you can view employee log records.</p>
`;
const pageEmployeesContent = `
  <h2 class="text-2xl p-4">👥 Employees</h2>
  <p class="p-4">Manage your employees here.</p>
`;
const pageCreditsContent = `
  <section class="max-w-2xl mx-auto p-6 text-gray-200">
    <h2 class="text-3xl font-semibold mb-4 text-center">💳 Credits</h2>

    <div class="space-y-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
      <p class="text-lg leading-relaxed">
        Website developed by
        <a
          href="https://khian.netlify.app"
          target="_blank"
          title="Khian's Official Website"
          class="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors duration-200"
        >
          Khian Victory D. Calderon
        </a>.
      </p>

      <div>
        <h3 class="text-xl font-medium mb-2">🛠️ Built With</h3>
        <ul class="list-disc list-inside text-lg text-gray-100 space-y-1">
          <li>HTML</li>
          <li>Tailwind CSS</li>
          <li>JavaScript (Vanilla)</li>
        </ul>
      </div>

      <p class="text-lg leading-relaxed">
        This is the web version of my previous <strong>ETIOS</strong> desktop project made in Python.
        Learn more about it
        <a
          href="https://github.com/khianvictorycalderon/Employee-Time-In-Out-System-Desktop"
          target="_blank"
          title="ETIOS Original & Desktop Version"
          class="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors duration-200"
        >
          here
        </a>.
      </p>
    </div>
  </section>
`;

// Misc Functions
function onLoad() {
  const buttons = [
    { label: "Time In / Out", page: "default" },
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
    btn.className = "w-full p-2 text-left text-white hover:bg-neutral-700 transition text-center";
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
        content.innerHTML = pageLogsContent;
        break;
      case "employees":
        content.innerHTML = pageEmployeesContent;
        break;
      case "credits":
        content.innerHTML = pageCreditsContent;
        break;
      default:
        content.innerHTML = pageTimeInOutContent;
    }

    // Close the navbar
    if (window.innerWidth < 1024) {
      document.getElementById("navbar").className = "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
      document.getElementById("menu-button").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
      menuOpen = false;
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

function handleMenuButton() {

  // Toggle
  menuOpen = !menuOpen;

  if (menuOpen) {
    document.getElementById("navbar").className = "block lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    document.getElementById("menu-button").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    `;
  } else {
    document.getElementById("navbar").className = "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    document.getElementById("menu-button").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
  }
}