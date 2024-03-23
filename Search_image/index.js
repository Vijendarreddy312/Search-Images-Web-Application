//Accessing the key
const accessKey ="MzHyZA51qKbc_EZKRDeK4qJAKpbIqCIue44m6WSjqeY";


// target the html elements
const formE1=document.querySelector("form");
// const btn= document.getElementById("search-btn");
const inputE1 =document.getElementById("input");
const searchResult = document.querySelector(".imageContainar");
const showMore=document.getElementById("show-more");

let inputData ="";
let page=1;

//Function to fetch data from API  
async function searchImage() { 
    inputData=inputE1.value;
    
    let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);

    const data = await response.json();
    const results =data.results;
    if(page ===1){
        searchResult.innerHTML="";
    }

    // create image elements and append them to the HTML

    results.map((result)=>{
        const imagContainer =document.createElement("div");
        imagContainer.classList.add("images");
        const image =document.createElement("img");
        image.src= result.urls.small ;

        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imagContainer.appendChild(image);
        imagContainer.appendChild(imageLink);
        searchResult.appendChild(imagContainer);
    });

    page++;
    if(page>1){
        showMore.style.display= "black"
    }
}
// searching elements to  add event listener it
formE1.addEventListener("submit", (event) =>{ 
    event.preventDefault()
    page = 1;
    searchImage();
});

showMore.addEventListener('click', (event) =>{ 
    event.preventDefault()
    page=1;
    searchImage();
});
    