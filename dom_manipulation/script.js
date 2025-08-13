// Initial quotes data
const quotes = {
  Motivation: [
    "Push yourself, because no one else is going to do it for you.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t stop when you’re tired. Stop when you’re done."
  ],
  Humor: [
    "I’m on a seafood diet. I see food and I eat it.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my computer I needed a break, and now it won’t stop sending me Kit-Kats."
  ],
  Wisdom: [
    "The only true wisdom is in knowing you know nothing.",
    "In the middle of every difficulty lies opportunity.",
    "Life is really simple, but we insist on making it complicated."
  ]
};

// DOM elements
const categorySelect = document.getElementById('categorySelect');
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Populate category dropdown
function populateCategories() {
  categorySelect.innerHTML = "";
  Object.keys(quotes).forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Show random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  if (!selectedCategory || !quotes[selectedCategory].length) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes[selectedCategory].length);
  quoteDisplay.textContent = quotes[selectedCategory][randomIndex];
}

// Add a new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both a quote and a category.");
    return;
  }

  if (!quotes[category]) {
    quotes[category] = [];
  }

  quotes[category].push(text);
  populateCategories();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  alert("Quote added successfully!");
}

// Event listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

// Initial setup
populateCategories();
showRandomQuote();
