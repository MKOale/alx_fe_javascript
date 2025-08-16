let quotes = [];
loadQuotes(); // This loads saved quotes when the page opens
// Initial quotes array
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" }
];

// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Create add quote form dynamically
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  // Quote text input
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  // Quote category input
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Add button
  const addBtn = document.createElement("button");
  addBtn.id = "addQuoteBtn";
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  // Append all to form
  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

// Show random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

// Add new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("New quote added successfully!");
  } else {
    alert("Please enter both quote text and category.");
  }
}
// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}
// Quotes with categories
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Wisdom" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Resilience" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" }
];

// Load last filter selection from localStorage
let lastFilter = localStorage.getItem("selectedCategory") || "all";

// Populate dropdown categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))]; // unique categories

  // Clear previous options except "All"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  categoryFilter.value = lastFilter;
}

// Show quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); // save filter choice

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  displayQuotes(filteredQuotes);
}

// Display quotes in the DOM
function displayQuotes(quotesToShow) {
  const display = document.getElementById("quoteDisplay");
  display.innerHTML = "";
  quotesToShow.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" — ${q.category}`;
    display.appendChild(p);
  });
}

// Generate random quote
function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  displayQuotes([randomQuote]);
}

// Add new quote
function addQuote() {
  const text = prompt("Enter the quote:");
  const category = prompt("Enter the category:");
  if (text && category) {
    quotes.push({ text, category });
    populateCategories(); // update categories dynamically
    filterQuotes(); // re-filter to reflect changes
  }
}

// Initialize
populateCategories();
filterQuotes();
// ---------------- Task 3: Syncing Data with Server & Conflict Resolution ----------------

// Simulated server API endpoint (mock API)
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; 

// Function to fetch quotes from "server"
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    // For simulation, we'll treat `data` as quotes
    const serverQuotes = data.slice(0, 5).map((item, index) => ({
      text: item.title,
      category: index % 2 === 0 ? "Inspiration" : "Wisdom"
    }));

    // Get local quotes
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Conflict resolution: server data takes precedence
    const mergedQuotes = [...serverQuotes, ...localQuotes];

    // Save back to localStorage
    localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

    // Update UI
    displayQuotes();
    populateCategories();

    notifyUser("Quotes synced with server (server data prioritized).");
  } catch (error) {
    console.error("Error fetching from server:", error);
  }
}

// Function to push a new quote to "server"
async function pushQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify(quote),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    const result = await response.json();
    console.log("Pushed to server:", result);
  } catch (error) {
    console.error("Error pushing to server:", error);
  }
}

// Conflict notification system
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#333";
  notification.style.color = "#fff";
  notification.style.padding = "10px 15px";
  notification.style.borderRadius = "5px";
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 4000);
}

// Periodically sync with server every 20 seconds
setInterval(fetchQuotesFromServer, 20000);

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to JSON file
function exportToJsonFile() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Event listener for showing quotes
newQuoteBtn.addEventListener("click", showRandomQuote);

// Call the function to create form
createAddQuoteForm();
