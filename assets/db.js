let db;
const DB_NAME = "ETIOSDB";
const EMPLOYEE_STORE = "Employees";
const LOGS_STORE = "Logs";

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