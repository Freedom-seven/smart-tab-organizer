import React, { useEffect, useState } from "react";
import TabList from "../components/TabList";

import "./Popup.css";

function Popup() {
  const [tabs, setTabs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    // Fetch categorized tabs from the background script
    chrome.runtime.sendMessage({ action: "getCategorizedTabs" }, (response) => {
      if (response && typeof response === "object" && response.tabsData) {
        setTabs(response.tabsData);
      }
    });
  }, []);

  const handleCategoryChange = (tabId, category) => {
    // Send the updated category to the background script
    chrome.runtime.sendMessage(
      { action: "updateTabCategory", tabId, category },
      (response) => {
        if (response && typeof response === "object" && response.success) {
          // Update the category in the popup state
          setTabs((prevTabs) => ({
            ...prevTabs,
            [tabId]: { ...prevTabs[tabId], category },
          }));
        }
      }
    );
  };

  const filterTabs = () => {
    if (categoryFilter === "all") {
      return Object.values(tabs);
    } else {
      return Object.values(tabs).filter(
        (tab) => tab.category === categoryFilter
      );
    }
  };

  return (
    <div>
      <h1>Smart Tab Organizer</h1>
      <div>
        Filter by Category:
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="uncategorized">Uncategorized</option>
          <option value="social">Social Media</option>
          <option value="research">Research</option>
          <option value="shopping">Shopping</option>
          <option value="news">News</option>
          <option value="entertainment">Entertainment</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <TabList tabs={filterTabs()} onCategoryChange={handleCategoryChange} />
    </div>
  );
}

export default Popup;
