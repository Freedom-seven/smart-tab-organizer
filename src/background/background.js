const tabsData = {}; // Store tab information and their categories

// Listen for messages from the popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && typeof request === "object") {
    if (request.action === "getCategorizedTabs") {
      sendResponse({ tabsData });
    } else if (
      request.action === "updateTabCategory" &&
      request.tabId &&
      request.category
    ) {
      const { tabId, category } = request;
      tabsData[tabId] = { category };
      sendResponse({ success: true });
    }
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if a tab's URL has changed, and update the tab's title if needed
  if (changeInfo.url && tab.title) {
    tabsData[tabId] = { ...tabsData[tabId], title: tab.title };
  }
});

// Listen for tab removal
chrome.tabs.onRemoved.addListener((tabId) => {
  // Remove the tab from the data when it's closed
  delete tabsData[tabId];
});

// Additional logic for categorizing tabs (e.g., based on URL patterns)
function categorizeTabs() {
  chrome.tabs.query({}, (allTabs) => {
    allTabs.forEach((tab) => {
      const { id, url } = tab;
      if (!tabsData[id] || tabsData[id].category === "uncategorized") {
        // Implement your categorization logic here (e.g., based on URL patterns)
        if (url.includes("facebook.com")) {
          tabsData[id] = { category: "social" };
        } else if (url.includes("wikipedia.org")) {
          tabsData[id] = { category: "research" };
        } else {
          tabsData[id] = { category: "uncategorized" };
        }
      }
    });
  });
}

// Periodically categorize tabs (adjust the interval as needed)
setInterval(categorizeTabs, 60000); // Categorize tabs every 60 seconds
