const showdropdownlist = document.querySelector('#resources-link');
const deletedropdownlist = document.querySelector('#dropdownlist');


const body = document.body;


showdropdownlist.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('show-dropdownlist');
})

deletedropdownlist.addEventListener('click', () => showdropdownlist.click());

document.addEventListener('click', (event) => {
    if (body.classList.contains('show-dropdownlist')) {
        if (!showdropdownlist.contains(event.target) && !deletedropdownlist.contains(event.target)) {
            body.classList.remove('show-dropdownlist');
        }
    }
});

const showsearchbar = document.querySelector('#searchbar-open-button');
const searchContainer = document.querySelector('.search-container');

showsearchbar.addEventListener('click', () => {
    document.body.classList.toggle('show-searchbar');
});

document.addEventListener('click', (event) => {
    if (body.classList.contains('show-searchbar')) {
        if (!showsearchbar.contains(event.target) && !searchContainer.contains(event.target)) {
            body.classList.remove('show-searchbar');
        }
    }
});

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input-id');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        // --- THIS IS WHERE SEARCH LOGIC GOES ---
        // For now, we'll just show an alert with the query
        alert(`You searched for: "${query}"`);
    } else {
        console.log("Search query is empty.");
    }
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  }
});


// 1. Select the necessary elements from your HTML
const viewNewsBtn = document.querySelector('.view-all-news');
const newsContainer = document.querySelector('.news-section-containers');

// 2. Replace 'YOUR_API_KEY' with the key you got from NewsAPI.org
const apiKey = '364698e869ca4b5091652c426d9c1415';
let pageNum = 1; // Keep track of which page of results we're on

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

// 3. This function fetches the news and adds it to the page
async function fetchNews(noofcontent) {
    // Provide feedback to the user that something is happening
    viewNewsBtn.textContent = 'Loading...';
    viewNewsBtn.disabled = true;

    try {
        // 4. Fetch data from the News API
        // We're searching for articles about "technology" in English
        const response = await fetch(`https://newsapi.org/v2/everything?q=technology&language=en&page=${pageNum}&pageSize=${noofcontent || 3}&apiKey=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // 5. Check if there are articles and loop through them
        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                // 6. Create the HTML for each news card
                const newsCard = document.createElement('li');
                newsCard.className = 'news-section-container';

                // Use a template literal for cleaner HTML creation
                newsCard.innerHTML = `
                    <div class="news-section-image-holder">
                        <img src="${article.urlToImage || 'images/default-image.jpg'}" alt="${article.title}" class="news-section-image">
                    </div>
                    <div class="new-section-text">
                        <div class="news-section-container-title">
                            <p>${truncateText(article.title,50)}</p>
                        </div>
                        <div class="news-section-container-subtitle">
                            <p>${truncateText(article.description,100) || 'No description available.'}</p>
                        </div>
                        <a href="${article.url}" target="_blank" class="news-section-learn-more">
                            Learn more <i class="fa fa-arrow-right"></i>
                        </a>
                    </div>
                `;

                // 7. Append the new card to the container
                newsContainer.appendChild(newsCard);
            });
            
            // Increment the page number for the next "View More" click
            pageNum++;
        } else {
            // If there are no more articles, hide the button
            viewNewsBtn.textContent = 'No more news';
            viewNewsBtn.style.display = 'none';
        }

    } catch (error) {
        console.error("Could not fetch news:", error);
        viewNewsBtn.textContent = 'Failed to load news';
    } finally {
        // Re-enable the button if it's still visible
        if (viewNewsBtn.style.display !== 'none') {
            viewNewsBtn.textContent = 'View all news';
            viewNewsBtn.disabled = false;
        }
    }
}

// 8. Add the click event listener to the button
viewNewsBtn.addEventListener('click', () => {
    fetchNews();
});

// This event fires when the initial HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', async() => {
    await fetchNews(6); // Call the function once to load the first batch of news
    pageNum++;
});


const switchTheme = document.getElementById("theme-switcher");
console.log(switchTheme);
switchTheme.addEventListener("click", (event) => {
    event.preventDefault();
    var a=document.body.classList.toggle('darktheme');
    console.log(a);
});