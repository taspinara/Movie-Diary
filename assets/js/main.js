// Search bar  feature
const apiKey = "0dd562c1903f3f6f6244f87faff5d4c7";

const moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("submit-btn");
const searchResults = document.getElementById("search-results");

const DISPLAY_LIMIT = 20;


const limitText = (text, maxLength) => {
    return (text.length > maxLength) ? `${text.substring(0, maxLength)}...` : text;
}

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

const fetchSearch = async (input) => {
  console.log("input", input);

  try {
    const response = await fetch(
      `${searchUrl}&language=en-US&page=1&include_adult=false&query=${input}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search input");
    }
    const data = await response.json();
    console.log(data);

    const results = data.results;

    displaySearchResults(results);

    // clear input
    searchInput.value = "";

  } catch (e) {
    console.error("Error fetching results", e);
  }
};

const displaySearchResults = (list) => {
  if (!list) {
    console.log("No data");
  } else {
    searchResults.classList.add(
      "grid",
      "lg:grid-cols-5",
      "md:grid-cols-4",
      "md:gap-2",
      "sm:grid-cols-2",
      "max-sm:grid-cols-1",
      "max-sm:place-items-center"
    );
    list.forEach((movie) => {
      console.log(`Title: ${movie.title}`);

      const li = document.createElement("li");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");
      h2.textContent = limitText(movie.title, 15);

      if (movie.poster_path) {
        img.src = `${imageBaseUrl}${movie.poster_path}`;
        img.alt = movie.title;
      } else {
        img.src = "https://placehold.co/600x900/png"; // Placeholder if no image is available
        img.alt = "No image available";
      }

      h2.classList.add("text-xl", "mb-1", "font-semibold");
      p.classList.add("text-md", "mb-10");
      li.appendChild(img);
      li.appendChild(h2);
      li.appendChild(p);

      searchResults.appendChild(li);
    });
  }
};

searchButton.addEventListener("click", () => fetchSearch(searchInput.value));
searchInput.addEventListener("click", () => (searchResults.textContent = ""));
// END Search
