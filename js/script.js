let selectedCard = null;

// DOM selection
const cards = document.querySelectorAll(".card");
const body = document.body;

// Function to handle card selection
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // Using dataset to get the experience type
    selectedCard = event.currentTarget.dataset.experience;

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
