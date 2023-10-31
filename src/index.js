import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Ensure that the extension's popup size fits its content
const setPopupSize = (width, height) => {
  const popup = document.querySelector(".popup-container");
  popup.style.width = `${width}px`;
  popup.style.height = `${height}px`;
};

// Ensure the popup size is consistent
setPopupSize(320, 480);

// Render the React app in the popup
ReactDOM.render(<App />, document.getElementById("root"));

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request &&
    typeof request === "object" &&
    request.action === "updateCategory"
  ) {
    // Update the category of the current tab when requested by the popup
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.runtime.sendMessage({
          action: "updateTabCategory",
          tabId: tabs[0].id,
          category: request.category,
        });
      }
    });
  }
});

// Listen for tab updates (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Inform the popup to update the category when a tab updates
  if (changeInfo.url) {
    chrome.runtime.sendMessage({ action: "updateCategory" });
  }
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
  // Inform the popup to update the category when a tab is closed
  chrome.runtime.sendMessage({ action: "updateCategory" });
});
