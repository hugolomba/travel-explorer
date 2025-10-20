let selectedCard = null;

// DOM selection
// Result elements
const cards = document.querySelectorAll(".options-card");
const resultsSection = document.getElementById("results-section");
const resultsTitle = document.getElementById("results-title");
const resultCardsContainer = document.getElementById("result-cards");

// Modal elements
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalDescription = document.getElementById("modalDescription");
const modalItinerary = document.getElementById("modalItinerary");
const modalDuration = document.getElementById("modalDuration");
const modalPrice = document.getElementById("modalPrice");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalBestTime = document.getElementById("modalBestTime");

// Function to create a result card
function renderDestinations(destinations) {
  // Clear previous results
  resultCardsContainer.innerHTML = "";

  destinations.forEach((dest) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card h-100" data-bs-toggle="modal" data-bs-target="#detailsModal">
        <img src="${dest.image}" class="card-img-top result-card-image" alt="${dest.title}" />
        <div class="card-body">
          <h5 class="card-title">${dest.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${dest.subtitle}</h6>
          <p class="card-text">${dest.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-around">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>
              <span class="ms-2">${dest.duration}</span>
            </div>
          </li>
          <li class="list-group-item">from <strong>${dest.price}</strong></li>
        </ul>
      </div>
    `;
    resultCardsContainer.appendChild(card);
    console.log(card);
  });
}

// Function to handle card selection and call the function to display results
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Using dataset to get the experience type
    selectedCard = event.currentTarget.dataset.experience;

    switch (selectedCard) {
      case "eco":
        resultsTitle.textContent = "EcoVoyage – Sustainable Adventures";
        renderDestinations(ecoDestinations);
        break;
      case "culture":
        resultsTitle.textContent = "CultureQuest – Food, Art & History";
        renderDestinations(cultureDestinations);
        break;
      case "extreme":
        resultsTitle.textContent = "WildTrails – Extreme Adventures";
        renderDestinations(extremeDestinations);
        break;
      case "spiritual":
        resultsTitle.textContent = "MystiQuest – Spiritual & Hidden Journeys";
        renderDestinations(spiritualDestinations);
        break;
      case "mindful":
        resultsTitle.textContent = "MindfulGetaway – Wellness & Balance";
        renderDestinations(mindfulDestinations);
        break;
      default:
        resultsTitle.textContent = "Available Destinations";
    }

    // Show results section
    resultsSection.classList.remove("hidden");

    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: "smooth" });
  });
});
