# Employee Time In Out System  
## Web Version by Khian Victory D. Calderon

A web version of my [Python Employee Time In Out System Desktop Application](https://github.com/khianvictorycalderon/Employee-Time-In-Out-System-Desktop).

This system allows small offices or demo environments to track employee attendance easily. All data is stored **locally in your browser**, so no server or database is required.

---

## 📌 Getting Started (For Users)

1. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).
2. Navigate the menu to access:
   - **Time In / Out** – Employees can log their attendance.
   - **Logs** – View, export, or import attendance logs.
   - **Employees** – Add, edit, or delete employee entries.
   - **Read Me** – Learn how to use ETIOS safely.
   - **Credits** – Developer info and clear all data if needed.
3. Data Management:
   - Export employee lists and logs as `.csv` or `.json` files.
   - Import previously exported data to merge with current records.
   - Clear only logs or all data as needed, but always backup first.

---

## ✅ Features

- 🕒 **Time In / Out Logging** – Quickly log employee attendance.
- 🗂 **View Logs** – Review past logs sorted by date and time.
- 👥 **Employee Management** – Add, edit, or remove employees.
- 💾 **Export & Import** – Use `.csv` or `.json` for backups.
- 🔒 **Local Storage** – Data is stored in the browser, nothing is sent online.
- 📱 **Responsive Design** – Works on both desktop and mobile devices.
- ⚠️ **Safety Tips**:
  - Back up regularly before importing or clearing data.
  - Ensure unique employee IDs to avoid errors.
  - Be mindful of browser storage limits (~5MB).

---

## 🖼 Preview

![Preview Image](images/preview.png)

---

## 👨‍💻 Developer Info

- **Built With:** HTML, Tailwind CSS, Vanilla JavaScript.
- **Dynamic Content:** Each page (Time In/Out, Logs, Employees, Read Me, Credits) is loaded dynamically using JavaScript template strings.
- **Storage:** Data is managed with `localStorage` and JSON.
- **Exports/Imports:** Handles CSV and JSON formats with automatic merging and sorting.
- **Responsive Navbar:** Supports desktop and mobile menus with active button highlighting.
- **Source Code:** [GitHub Repository](https://github.com/khianvictorycalderon/Employee-Time-In-Out-System-Desktop)

---

## ⚙️ Notes for Developers

- JavaScript functions are modular:
  - `getLocalData` / `saveLocalData` – Safe localStorage operations.
  - `renderLogsTable` / `renderEmployeesList` – Updates DOM dynamically.
  - `bindTimeForm` / `bindEmployeeEvents` – Handles forms and events.
  - `toCSV` / `downloadFile` / `importFile` – File management utilities.
- Navigation uses **History API** to maintain browser URLs without page reload.
- All logs are linked to employee names; deleted employees are labeled `(Deleted Employee)`.
