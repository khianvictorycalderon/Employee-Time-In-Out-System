function onLoad() {
  const buttons = [
    { label: "Time In / Out", page: "time" },
    { label: "Logs", page: "logs" },
    { label: "Employees", page: "employees" },
    { label: "Credits", page: "credits" },
  ];

  const navbar = document.getElementById("navbar");

  buttons.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    btn.className = "w-full p-2 text-left hover:bg-neutral-700 text-center";
    btn.onclick = item.onclick;
    navbar.appendChild(btn);
  });
}
