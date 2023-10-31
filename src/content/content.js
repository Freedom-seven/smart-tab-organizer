// Function to get the category of the current tab
function getCategory() {
  // You can implement a logic to determine the category based on the current web page
  if (window.location.hostname.includes("facebook.com")) {
    return "social";
  } else if (window.location.hostname.includes("wikipedia.org")) {
    return "research";
  } else if (window.location.hostname.includes("amazon.com")) {
    return "shopping";
  } else if (window.location.hostname.includes("youtube.com")) {
    return "entertainment";
  } else if (window.location.hostname.includes("linkedin.com")) {
    return "professional";
  } else if (window.location.hostname.includes("gmail.com")) {
    return "email";
  } else if (window.location.hostname.includes("stackoverflow.com")) {
    return "development";
  } else if (window.location.hostname.includes("github.com")) {
    return "development";
  } else if (window.location.hostname.includes("news.google.com")) {
    return "news";
  } else if (window.location.hostname.includes("twitter.com")) {
    return "social";
  }
  return "uncategorized";
}

// Create or update a button to save the current page to a category
function createOrUpdateSaveButton(category) {
  let button = document.getElementById("saveButton");
  if (!button) {
    button = document.createElement("button");
    button.id = "saveButton";
    document.body.appendChild(button);
  }

  button.innerText = `Save to ${category}`;
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = 9999;
  button.style.background = "blue";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.padding = "5px 10px";
  button.style.cursor = "pointer";

  // Remove all event listeners from the button
  const newButton = button.cloneNode(true);
  button.parentNode.replaceChild(newButton, button);

  newButton.addEventListener("click", () => {
    // Notify the background script to save the current page to the specified category
    chrome.runtime.sendMessage({
      action: "savePage",
      url: window.location.href,
      category,
    });
  });
}

// Get the category of the current page
const category = getCategory();

// Only create or update the save button if the category is not 'uncategorized'
if (category !== "uncategorized") {
  createOrUpdateSaveButton(category);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request &&
    typeof request === "object" &&
    request.action === "updateCategory"
  ) {
    // Update the category of the current page
    const category = getCategory();
    if (category !== "uncategorized") {
      createOrUpdateSaveButton(category);
    }
  }
});

// Notify the background script to update the category when the page is loaded or URL changes
chrome.runtime.sendMessage({ action: "updateCategory" });
