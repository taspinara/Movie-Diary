const  localResults = document.getElementById("local-results");
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const limitText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const OVERVIEW_LIMIT = 50;
const DISPLAY_LIMIT = 20;


const displayFavorites = () => {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.length == 0) {
        localResults.innerHTML = `<p class="text-red-600 mx-auto text-md mb-2">No information to display</p>`
    }else {
        localResults.classList.add(
            "grid",
            "lg:grid-cols-5",
            "md:grid-cols-4",
            "md:gap-2",
            "sm:grid-cols-2",
            "max-sm:grid-cols-1",
            "max-sm:place-items-center"
          );

        favorites.forEach((elt) => {

            const li = document.createElement("li");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
    
            const p = document.createElement("p");
            p.textContent = `${limitText(elt.overview, OVERVIEW_LIMIT)}`;
    
            h2.textContent = limitText(elt.title, DISPLAY_LIMIT);
    
            if (elt.poster_path) {
            img.src = `${imageBaseUrl}${elt.poster_path}`;
            img.alt = elt.title;
            } else {
            img.src = "https://placehold.co/600x900/png"; // Placeholder if no image is available
            img.alt = "No image available";
            img.classList.add("w-64");
            }
    
            h2.classList.add("text-xl", "m-2", "font-semibold");
    
            p.classList.add("text-md", "mb-2")
    
            li.appendChild(img);
            li.appendChild(h2);
            li.appendChild(p);
    
            localResults.appendChild(li);
        })   
    }
}

displayFavorites();

// Hamburger menu toggle 
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');


mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

