function createLabel(label){
    let color = ""
    const text = label.toLowerCase()

    if(text === "bug"){
        color = "bg-red-100 text-red-600 border-red-200"
    }
    else if(text === "enhancement"){
        color = "bg-green-100 text-green-600 border-green-200"
    }
    else if(text === "documentation"){
        color = "bg-blue-100 text-blue-600 border-blue-200"
    }
    else if(text === "help wanted"){
        color = "bg-orange-100 text-orange-600 border-orange-200"
    }
    else if(text === "good first issue"){
        color = "bg-purple-100 text-purple-600 border-purple-200"
    }
    else{
        color = "bg-gray-100 text-gray-600 border-gray-200"
    }

    return `
    <span class="text-xs px-2 py-1 rounded-full border ${color}">
        ${label.toUpperCase()}
    </span>
    `
}
function createCard(issue){

    const card = document.createElement("div")

    const status = issue.status?.toLowerCase() || "open"

    const borderColor =
        status === "open"
        ? "border-emerald-500"
        : "border-purple-500"

    let priorityColor = ""
    if(issue.priority?.toLowerCase() === "high"){
        priorityColor = "bg-red-100 text-red-600"
    }
    else if(issue.priority?.toLowerCase() === "medium"){
        priorityColor = "bg-yellow-100 text-yellow-600"
    }
    else{
        priorityColor = "bg-gray-100 text-gray-600"
    }

    const statusDot =
        status === "open"
        ? `<span class="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>`
        : `<span class="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>`

    card.className = `
        bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-t-4 ${borderColor}
        hover:shadow-md transition-all duration-200 cursor-pointer
    `

    card.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            ${statusDot}

            <span class="text-xs font-semibold px-3 py-1 rounded-full ${priorityColor}">
                ${issue.priority?.toUpperCase() || "LOW"}
            </span>
        </div>

        <h3 class="font-semibold text-[15px] text-slate-800 mb-2 leading-snug">
            ${issue.title}
        </h3>

        <p class="text-slate-500 text-sm mb-3 line-clamp-2">
            ${issue.description || "No description available."}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
            ${
                issue.labels && issue.labels.length > 0
                ? issue.labels.map(label => createLabel(label)).join("")
                : ""
            }
        </div>

        <div class="flex justify-between items-center text-xs text-slate-400 border-t pt-3">
            <span>By ${issue.author}</span>
            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
    `

    card.addEventListener("click", () => showIssue(issue.id))

    return card
}

function closeModal(){
    document.getElementById("issueModal").classList.add("hidden")
    document.getElementById("modalContent").innerHTML = ""
}

async function showIssue(id){
    const issue = await getIssue(id)

    const modal = document.getElementById("issueModal")
    const content = document.getElementById("modalContent")

    const statusColor =
        issue.status === "open"
        ? "bg-emerald-500"
        : "bg-purple-500"

    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${issue.title}</h2>

        <div class="flex items-center gap-3 mb-4">
            <span class="text-white text-xs px-3 py-1 rounded-full ${statusColor}">
                ${issue.status.toUpperCase()}
            </span>
            <span class="text-sm text-gray-500">
                Opened by ${issue.author}
            </span>
        </div>

        <div class="flex gap-2 mb-4 flex-wrap">
            ${
                issue.labels && issue.labels.length > 0
                ? issue.labels.map(label => createLabel(label)).join("")
                : ""
            }
        </div>

        <p class="text-gray-600 mb-6">
            ${issue.description || "No description provided."}
        </p>

        <div class="bg-gray-100 rounded-xl p-4 flex justify-between">
            <div>
                <p class="text-xs text-gray-500">Author</p>
                <p class="font-semibold">${issue.author}</p>
            </div>

            <div>
                <p class="text-xs text-gray-500">Priority</p>
                <span class="px-3 py-1 text-xs rounded-full bg-red-500 text-white">
                    ${issue.priority?.toUpperCase() || "LOW"}
                </span>
            </div>
        </div>
    `

    modal.classList.remove("hidden")
}

function renderIssues(issues){
    const container = document.getElementById("issuesContainer")
    container.innerHTML = ""

    issues.forEach(issue => {
        const card = createCard(issue)
        container.appendChild(card)
    })

    document.getElementById("issueCount").innerText = issues.length
}