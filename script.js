// https://newsapi.org/v2/everything?q=tesla&from=2023-08-29&sortBy=publishedAt&apiKey=7d86c6b535074798bc1716760fdcfdd7
// https://newsapi.org/v2/everything?q=tesla&from=2023-08-30&sortBy=publishedAt&apiKey=488361d606c44e578ee1901f8c9a937d

const url = "https://newsapi.org/v2/everything?q=";
const API_KEY = "488361d606c44e578ee1901f8c9a937d";
const date = new Date();
// console.log(date);

function reload(){
    window.location.reload();
}

window.addEventListener("load", ()=> fetchNews("Japan"));

async function fetchNews(query){
    // console.log(date1);
    const res = await fetch(`${url}${query}&from=${date}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true); 
        console.log(cardClone,"card clone before");
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);  
        console.log(cardClone,"card clone after");
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.source.name;
    newsDesc.innerHTML = `${article.description} , ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}

let cursorSelectedNav = null;
function cursorOnThisNavLink(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    cursorSelectedNav?.classList.remove("active");
    cursorSelectedNav = navItem;
    cursorSelectedNav.classList.add("active");
}

function cursorOnSearchInput(id){
    const inputValue = document.getElementById(id).value;
    // console.log(inputValue);
    if(!inputValue) return;
    // if(!fetchNews(id)) return("No Records Found:");
    fetchNews(inputValue);
    cursorSelectedNav?.classList.remove("active");
    cursorSelectedNav = null;
}