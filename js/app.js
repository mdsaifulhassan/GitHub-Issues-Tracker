const container = document.getElementById("issuesContainer");
const tabs = document.querySelectorAll(".tab");
async function loadIssues() {
  const issues = await getIssues();
  window.allIssues = issues; 

  container.innerHTML = "";
  issues.forEach(issue => {
    container.appendChild(createCard(issue));
  });

  updateCounts(issues);
}


function updateCounts(issues) {
  
  document.getElementById("issueCount").innerText = issues.length;
}

// Tabs filtering
tabs.forEach(tab => {
  tab.addEventListener("click", async () => {

    tabs.forEach(t => {
      t.classList.remove("bg-indigo-600", "text-white");
      t.classList.add("text-slate-500", "hover:bg-slate-50");
    });


    tab.classList.remove("text-slate-500", "hover:bg-slate-50");
    tab.classList.add("bg-indigo-600", "text-white");

    const status = tab.dataset.status;
    const issues = await getIssues();
    window.allIssues = issues;

    container.innerHTML = "";

    let filtered = issues;
    if (status !== "all") {
      filtered = issues.filter(i => i.status === status);
    }

    filtered.forEach(i => {
      container.appendChild(createCard(i));
    });

  
    updateCounts(filtered);
  });
});

// Search functionality
document.getElementById("searchBtn")
  .addEventListener("click", async () => {
    const text = document.getElementById("searchInput").value;
    const issues = await searchIssues(text);

    container.innerHTML = "";
    issues.forEach(i => {
      container.appendChild(createCard(i));
    });

    updateCounts(issues);
  });

// Initial load
loadIssues();