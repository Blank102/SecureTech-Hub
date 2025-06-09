document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});

fetch("https://backend-dj3k2q.fly.dev/tech-news")
  .then(res => res.json())
  .then(data => {
    const main = data.main_story;
    const secondary = data.secondary_stories;
    const others = data.other_articles;


    // === MAIN STORY ===
const mainDiv = document.getElementById("main-story");

let title = main.title;
let source = '';

if (main.title.includes(" - ")) {
  const splitIndex = main.title.lastIndexOf(" - ");
  title = main.title.slice(0, splitIndex);
  source = main.title.slice(splitIndex + 3);
}

mainDiv.innerHTML = `
   <a href="${main.url}" target="_blank" class="main-article-link">
    <img src="${main.image}" onerror="this.onerror=null;this.src='img/news.png';">
    <h2 class="main-title">${title}</h2>
    <p class="main-source">${main.source.name}</p>
    <p class="main-desc"> ${main.description || 'No description available.'}</p>
  </a>
`;
    

// === SECONDARY STORIES ===
const secondaryContainer = document.getElementById("secondary-stories");

secondary.forEach(article => {
  const li = document.createElement("li");
  li.className = "story-card";

  let title = article.title;
  let source = '';
  if (article.title.includes(" - ")) {
    const splitIndex = article.title.lastIndexOf(" - ");
    title = article.title.slice(0, splitIndex);
    source = article.title.slice(splitIndex + 3);
  }

  li.innerHTML = `
    <a href="${article.url}" target="_blank" class="sec-article-link">
      <img src="${article.image}" onerror="this.onerror=null;this.src='/static/img/news.png';">
      <div class="sec-text"> 
        <h4 class="sec-title">${title}</h4>
        <p class="sec-source">${article.source.name}</p>
      </div> 
    </a>
  `;

  secondaryContainer.appendChild(li);
});

// === REMAINING ARTICLES ===
const newsContainer = document.getElementById("news-container");
others.forEach(article => {
  const card = document.createElement("div");
  card.className = "news-card";

  let title = article.title;
  let source = '';
  if (article.title.includes(" - ")) {
    const splitIndex = article.title.lastIndexOf(" - ");
    title = article.title.slice(0, splitIndex);
    source = article.title.slice(splitIndex + 3);
  }

  card.innerHTML = `
    <a href="${article.url}" target="_blank" class="other-article-link">
      <img src="${article.image}" 
     onerror="this.onerror=null;this.src='/static/img/news.png';">
     <div class="news-text">
      <h3 class="other-title">${title}</h3>
      <p class="other-source">${article.source.name}</p>
      <p class="other-desc">${article.description || 'No description available.'}</p>
     </div> 
    </a>
  `;

  newsContainer.appendChild(card);
});
});

