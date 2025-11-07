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
      />
    </div>
    <button type="button" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
      Log
    </button>
  </form>
</section>
`;

const pageLogsContent = `
<section class="max-w-5xl mx-auto p-6 text-gray-200">
  <h2 class="text-3xl font-semibold mb-4 text-center">🗂 Logs</h2>

  <div class="flex justify-center flex-wrap gap-4 mb-6">
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export CSV</button>
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export JSON</button>
    <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Import Logs</button>
    <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">Clear Logs</button>
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
      <tbody class="divide-y divide-white/10 text-gray-200">
        <tr>
          <td colspan="4" class="text-center py-4 text-gray-400">Logs table (UI only)</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
`;

const pageEmployeesContent = `
<section class="max-w-4xl mx-auto p-6 text-gray-200">
  <h2 class="text-3xl font-semibold mb-4 text-center">👥 Employees</h2>

  <div class="flex justify-center flex-wrap gap-4 mb-6">
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export CSV</button>
    <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Export JSON</button>
    <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Import Employees</button>
  </div>

  <div class="bg-white/10 backdrop-blur-md shadow-md">
    <div class="bg-white/20 grid grid-cols-2 md:grid-cols-3 gap-4 font-semibold text-gray-100 mb-4 p-6">
      <div>ID</div>
      <div>Employee Name</div>
      <div class="hidden md:block">Action</div>
    </div>

    <div id="employeesContainer" class="space-y-3 px-6">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <input class="" type="text" />
        <input class="" type="text" />
        <button class="bg-red-500 px-4 py-2 rounded">Delete</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <input class="" type="text" />
        <input class="" type="text" />
        <button class="bg-red-500 px-4 py-2 rounded">Delete</button>
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-6 flex-wrap">
      <button class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md mb-6">Add</button>
    </div>
  </div>
</section>
`;

const pageReadMeContent = `
<section class="max-w-4xl mx-auto p-6 text-gray-200 space-y-6">
  <h2 class="text-3xl font-bold text-center text-white mb-4">📖 ETIOS - How to Use & Stay Safe</h2>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">✅ What ETIOS Can Do</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Keep track of when employees clock in and out.</li>
      <li>Manage your employee list: add new employees, edit their info, or delete them.</li>
      <li>Import and export employee lists and logs using simple files (CSV or JSON).</li>
      <li>When importing, new information is added or updated automatically — it won't replace everything.</li>
      <li>You can clear just the logs, or all the ETIOS data, with a click.</li>
      <li>Modern and easy-to-use interface that works on desktop and mobile devices.</li>
      <li>All data is stored locally in your browser; nothing is sent online.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">⚠️ Important Things to Remember</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li><strong>Backup Your Data Often:</strong> Before making big changes, export your employee list and logs. This prevents accidental data loss.</li>
      <li><strong>Importing Data:</strong> When you import employees or logs, ETIOS will merge the data into what you already have. Logs are automatically sorted by date and time.</li>
      <li><strong>Data Storage Limit:</strong> Your browser can only store about 5MB of data (~25,000-30,000 log entries). Delete old logs if you reach the limit.</li>
      <li><strong>Clearing Data:</strong> If you click "Clear Logs," only the logs and active sessions are removed. If you click "Clear All Data," everything is erased. <strong>Do NOT clear your browser’s data manually!</strong> Always export first if you want to save your data.</li>
      <li><strong>Employee IDs:</strong> Each employee must have a unique ID. Duplicates can cause errors in logs.</li>
      <li><strong>Browser Storage:</strong> Your data is saved per browser. If you switch devices, export your data and import it into the new device.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">💡 Best Practices</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Export employees and logs regularly as a backup.</li>
      <li>Check that employee IDs are unique to keep logs accurate.</li>
      <li>Clear old logs to stay within browser storage limits, but always export first.</li>
      <li>Review imported data carefully to avoid duplicates or mistakes.</li>
      <li>Use a modern browser (Chrome, Firefox, Edge) for best experience.</li>
      <li>If you ever need to start fresh, export your data, then use "Clear All Data," and finally import your backup.</li>
    </ul>
  </div>

  <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md space-y-4">
    <h3 class="text-xl font-semibold text-blue-400">🛠️ Quick Tips</h3>
    <ul class="list-disc list-inside space-y-1 text-gray-100">
      <li>Always back up before making large changes.</li>
      <li>Use the "Clear Logs" button instead of manually deleting browser data.</li>
      <li>Merging imports keeps your data intact — you don't lose anything.</li>
      <li>Keep your browser updated for the best compatibility and security.</li>
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
      <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
        🗑️ Clear All Data
      </button>
    </div>
  </div>
</section>
`;