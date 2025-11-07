const pageTimeInOutContent = `
<section class="p-6 max-w-md mx-auto text-center">
  <h1 class="text-3xl font-semibold mb-6">🕒 Time In / Out</h1>
  <form id="timeForm" onsubmit="timeInOut(event)" class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-6">
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
    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
      Log
    </button>
  </form>
</section>
`;

const pageLogsContent = `
<section class="max-w-5xl mx-auto p-6 text-gray-200">
  <h2 class="text-3xl font-semibold mb-4 text-center">🗂 Logs</h2>

  <div class="flex justify-center flex-wrap gap-4 mb-6">
    <button onclick="exportLogsCSV()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export CSV</button>
    <button onclick="exportLogsJSON()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export JSON</button>
    <button onclick="importLogs()" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Import Logs</button>
    <button onclick="clearLogsUI()" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">Clear Logs</button>
  </div>

  <div class="overflow-x-auto bg-white/10 backdrop-blur-md shadow-md">
    <table class="w-full text-left border-collapse">
      <thead class="bg-white/20 text-gray-100">
        <tr>
          <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Status</th>
          <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Employee Name</th>
          <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Time</th>
          <th class="py-3 px-4 text-sm font-semibold uppercase tracking-wide">Date</th>
        </tr>
      </thead>
      <tbody id="logsContainer" class="divide-y divide-white/10 text-gray-200">
        <!-- Logs will be rendered here dynamically -->
      </tbody>
    </table>
  </div>
</section>
`;

const pageEmployeesContent = `
<section class="max-w-4xl mx-auto p-6 text-gray-200">
  <h2 class="text-3xl font-semibold mb-4 text-center">👥 Employees</h2>

  <div class="flex justify-center flex-wrap gap-4 mb-6">
    <button onclick="exportEmployeesCSV()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export CSV</button>
    <button onclick="exportEmployeesJSON()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export JSON</button>
    <button onclick="importEmployees()" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Import Employees</button>
  </div>

  <div class="bg-white/10 backdrop-blur-md shadow-md">
    <div class="bg-white/20 grid grid-cols-2 md:grid-cols-3 gap-4 font-semibold text-gray-100 mb-4 px-6 py-2">
      <div>ID</div>
      <div>EMPLOYEE NAME</div>
      <div class="hidden md:block">ACTION</div>
    </div>

    <div id="employeesContainer" class="space-y-3 px-6">
      <!-- Employee rows rendered here -->
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center px-6 py-4 border-t border-white/10">
      <input id="newEmpId" type="text" placeholder="New ID..." class="p-2 rounded text-black w-full" />
      <input id="newEmpName" type="text" placeholder="New Name..." class="p-2 rounded text-black w-full" />
      <button onclick="addEmployeeUI()" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md">Add</button>
    </div>
  </div>
</section>
`;

const pageReadMeContent = `
<section class="max-w-4xl mx-auto p-6 text-gray-200 space-y-6">
  <h2 class="text-3xl font-bold text-center text-white mb-4">📖 ETIOS - How to Use & Stay Safe</h2>

  <p class="text-gray-300 mb-4 text-center italic">
    Updated on November 7, 2025, 2:00 PM — migrated from localStorage to IndexedDB for more reliable local storage.
  </p>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">✅ What ETIOS Can Do</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Allow employees to log their time In and Out easily using their Employee ID.</li>
      <li>View and manage employee records (add, edit, delete).</li>
      <li>View, export, and import time logs in CSV or JSON format.</li>
      <li>Clear all logs or reset the database when needed.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">⚠️ Important Things to Remember</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>This system stores data locally in your browser. Other devices will not see this data.</li>
      <li>Clearing your browser or IndexedDB will erase all data. Always export important logs or employee data before doing so.</li>
      <li>Do not share Employee IDs with unauthorized persons.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">💡 Best Practices</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Regularly export logs and employee data for backup.</li>
      <li>Only allow trusted personnel to access the system on a shared device.</li>
      <li>Use clear, consistent Employee IDs to avoid duplicates.</li>
      <li>Always log out or close the browser when not in use if on a shared computer.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">🛠️ Quick Tips</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Click “Export CSV/JSON” to save backups of employees or logs.</li>
      <li>Click “Import” to restore or add data from previous backups.</li>
      <li>Use the “Clear All Data” button only if you are sure you want to reset everything.</li>
      <li>If a log or employee seems missing, refresh the page to reload data from IndexedDB.</li>
    </ul>
  </div>
</section>
`;

const pageCreditsContent = `
<section class="max-w-2xl mx-auto p-6 text-gray-200">
  <h2 class="text-3xl font-semibold mb-4 text-center">💳 Credits</h2>

  <div class="space-y-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
    <p class="text-lg leading-relaxed">
      Website developed by
      <a href="https://khian.netlify.app" target="_blank" class="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors duration-200">
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
      <a href="https://github.com/khianvictorycalderon/Employee-Time-In-Out-System-Desktop" target="_blank" class="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors duration-200">
        here
      </a>.
    </p>

    <div class="pt-4 text-center">
      <button onclick="clearDatabase();" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
        🗑️ Clear All Data
      </button>
    </div>
  </div>
</section>
`;