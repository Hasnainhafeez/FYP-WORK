import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [people, setPeople] = useState([]);
  const [showPeople, setShowPeople] = useState(false); // New state to toggle list display

  const fetchPeople = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/person");
      setPeople(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // This function is only called when "View Members" is clicked
  const handleViewMembers = () => {
    fetchPeople();
    setShowPeople(true); // Show the list
  };

  const addPerson = async () => {
    if (!name || !age) {
      alert("Please enter both name and age");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/person", {
        name,
        age: parseInt(age),
      });
      setPeople([...people, response.data]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a Person</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addPerson}>Add</button>

      <h3>People in University</h3>
      <button onClick={handleViewMembers}>View Members</button> {/* New button */}

      {showPeople && ( // Conditionally render people list
        <ul>
          {people.map((person) => (
            <li key={person._id}>
              {person.name} - {person.age} years old
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
