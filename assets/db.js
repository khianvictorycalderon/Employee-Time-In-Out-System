let db;
const DB_NAME = "ETIOSDB";
const EMPLOYEE_STORE = "Employees";
const LOGS_STORE = "Logs";

// Uncomment this to delete database temporarily
// indexedDB.deleteDatabase(DB_NAME);
const request = indexedDB.open(DB_NAME, 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore(EMPLOYEE_STORE, { keyPath: "employee_id", autoIncrement: false} );
    db.createObjectStore(LOGS_STORE, { keyPath: "log_id", autoIncrement: true} );
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Successfully connected to database!");
};

request.onerror = (event) => {
    alert(`Failed to connect to database: ${event.target.error}`);
}

// ================== EMPLOYEE FUNCTIONS ==================

// Add or update employee
async function addEmployee(employee) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(EMPLOYEE_STORE, "readwrite");
    const store = tx.objectStore(EMPLOYEE_STORE);
    const req = store.put(employee); // upsert
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e);
  });
}

// Get all employees
async function getAllEmployees() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(EMPLOYEE_STORE, "readonly");
    const store = tx.objectStore(EMPLOYEE_STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e);
  });
}

// Delete employee
async function deleteEmployee(employee_id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(EMPLOYEE_STORE, "readwrite");
    const store = tx.objectStore(EMPLOYEE_STORE);
    const req = store.delete(employee_id);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e);
  });
}

// Render employees
async function renderEmployees() {
  const container = document.getElementById("employeesContainer");
  if (!container) return;

  const employees = await getAllEmployees();
  container.innerHTML = "";

  employees.forEach(emp => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-2 md:grid-cols-3 gap-4 items-center";

    const idInput = document.createElement("input");
    idInput.type = "text";
    idInput.value = emp.employee_id;
    idInput.className = "p-2 rounded text-black w-full";
    idInput.onchange = async () => {
      const newId = idInput.value.trim();
      if (!newId) return alert("Employee ID cannot be empty");
      await deleteEmployee(emp.employee_id);
      emp.employee_id = newId;
      await addEmployee(emp);
      renderEmployees();
    };

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = emp.employee_name;
    nameInput.className = "p-2 rounded text-black w-full";
    nameInput.onchange = async () => {
      emp.employee_name = nameInput.value.trim();
      await addEmployee(emp);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md";
    delBtn.onclick = async () => {
      if (!confirm("Delete this employee?")) return;
      await deleteEmployee(emp.employee_id);
      renderEmployees();
    };

    row.appendChild(idInput);
    row.appendChild(nameInput);
    row.appendChild(delBtn);
    container.appendChild(row);
  });
}

// Add new employee from input row
async function addEmployeeUI() {
  const idField = document.getElementById("newEmpId");
  const nameField = document.getElementById("newEmpName");

  const employee_id = idField.value.trim();
  const employee_name = nameField.value.trim();

  if (!employee_id || !employee_name) {
    alert("Both ID and Name are required!");
    return;
  }

  await addEmployee({ employee_id, employee_name });
  idField.value = "";
  nameField.value = "";
  renderEmployees();
}

// ================== TIME IN AND OUT FUNCTIONS ==================

async function addLog(log) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOGS_STORE, "readwrite");
    const store = tx.objectStore(LOGS_STORE);
    const req = store.add(log);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function getAllLogsByEmployee(employeeId) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOGS_STORE, "readonly");
    const store = tx.objectStore(LOGS_STORE);
    const request = store.getAll();
    request.onsuccess = () => {
      const allLogs = request.result.filter(l => String(l.employee_id) === String(employeeId));
      resolve(allLogs.sort((a, b) => a.log_id - b.log_id));
    };
    request.onerror = () => reject(request.error);
  });
}

async function timeInOut(event) {
  event.preventDefault();
  const empIdInput = document.getElementById("employeeId");
  const empId = empIdInput.value.trim();

  if (!empId) {
    alert("Please enter an Employee ID.");
    return;
  }

  const employees = await getAllEmployees();
  const employee = employees.find(e => String(e.employee_id) === empId);
  if (!employee) {
    alert("Employee not found. Please check the ID.");
    return;
  }

  const logs = await getAllLogsByEmployee(empId);
  const lastLog = logs[logs.length - 1];
  const newStatus = (!lastLog || lastLog.status === "Out") ? "In" : "Out";

  // Store current timestamp as ISO string
  const now = new Date();
  const isoDateTime = now.toISOString(); // "2025-11-07T13:10:40.123Z"

  const newLog = { status: newStatus, employee_id: empId, datetime: isoDateTime };
  await addLog(newLog);

  // Display human-readable format
  const displayDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const displayTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  alert(`${employee.employee_name} has timed ${newStatus} at ${displayTime} on ${displayDate}.`);
  empIdInput.value = "";
}

// ================== LOGS FUNCTIONS ==================

// Get all logs from IndexedDB
async function getAllLogs() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOGS_STORE, "readonly");
    const store = tx.objectStore(LOGS_STORE);
    const request = store.getAll();
    request.onsuccess = () => {
      const logs = request.result.sort((a, b) => a.log_id - b.log_id);
      resolve(logs);
    };
    request.onerror = () => reject(request.error);
  });
}

async function renderLogs() {
  const container = document.getElementById("logsContainer");
  if (!container) return;

  const logs = await getAllLogs();
  container.innerHTML = "";

  if (!logs.length) {
    container.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-400">No logs available</td></tr>`;
    return;
  }

  const employees = await getAllEmployees();

  logs.forEach(log => {
    const row = document.createElement("tr");
    const emp = employees.find(e => String(e.employee_id) === String(log.employee_id));
    const name = emp ? emp.employee_name : "(Deleted Employee)";

    const d = new Date(log.datetime);
    const displayDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const displayTime = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

    row.innerHTML = `
      <td class="py-2 px-4">${log.status}</td>
      <td class="py-2 px-4">${name}</td>
      <td class="py-2 px-4">${displayTime}</td>
      <td class="py-2 px-4">${displayDate}</td>
    `;
    container.appendChild(row);
  });
}

async function clearLogs() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOGS_STORE, "readwrite");
    const store = tx.objectStore(LOGS_STORE);
    const req = store.clear(); // remove all entries
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e);
  });
}

async function clearLogsUI() {
  if (!confirm("Are you sure you want to clear all logs? This cannot be undone!")) return;
  await clearLogs();
  await renderLogs(); // refresh the table
  alert("All logs have been cleared.");
}

// ========================= CLEAR DATABASE ===========================

async function clearDatabase() {
  
  if(confirm("Are you sure you want to erase everything?")) {

    try {
      if(db) db.close(); // Close connections first
      const req = indexedDB.deleteDatabase(DB_NAME);

      req.onsuccess = () => {
        alert("Successfully cleared database!");
        window.location.reload(); // Simplest way of reflecting everything
      };

      req.onerror = (event) => {
        alert(`Error clearing database: ${event.target.error}`);
      }

      req.onblocked = () => {
        alert("Database deletion blocked. Close all other tabs using this site and try again.");
      }

    } catch (e) {
      alert(`Transaction error: ${e}`);
    }

  }

}