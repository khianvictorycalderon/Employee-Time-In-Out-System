var menuOpen = false;

// ================== PAGE CONTENT ==================
const pageTimeInOutContent = `
  <section class="p-6 max-w-md mx-auto text-center">
    <h1 class="text-3xl font-semibold mb-6">🕒 Time In / Out</h1>

    <form id="timeForm" class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-6">
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
          required
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
  <section class="max-w-5xl mx-auto p-6 text-gray-200">
    <h2 class="text-3xl font-semibold mb-4 text-center">🗂 Logs</h2>
    <div class="overflow-x-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-md">
      <table class="w-full text-left border-collapse">
        <thead class="bg-white/20 text-gray-100">
          <tr>
            <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Status</th>
            <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Employee Name</th>
            <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Time</th>
            <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Date</th>
          </tr>
        </thead>
        <tbody id="logsTableBody" class="divide-y divide-white/10 text-gray-200"></tbody>
      </table>
    </div>
  </section>
`;

const pageEmployeesContent = `
  <section class="max-w-4xl mx-auto p-6 text-gray-200">
    <h2 class="text-3xl font-semibold mb-4 text-center">👥 Employees</h2>
    
    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 font-semibold text-gray-100 mb-4">
        <div>ID</div>
        <div>Employee Name</div>
        <div class="hidden md:block"></div>
      </div>

      <div id="employeesContainer" class="space-y-3"></div>

      <div class="flex justify-center gap-4 mt-6 flex-wrap">
        <button id="addEmployeeBtn" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md">Add</button>
      </div>
    </div>
  </section>
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
          class="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors duration-200"
        >
          here
        </a>.
      </p>

      <div class="pt-4 text-center">
        <button id="clearDataBtn" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
          🗑️ Clear All Data
        </button>
      </div>
    </div>
  </section>
`;

// ================== UTILITIES ==================
function getLocalData(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ================== ON LOAD ==================
function onLoad() {
  const buttons = [
    { label: "Time In / Out", page: "time" },
    { label: "Logs", page: "logs" },
    { label: "Employees", page: "employees" },
    { label: "Credits", page: "credits" },
  ];

  const navbar = document.getElementById("navbar");
  const content = document.getElementById("content");

  navbar.innerHTML = "";
  buttons.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.className = "w-full p-2 text-left text-white hover:bg-neutral-700 transition text-center";
    btn.addEventListener("click", () => {
      const newUrl = `?page=${item.page}`;
      history.pushState({ page: item.page }, "", newUrl);
      loadPage(item.page);
      highlightActiveButton(item.page);
    });
    navbar.appendChild(btn);
  });

  const params = new URLSearchParams(window.location.search);
  const currentPage = params.get("page") || "time";
  loadPage(currentPage);
  highlightActiveButton(currentPage);

  window.addEventListener("popstate", (e) => {
    const page = e.state?.page || new URLSearchParams(window.location.search).get("page");
    loadPage(page);
    highlightActiveButton(page);
  });

  // Default data setup
  if (!localStorage.getItem("etiosEmployees")) {
    const defaultEmployees = [];
    saveLocalData("etiosEmployees", defaultEmployees);
  }
  if (!localStorage.getItem("etiosLogs")) saveLocalData("etiosLogs", []);
  if (!localStorage.getItem("etiosActive")) saveLocalData("etiosActive", []);
}

// ================== PAGE LOADER ==================
function loadPage(page) {
  const content = document.getElementById("content");
  switch (page) {
    case "logs":
      content.innerHTML = pageLogsContent;
      renderLogsTable();
      break;
    case "employees":
      content.innerHTML = pageEmployeesContent;
      renderEmployees();
      break;
    case "credits":
      content.innerHTML = pageCreditsContent;
      bindClearData();
      break;
    default:
      content.innerHTML = pageTimeInOutContent;
      bindTimeForm();
  }

  if (window.innerWidth < 1024) {
    document.getElementById("navbar").className =
      "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    document.getElementById("menu-button").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
    menuOpen = false;
  }
}

// ================== TIME IN/OUT ==================
function bindTimeForm() {
  const form = document.getElementById("timeForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("employeeId").value.trim();
    if (!id) return alert("Please enter an Employee ID");

    const employees = getLocalData("etiosEmployees", []);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return alert("Employee not found!");

    let active = getLocalData("etiosActive", []);
    const logs = getLocalData("etiosLogs", []);

    let status;
    if (active.includes(id)) {
      active = active.filter(a => a !== id);
      status = "Time Out";
    } else {
      active.push(id);
      status = "Time In";
    }

    const newLog = {
      id,
      name: employee.name,
      status,
      time: getCurrentTime(),
      date: getCurrentDate(),
    };

    logs.unshift(newLog);
    saveLocalData("etiosActive", active);
    saveLocalData("etiosLogs", logs);

    alert(`${employee.name} ${status} successfully!`);
    form.reset();
  });
}

// ================== LOGS ==================
function renderLogsTable() {
  const logs = getLocalData("etiosLogs", []);
  const tbody = document.getElementById("logsTableBody");
  tbody.innerHTML = logs.map(log => `
    <tr class="hover:bg-white/10 transition-colors duration-150">
      <td class="py-3 px-4">${log.status}</td>
      <td class="py-3 px-4">${log.name}</td>
      <td class="py-3 px-4">${log.time}</td>
      <td class="py-3 px-4">${log.date}</td>
    </tr>
  `).join("");
}

// ================== EMPLOYEES ==================
function renderEmployees() {
  const container = document.getElementById("employeesContainer");

  function renderList() {
    const employees = getLocalData("etiosEmployees", []);
    container.innerHTML = employees.map(emp => `
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <input type="text" value="${emp.id}" class="p-2 rounded text-black w-full emp-id" />
        <input type="text" value="${emp.name}" class="p-2 rounded text-black w-full emp-name" />
        <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md delete-emp">Delete</button>
      </div>
    `).join("");
  }

  renderList();

  // Auto-save + relational + duplicate ID filter
  container.addEventListener("input", () => {
    const rows = Array.from(container.children);
    const seenIds = new Set();
    const updated = [];
    let duplicateFound = false;

    rows.forEach(row => {
      const id = row.querySelector(".emp-id").value.trim();
      const name = row.querySelector(".emp-name").value.trim();

      if (id && name) {
        if (seenIds.has(id)) {
          duplicateFound = true;
        } else {
          seenIds.add(id);
          updated.push({ id, name });
        }
      }
    });

    if (duplicateFound) {
      alert("Duplicate Employee ID detected! Only the first entry with this ID will be saved.");
    }

    saveLocalData("etiosEmployees", updated);

    // Relational update
    const logs = getLocalData("etiosLogs", []);
    logs.forEach(log => {
      const match = updated.find(e => e.id === log.id);
      if (match) log.name = match.name;
    });
    saveLocalData("etiosLogs", logs);
  });

  // Delete employee
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-emp")) {
      const index = [...container.children].indexOf(e.target.closest("div"));
      const employees = getLocalData("etiosEmployees", []);
      employees.splice(index, 1);
      saveLocalData("etiosEmployees", employees);
      renderList();
    }
  });

  // Add employee
  document.getElementById("addEmployeeBtn").addEventListener("click", () => {
    const employees = getLocalData("etiosEmployees", []);
    employees.push({ id: "", name: "" });
    saveLocalData("etiosEmployees", employees);
    renderList();
  });
}

// ================== CLEAR DATA ==================
function bindClearData() {
  const btn = document.getElementById("clearDataBtn");
  btn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete ALL saved data?")) {
      localStorage.clear();
      alert("All ETIOS data cleared!");
      location.reload();
    }
  });
}

// ================== NAVBAR HIGHLIGHT ==================
function highlightActiveButton(activePage) {
  const navbar = document.getElementById("navbar");
  Array.from(navbar.children).forEach((btn, i) => {
    const pages = ["time", "logs", "employees", "credits"];
    btn.classList.toggle("bg-neutral-700", pages[i] === activePage);
  });
}

// ================== MOBILE MENU ==================
function handleMenuButton() {
  menuOpen = !menuOpen;
  if (menuOpen) {
    document.getElementById("navbar").className =
      "block lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full z-40";
    document.getElementById("menu-button").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    `;
  } else {
    document.getElementById("navbar").className =
      "hidden lg:hidden lg:h-full bg-neutral-900 basis-1/4 overflow-auto py-8 fixed w-full";
    document.getElementById("menu-button").innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    `;
  }
}