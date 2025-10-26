// All package data is stored in packages.js

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

// Form elements
const contactForm = document.querySelector(".contact-form");
const successMessage = document.querySelector(".success-message");
const newMessageButton = document.getElementById("new-message-btn");

// Function to create a result card with the given destination data
function renderPackages(packages) {
  // Clear previous results
  resultCardsContainer.innerHTML = "";

  packages.forEach((dest) => {
    // For each destination, create a card element
    const card = document.createElement("div");
    // Add a Bootstrap column class
    card.classList.add("col");
    // Set the inner HTML of the card with destination data (all the information comes from packages.js)
    card.innerHTML = `
    <div class="col">
      <div class="card result-card h-100" data-bs-toggle="modal" data-bs-target="#detailsModal">
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
    // Append the card to the results container
    resultCardsContainer.appendChild(card);
  });
}

// Function to handle card selection and call the function to display results
// Event listeners for experience option cards
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Using dataset to get the experience type
    selectedCard = event.currentTarget.dataset.experience;
    // Update results title and render packages based on selected experience using a switch statement, using the function (renderPackages) with the packages from packages.js
    switch (selectedCard) {
      case "eco":
        resultsTitle.textContent = "Eco Experience – Sustainable Adventures";
        renderPackages(ecoPackages);
        break;
      case "culture":
        resultsTitle.textContent = "Culture Experience – Food, Art & History";
        renderPackages(culturePackages);
        break;
      case "extreme":
        resultsTitle.textContent = "Wild Experience – Extreme Adventures";
        renderPackages(extremePackages);
        break;
      case "spiritual":
        resultsTitle.textContent =
          "Spiritual Experience – Spiritual & Hidden Journeys";
        renderPackages(spiritualPackages);
        break;
      case "mindful":
        resultsTitle.textContent = "Mindful Experience – Wellness & Balance";
        renderPackages(mindfulPackages);
        break;
      default:
        resultsTitle.textContent = "Available Packages";
    }

    //  Remove hidden class to show results section
    resultsSection.classList.remove("hidden");

    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Event delegation to handle clicks on dynamically created result cards and show modal with details

if (resultCardsContainer) {
  // Add click event listener to the container
  resultCardsContainer.addEventListener("click", (event) => {
    // Find the clicked card element
    const card = event.target.closest(".card");
    // Proceed only if a card was clicked
    if (card) {
      // Get the title of the clicked card
      const title = card.querySelector(".card-title").textContent;

      // Find the destination data based on the title
      let destinationData = null;

      // Search in all packages arrays
      destinationData = allPackages.find((dest) => dest.title === title);

      // If destination data is found, populate the modal
      if (destinationData) {
        // Create modal content
        const modal = document.createElement("div");
        // Add modal-content class
        modal.classList.add("modal-content");
        // Set the inner HTML of the modal with destination data
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
          <a href="./contact.html" class="btn-custom rounded-pill px-4 py-2">Book Now</a>
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

// Event listener for "See all the packages" button
// Add if verification to ensure the button exists, to avoid errors on pages where it is not present
if (showAllPackagesButton) {
  showAllPackagesButton.addEventListener("click", () => {
    // Show all packages
    renderPackages(allPackages);
    resultsTitle.textContent = "All Packages";

    //  Remove hidden class to show results section
    resultsSection.classList.remove("hidden");
    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: "smooth" });
  });
}

// FORM VALIDATION SCRIPT FROM BOOTSTRAP DOCUMENTATION
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

        // If the form is valid, show success message
        if (form.classList.contains("was-validated") && form.checkValidity()) {
          // Form is valid, you can proceed with submission or further processing

          event.preventDefault();
          form.classList.add("hidden");
          successMessage.classList.remove("hidden");
        }
      },
      false
    );
  });
})();

// Real-time validation feedback
document
  .querySelectorAll(
    ".needs-validation input, .needs-validation textarea, .needs-validation select"
  )
  .forEach((input) => {
    input.addEventListener("blur", () => {
      if (!input.checkValidity()) {
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
    });
  });

// Event listener for "Send another message" button
if (newMessageButton) {
  newMessageButton.addEventListener("click", () => {
    // Reset form
    contactForm.reset();
    contactForm.classList.remove("hidden", "was-validated");
    successMessage.classList.add("hidden");

    // Remove validation classes
    contactForm.querySelectorAll(".is-valid, .is-invalid").forEach((input) => {
      input.classList.remove("is-valid", "is-invalid");
    });
  });
}
