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
    alert("Successfully connected to database!");
};

request.onerror = (event) => {
    alert(`Failed to connect to database: ${event.target.error}`);
}

async function addEmployee() {

}

async function getAllEmployees() {
    
}