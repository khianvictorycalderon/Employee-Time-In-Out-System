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

  // Check if employee exists
  const employees = await getAllEmployees();
  const employee = employees.find(e => String(e.employee_id) === empId);

  if (!employee) {
    alert("Employee not found. Please check the ID.");
    return;
  }

  // Get all logs for this employee to determine last status
  const logs = await getAllLogsByEmployee(empId);
  const lastLog = logs[logs.length - 1];
  const newStatus = (!lastLog || lastLog.status === "Out") ? "In" : "Out";

  // Format date/time
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const hours24 = now.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const time = `${pad(hours12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;
  const date = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()}`;

  // Insert new log entry
  const newLog = { status: newStatus, employee_id: empId, time, date };
  await addLog(newLog);

  alert(`${employee.employee_name} has timed ${newStatus} at ${time} on ${date}.`);
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

    row.innerHTML = `
      <td class="py-2 px-4">${log.status}</td>
      <td class="py-2 px-4">${emp ? emp.employee_name : "(Deleted Employee)"}</td>
      <td class="py-2 px-4">${log.time}</td>
      <td class="py-2 px-4">${log.date}</td>
    `;
    container.appendChild(row);
  });
}