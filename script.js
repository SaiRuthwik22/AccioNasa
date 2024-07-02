let searches = localStorage.getItem("searches")?JSON.parse(localStorage.getItem("searches")):[]
async function getCurrentImageOfTheDay(){
    let currentDate = new Date().toISOString().split("T")[0]
    let imageContainer = document.getElementById("current-image-container")
    const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=p4JRgeNN1N8vF4yxOMWZw3DueftOchhV3rzXTokv`)
    console.log(res)
    if(!res.ok){
        imageContainer.innerHTML = `<p class="error">Sorry Failed to fetch Nasa Image</p>`
    }
    else{
        const data = await res.json()
        imageContainer.innerHTML = `
               <h1>NASA Picture of the Day</h1>
                <img src="${data.url}" alt="Nasa Image">
                <p id="titletext">${data.title}</p>
                <p id="explaination">${data.explanation}</p>
        `
    }

}
getCurrentImageOfTheDay()
addSearchToHistory()
async function getImageOfTheDay(event){
    event.preventDefault()
    let userDate = document.getElementById("search-input").value
    let imageContainer = document.getElementById("current-image-container")
    const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${userDate}&api_key=p4JRgeNN1N8vF4yxOMWZw3DueftOchhV3rzXTokv`)
    if(!res.ok){
        imageContainer.innerHTML = `<p class="error">Sorry Failed to fetch Nasa Image</p>`
    }
    else{
        const data = await res.json()
        imageContainer.innerHTML = `
               <h1>Picture on ${userDate}</h1>
                <img src="${data.url}" alt="Nasa Image">
                <p id="titletext">${data.title}</p>
                <p id="explaination">${data.explanation}</p>
        `
        saveSearch(userDate)

    }
}
function saveSearch(date){
    searches.push({date:date})
    localStorage.setItem("searches",JSON.stringify(searches))
    addSearchToHistory()
}
function addSearchToHistory(){
    let searchHistory = document.getElementById("search-history")
    searchHistory.innerHTML = ""
    searches.map((ele)=>{
        searchHistory.innerHTML += `<li onclick="previousSearchRender(event,'${ele.date}')"><a href="">${ele.date}</a></li>`
    })
}
async function previousSearchRender(event,date){
    event.preventDefault()
    let imageContainer = document.getElementById("current-image-container")
    const res = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=p4JRgeNN1N8vF4yxOMWZw3DueftOchhV3rzXTokv`)
    if(!res.ok){
        imageContainer.innerHTML = `<p class="error">Sorry Failed to fetch Nasa Image</p>`
    }
    else{   
            const data = await res.json()
            imageContainer.innerHTML = `
            <h1>Picture on ${date}</h1>
            <img src="${data.url}" alt="Nasa Image">
            <p id="titletext">${data.title}</p>
            <p id="explaination">${data.explanation}</p>
    `}
}

