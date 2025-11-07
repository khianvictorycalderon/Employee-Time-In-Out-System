const DB_NAME = "ETIOS_DB";
const DB_VERSION = 1;
let db;

// Initialize IndexedDB
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      if (!db.objectStoreNames.contains("employees")) {
        db.createObjectStore("employees", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("logs")) {
        const logsStore = db.createObjectStore("logs", { keyPath: "id", autoIncrement: true });
        logsStore.createIndex("employeeId", "employeeId", { unique: false });
        logsStore.createIndex("dateTime", "dateTime", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => reject(event.target.error);
  });
}

// Employee operations
async function addEmployee(employee) {
  const tx = db.transaction("employees", "readwrite");
  const store = tx.objectStore("employees");
  return store.put(employee); // put = add or update
}

async function getAllEmployees() {
  const tx = db.transaction("employees", "readonly");
  const store = tx.objectStore("employees");
  return store.getAll();
}

async function deleteEmployee(id) {
  const tx = db.transaction("employees", "readwrite");
  const store = tx.objectStore("employees");
  return store.delete(id);
}

// Log operations
async function addLog(log) {
  const tx = db.transaction("logs", "readwrite");
  const store = tx.objectStore("logs");
  return store.add(log);
}

async function getLogs() {
  const tx = db.transaction("logs", "readonly");
  const store = tx.objectStore("logs");
  return store.getAll();
}

async function clearLogs() {
  const tx = db.transaction("logs", "readwrite");
  const store = tx.objectStore("logs");
  return store.clear();
}