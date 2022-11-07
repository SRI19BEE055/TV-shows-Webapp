//for displaying random suggestions
const genre = ["comedy","romance","drama","action","horror","anime","thriller","mystery","science fiction","crime","fantasy","musical","adventure"]

let suggestionGrid = document.getElementById("suggestionsGrid");

function showSuggestions(){
    const search = genre[Math.floor(Math.random()*genre.length)];
    const url2 = `https://api.tvmaze.com/search/shows?q=${search}`;
    fetch(url2)
    .then(
        (message)=>message.json()
    )
    .then(
        (jsonData)=>{           
            const results = jsonData.map((data)=>[data.show.officialSite,data.show.image]);
            displaySuggestions(results);
        }
    )
    .catch(
        (error)=>{
            (error)=>console.log(error+ " occured while searching for image") 
        }
    )

}

function displaySuggestions(results){
    if(results.length == 0){
        suggestionGrid.innerHTML = "Nothing to show"
    }
    else{
        suggestionGrid.innerHTML = ""
    }
    

    results.forEach(result => {
        if(result[1]==null) return;
        let image = result[1].original==null?(result[1].medium==null?"error.png":result[1].medium):result[1].original;
        if(image!=0){    
            const mainElement = document.createElement("li");
            mainElement.id = "mainElement";
            const urlElement = document.createElement("a");
            urlElement.id = "link";
            const imageElement = document.createElement("img");
            imageElement.id = "img";
            urlElement.href = result[0];
            imageElement.src = image;
            suggestionGrid.appendChild(mainElement);
            mainElement.appendChild(urlElement);
            urlElement.appendChild(imageElement);
        }
    });
}
showSuggestions();


//search results


function showResults(query){
    console.log(query)
    const url3 = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url3)
    .then(
        (message)=>message.json()
    )
    .then(
        (jsonData)=>{         
            const results = jsonData.map((data)=>[data.show.officialSite,data.show.image]);
            displaySuggestions(results);
        }
    )
    .catch(
        (error)=>{
            (error)=>console.log(error+ " occured while searching for image") 
        }
    )
}




let searchTimeOutToken =0;
window.onload = () => {
    const searchElement = document.getElementById("searchField");
    searchElement.onkeyup = (event)=>{
        clearTimeout(searchTimeOutToken);
        if(searchElement.value.trim().length === 0){
            showSuggestions();
            return;
        }
        searchTimeOutToken = setTimeout(()=>{
            showResults(searchElement.value);//used for search results
        },250)
        
    }
}


