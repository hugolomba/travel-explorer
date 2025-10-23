let selectedCard = null;

// DOM selection
// Result elements
const cards = document.querySelectorAll(".options-card");
const resultsSection = document.getElementById("results-section");
const resultsTitle = document.getElementById("results-title");
const resultCardsContainer = document.getElementById("result-cards");
const showAllPackagesButton = document.getElementById("show-all-packages");

// Modal elements
const modalContainer = document.querySelector(".modal-dialog");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalDescription = document.getElementById("modalDescription");
const modalItinerary = document.getElementById("modalItinerary");
const modalDuration = document.getElementById("modalDuration");
const modalPrice = document.getElementById("modalPrice");
const modalDifficulty = document.getElementById("modalDifficulty");
const modalBestTime = document.getElementById("modalBestTime");

// Function to create a result card with the given destination data
function renderPackages(packages) {
  // Clear previous results
  resultCardsContainer.innerHTML = "";

  packages.forEach((dest) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
    <div class="col">
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
    </div>
    `;
    resultCardsContainer.appendChild(card);
    console.log(card);
  });
}

// Event listener for "See all the packages" button
if (showAllPackagesButton) {
  showAllPackagesButton.addEventListener("click", () => {
    // Show all packages
    renderPackages(allPackages);
    // Hide the button after clicking
    showAllPackagesButton.classList.add("hidden");
    // Update the results title
    resultsTitle.textContent = "All Packages";
  });
}

// Function to handle card selection and call the function to display results
if (cards.length > 0) {
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Using dataset to get the experience type
      selectedCard = event.currentTarget.dataset.experience;

      switch (selectedCard) {
        case "eco":
          resultsTitle.textContent = "EcoVoyage – Sustainable Adventures";
          renderPackages(ecoPackages);
          break;
        case "culture":
          resultsTitle.textContent = "CultureQuest – Food, Art & History";
          renderPackages(culturePackages);
          break;
        case "extreme":
          resultsTitle.textContent = "WildTrails – Extreme Adventures";
          renderPackages(extremePackages);
          break;
        case "spiritual":
          resultsTitle.textContent = "MystiQuest – Spiritual & Hidden Journeys";
          renderPackages(spiritualPackages);
          break;
        case "mindful":
          resultsTitle.textContent = "MindfulGetaway – Wellness & Balance";
          renderPackages(mindfulPackages);
          break;
        default:
          resultsTitle.textContent = "Available Packages";
      }

      // Show results section
      resultsSection.classList.remove("hidden");

      // Scroll to results section
      resultsSection.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Event delegation to handle clicks on dynamically created result cards
if (resultCardsContainer) {
  resultCardsContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) {
      const title = card.querySelector(".card-title").textContent;

      // Find the destination data based on the title
      let destinationData = null;

      destinationData = allPackages.find((dest) => dest.title === title);

      if (destinationData) {
        const modal = document.createElement("div");
        modal.classList.add("modal-content");
        modal.innerHTML = `
         <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">${destinationData.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
        
          <h6 id="modalSubtitle" class="text-body-secondary">${
            destinationData.subtitle
          }</h6>
          <p id="modalDescription">${destinationData.description}</p>
          <hr>
          <h6>Itinerary</h6>
          <ul id="modalItinerary">${destinationData.itinerary
            .map((item) => `<li>${item}</li>`)
            .join("")}</ul>
          <ul class="list-group list-group-flush mt-3">
            <li id="modalDuration" class="list-group-item"><strong>Duration:</strong> ${
              destinationData.duration
            }</li>
            <li id="modalPrice" class="list-group-item"><strong>Price:</strong> ${
              destinationData.price
            }</li>
            <li id="modalDifficulty" class="list-group-item"><strong>Difficulty:</strong> ${
              destinationData.difficulty
            }</li>
            <li id="modalBestTime" class="list-group-item"><strong>Best Time To Travel:</strong> ${
              destinationData.bestTime
            }</li>
          </ul>
        </div>
        <div class="modal-footer justify-content-center">
          <a href="./contact.html" class="btn btn-primary">Book Now</a>
        </div>
      </div>
        `;
        // Clear previous modal content and append new content
        modalContainer.innerHTML = "";
        modalContainer.appendChild(modal);
      }
    }
  });
}

// FORM VALIDATION SCRIPT
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
