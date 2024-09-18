const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model for words
const wordSchema = new mongoose.Schema({
  english: String,
  arabic: String
});

const Word = mongoose.model('Word', wordSchema);

// Routes
app.post('/api/words', async (req, res) => {
  const { english, arabic } = req.body;
  const newWord = new Word({ english, arabic });
  await newWord.save();
  res.json(newWord);
});

app.get('/api/words', async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//mongodb+srv://salamea1998:HLOgCW17AVF3dKU@cluster0.1uiak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0