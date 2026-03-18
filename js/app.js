const loader = document.getElementById("loader")
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
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", async () => {

        const status = tab.dataset.status
        loader.classList.remove("hidden")
        container.classList.add("hidden")
        setTimeout(() => {

            let filtered = allIssues

            if(status === "open"){
                filtered = allIssues.filter(i => i.status === "open")
            }
            else if(status === "closed"){
                filtered = allIssues.filter(i => i.status === "closed")
            }

            renderIssues(filtered)
            loader.classList.add("hidden")
            container.classList.remove("hidden")

        }, 250)
    })
})

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

loadIssues();