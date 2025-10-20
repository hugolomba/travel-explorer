let selectedCard = null;

// DOM selection
const cards = document.querySelectorAll(".options-card");
const resultsSection = document.getElementById("results-section");
const resultsTitle = document.getElementById("results-title");
const body = document.body;

// Function to handle card selection
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Using dataset to get the experience type
    selectedCard = event.currentTarget.dataset.experience;

    switch (selectedCard) {
      case "eco":
        resultsTitle.textContent = "EcoVoyage – Sustainable Adventures";
        break;
      case "culture":
        resultsTitle.textContent = "CultureQuest – Food, Art & History";
        break;
      case "extreme":
        resultsTitle.textContent = "WildTrails – Extreme Adventures";
        break;
      case "spiritual":
        resultsTitle.textContent = "MystiQuest – Spiritual & Hidden Journeys";
        break;
      case "mindful":
        resultsTitle.textContent = "MindfulGetaway – Wellness & Balance";
        break;
      default:
        resultsTitle.textContent = "Available Destinations";
    }

    // Show results section
    resultsSection.classList.remove("hidden");

    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: "smooth" });

    // // Change body class based on selected card for background effect

    // // Remove previous card classes
    // body.className = "";

    // // Add the new class based on selected card
    // body.classList.add(`card-${selectedCard}`);
  });
});

// // Function to add hover effect
// function addHoverEffect(card, colorClass) {
//   card.addEventListener("mouseenter", () => {
//     card.classList.add(colorClass);
//   });

//   card.addEventListener("mouseleave", () => {
//     card.classList.remove(colorClass);
//   });
// }

// // Adding hover effects to each card with specific color classes
// addHoverEffect(document.querySelector(".card-adventure"), "hover-adventure");
// addHoverEffect(document.querySelector(".card-culture"), "hover-culture");
// addHoverEffect(document.querySelector(".card-extreme"), "hover-extreme");
// addHoverEffect(document.querySelector(".card-mindful"), "hover-mindful");
// addHoverEffect(document.querySelector(".card-spiritual"), "hover-spiritual");
// // You can add more cards and their respective hover effects as needed
