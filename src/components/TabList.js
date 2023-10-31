import React from "react";
import TabItem from "./TabItem";

function TabList({ tabs, onTabClick, onCategoryChange }) {
  return (
    <div>
      <h2>Tab List</h2>
      <ul>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            onTabClick={onTabClick}
            onCategoryChange={onCategoryChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default TabList;
