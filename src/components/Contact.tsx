import React from "react";

function Contact() {
  const handleTestDb = async () => {
    try {
      // Call the /api/test-db endpoint
      const response = await fetch("/api/test-db");
      const data = await response.json();

      // Check if the request was successful
      if (data.success) {
        alert(`Database Time: ${data.currentTime}`);
      } else {
        alert("Failed to connect to the database.");
      }
    } catch (error) {
      console.error("Error calling /api/test-db:", error);
      alert("An error occurred while testing the database connection.");
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>This is the contact page.</p>
      <button onClick={handleTestDb}>Test Database Connection</button>
    </div>
  );
}

export default Contact;
