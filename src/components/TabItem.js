/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

function TabItem({ tab, onTabClick, onCategoryChange }) {
  const [category, setCategory] = useState(tab.category);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    onCategoryChange(tab.id, newCategory);
  };

  return (
    <li>
      <a href="#" onClick={() => onTabClick(tab.id)}>
        {tab.title}
      </a>
      <div>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="uncategorized">Uncategorized</option>
          <option value="social">Social Media</option>
          <option value="research">Research</option>
          <option value="shopping">Shopping</option>
          {/* Add more categories as needed */}
        </select>
      </div>
    </li>
  );
}

export default TabItem;
