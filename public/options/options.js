import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Options() {
  const [options, setOptions] = useState({});

  // Fetch options when component mounts
  useEffect(() => {
    chrome.storage.sync.get("options", (data) => {
      setOptions(data.options || {});
    });
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    setOptions({
      ...options,
      [event.target.name]: event.target.value,
    });
  };

  // Save options
  const saveOptions = () => {
    chrome.storage.sync.set({ options }, () => {
      console.log("Options saved");
    });
  };

  return (
    <div>
      <h1>Options</h1>
      <label>
        Option 1:
        <input
          type="text"
          name="option1"
          value={options.option1 || ""}
          onChange={handleChange}
        />
      </label>
      <button onClick={saveOptions}>Save</button>
    </div>
  );
}

// Render the Options component into the 'options' div
ReactDOM.render(<Options />, document.getElementById("options"));
