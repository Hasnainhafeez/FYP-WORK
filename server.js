const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mongoose Schema and Model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);

// Routes
// Add a new person
app.post("/api/person", async (req, res) => {
  const { name, age } = req.body;
  try {
    const person = new Person({ name, age });
    await person.save();
    res.status(201).send(person);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all persons
app.get("/api/person", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).send(people);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
