// utility.js
// Requires: getAllEmployees(), addEmployee() from db.js

// ---------- HELPERS ----------
async function addEmployeeIfNotExists(employee) {
  const all = await getAllEmployees();
  const exists = all.some(e => String(e.employee_id) === String(employee.employee_id));
  if (exists) return false; // duplicate, skip
  await addEmployee(employee);
  return true;
}

function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const date = `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `${date}_${time}`;
}

function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- EXPORT ----------
async function exportEmployeesJSON() {
  try {
    const employees = await getAllEmployees();
    const content = JSON.stringify(employees, null, 2);
    const filename = `employees_${getTimestamp()}.json`;
    downloadBlob(content, filename, "application/json");
  } catch (err) {
    alert("Failed to export JSON: " + (err?.message || err));
  }
}

async function exportEmployeesCSV() {
  try {
    const employees = await getAllEmployees();
    if (!employees.length) {
      alert("No employees to export.");
      return;
    }

    const header = "employee_id,employee_name";
    const rows = employees.map(e => {
      const id = String(e.employee_id).replace(/"/g, '""');
      const name = String(e.employee_name).replace(/"/g, '""');
      return `${id.includes(",") ? `"${id}"` : id},${name.includes(",") ? `"${name}"` : name}`;
    });
    const csv = header + "\n" + rows.join("\n");

    const filename = `employees_${getTimestamp()}.csv`;
    downloadBlob(csv, filename, "text/csv");
  } catch (err) {
    alert("Failed to export CSV: " + (err?.message || err));
  }
}

// ---------- UNIVERSAL IMPORT ----------
async function importEmployees() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,.csv,application/json,text/csv";

  input.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const ext = file.name.split(".").pop().toLowerCase();
      let employees = [];

      if (ext === "json") {
        // Parse JSON
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("Invalid JSON format.");
        employees = parsed.map(e => ({
          employee_id: String(e.employee_id ?? e.id ?? "").trim(),
          employee_name: String(e.employee_name ?? e.name ?? "").trim()
        })).filter(e => e.employee_id && e.employee_name);

      } else if (ext === "csv") {
        // Parse CSV
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length <= 1) throw new Error("CSV file is empty or missing data.");
        const header = lines[0].toLowerCase();
        const startIndex = header.includes("employee_id") ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const cols = parseCsvRow(lines[i]);
          const id = cols[0]?.trim().replace(/^"|"$/g, "");
          const name = cols[1]?.trim().replace(/^"|"$/g, "");
          if (id && name) employees.push({ employee_id: id, employee_name: name });
        }
      } else {
        throw new Error("Unsupported file type.");
      }

      let added = 0, skipped = 0;
      for (const emp of employees) {
        const ok = await addEmployeeIfNotExists(emp);
        ok ? added++ : skipped++;
      }

      await renderEmployees?.();
      alert(`Import complete — added: ${added}, skipped (duplicates/bad rows): ${skipped}`);
    } catch (err) {
      alert("Failed to import employees: " + (err?.message || err));
    }
  };

  input.click();
}

// ---------- CSV PARSER ----------
function parseCsvRow(row) {
  const cols = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cols.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  cols.push(cur);
  return cols;
}

// ============================= LOGS FUNCTIONS ===========================
async function exportLogsJSON() {
  try {
    const logs = await getAllLogs();
    const employees = await getAllEmployees();

    const exportData = logs.map(l => {
      const emp = employees.find(e => String(e.employee_id) === String(l.employee_id));
      return {
        status: l.status,
        employee_id: l.employee_id,
        employee_name: emp ? emp.employee_name : "Unknown",
        datetime: l.datetime // ISO string
      };
    });

    const filename = `logs_${getTimestamp()}.json`;
    downloadBlob(JSON.stringify(exportData, null, 2), filename, "application/json");
  } catch (err) {
    alert("Failed to export logs as JSON: " + (err?.message || err));
  }
}

async function exportLogsCSV() {
  try {
    const logs = await getAllLogs();
    const employees = await getAllEmployees();
    const header = "status,employee_id,employee_name,time,date";

    const rows = logs.map(l => {
      const emp = employees.find(e => String(e.employee_id) === String(l.employee_id));
      const name = emp ? emp.employee_name.replace(/"/g, '""') : "Unknown";

      // Parse datetime to get human-readable time
      const dt = new Date(l.datetime);
      const pad = n => String(n).padStart(2, "0");
      const hours24 = dt.getHours();
      const hours12 = hours24 % 12 || 12;
      const ampm = hours24 >= 12 ? "PM" : "AM";
      const time = `${pad(hours12)}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())} ${ampm}`;

      return `${l.status},${l.employee_id},"${name}",${time},${l.datetime}`;
    });

    const csv = header + "\n" + rows.join("\n");
    const filename = `logs_${getTimestamp()}.csv`;
    downloadBlob(csv, filename, "text/csv");
  } catch (err) {
    alert("Failed to export logs as CSV: " + (err?.message || err));
  }
}

async function importLogs() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,.csv,application/json,text/csv";

  input.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const ext = file.name.split(".").pop().toLowerCase();
      let importedLogs = [];

      if (ext === "json") {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error("Invalid JSON format.");
        importedLogs = parsed.map(l => ({
          status: l.status,
          employee_id: String(l.employee_id),
          employee_name: l.employee_name,
          datetime: l.datetime // keep ISO string
        }));
      } else if (ext === "csv") {
        const lines = text.split(/\r?\n/).filter(Boolean);
        const header = lines[0].toLowerCase();
        const startIndex = header.includes("status") ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const cols = parseCsvRow(lines[i]);
          if (cols.length < 5) continue;
          importedLogs.push({
            status: cols[0].trim(),
            employee_id: cols[1].trim(),
            employee_name: cols[2].trim().replace(/^"|"$/g, ""),
            datetime: cols[4].trim() // use the ISO string column
          });
        }
      } else {
        throw new Error("Unsupported file type.");
      }

      // Add imported logs to IndexedDB
      for (const log of importedLogs) {
        await addLog(log); // autoIncrement ID ensures uniqueness
      }

      await renderLogs(); // refresh table
      alert(`Imported ${importedLogs.length} logs successfully.`);
    } catch (err) {
      alert("Failed to import logs: " + (err?.message || err));
    }
  };

  input.click();
}