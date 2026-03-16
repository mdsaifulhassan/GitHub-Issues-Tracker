const BASE = "https://phi-lab-server.vercel.app/api/v1/lab"

async function getIssues(){

const res = await fetch(`${BASE}/issues`)
const result = await res.json()

return result.data

}

async function getIssue(id){

const res = await fetch(`${BASE}/issue/${id}`)
const result = await res.json()

return result.data

}

async function searchIssues(text){

const res = await fetch(`${BASE}/issues/search?q=${text}`)
const result = await res.json()

return result.data

}

async function loadIssues(){

const issues = await getIssues()

console.log("Issues:", issues)

container.innerHTML=""

issues.forEach(issue=>{
container.appendChild(createCard(issue))
})

}