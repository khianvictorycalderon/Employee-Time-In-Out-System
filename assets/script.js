function onLoad() {
  const buttons = [
    { label: "Time In / Out", onclick: () => alert("Clicked Time In/Out") },
    { label: "Logs", onclick: () => alert("Clicked Logs") },
    { label: "Employees", onclick: () => alert("Clicked Employees") },
    { label: "Credits", onclick: () => alert("Clicked Credits") },
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
