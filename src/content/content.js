// Function to get the category of the current tab
function getCategory() {
  // You can implement a logic to determine the category based on the current web page
  if (window.location.hostname.includes("example.com")) {
    return "example";
  } else if (window.location.hostname.includes("anotherexample.com")) {
    return "anotherexample";
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
