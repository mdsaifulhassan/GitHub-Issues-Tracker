function createLabel(label){

let color=""

const text = label.toLowerCase()

if(text==="bug"){
color="bg-red-100 text-red-600 border-red-200"
}

else if(text==="enhancement"){
color="bg-green-100 text-green-600 border-green-200"
}

else if(text==="documentation"){
color="bg-blue-100 text-blue-600 border-blue-200"
}

else if(text==="help wanted"){
color="bg-orange-100 text-orange-600 border-orange-200"
}

else if(text==="good first issue"){
color="bg-purple-100 text-purple-600 border-purple-200"
}

else{
color="bg-gray-100 text-gray-600 border-gray-200"
}

return `
<span class="text-xs px-2 py-1 rounded-full border ${color}">
${label.toUpperCase()}
</span>
`
}

function closeModal() {
    const modal = document.getElementById("issueModal");
    modal.classList.add("hidden"); 
    document.getElementById("modalContent").innerHTML = "";
}

function createCard(issue){

const card = document.createElement("div")

const status = issue.status?.toLowerCase().trim()

// top border color
const borderColor =
status === "open"
? "border-green-500"
: "border-purple-500"


// priority color
let priorityColor=""

if(issue.priority?.toLowerCase()==="high"){
priorityColor="bg-red-100 text-red-600"
}
else if(issue.priority?.toLowerCase()==="medium"){
priorityColor="bg-yellow-100 text-yellow-600"
}
else{
priorityColor="bg-gray-200 text-gray-600"
}


// status icon
const statusIcon =
status === "open"
? `<img src="assets/Open-Status.png" class="w-5 h-5">`
: `<img src="assets/Closed-Status.png" class="w-5 h-5">`


card.className =
`bg-white p-5 rounded-lg shadow border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`


card.innerHTML = `

<div class="flex justify-between items-center mb-3">

${statusIcon}

<span class="text-xs px-3 py-1 rounded-full ${priorityColor}">
${issue.priority?.toUpperCase() || "LOW"}
</span>

</div>

<h3 class="font-semibold text-lg mb-2">
${issue.title}
</h3>

<p class="text-gray-500 text-sm mb-3">
${issue.description || ""}
</p>

<div class="flex gap-2 mb-4 flex-wrap">
${issue.labels?.map(label => createLabel(label)).join("") || ""}
</div>

<div class="flex justify-between text-xs text-gray-400">

<span>
Author: ${issue.author}
</span>

<span>
${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>
`

card.addEventListener("click",()=>showIssue(issue.id))

return card
}



async function showIssue(id) {
    const issue = await getIssue(id);

    const modal = document.getElementById("issueModal");
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${issue.title}</h2>
        <p class="mb-4 text-gray-600">${issue.description}</p>
        <p><strong>Status:</strong> ${issue.status}</p>
        <p><strong>Author:</strong> ${issue.author}</p>
        <p><strong>Priority:</strong> ${issue.priority}</p>
        <p><strong>Labels:</strong> ${issue.labels?.join(", ")}</p>
    `;

    modal.classList.remove("hidden");
}
