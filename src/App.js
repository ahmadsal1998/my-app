import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [english, setEnglish] = useState('');
  const [arabic, setArabic] = useState('');
  const [words, setWords] = useState([]);

  const addWord = async () => {
    if (english && arabic) {
      const res = await axios.post('/api/words', { english, arabic });
      setWords([...words, res.data]);
      setEnglish('');
      setArabic('');
    }
  };

  useEffect(() => {
    const fetchWords = async () => {
      const res = await axios.get('/api/words');
      setWords(res.data);
    };
    fetchWords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Vocabulary App</h1>
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          placeholder="English Word"
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={arabic}
          onChange={(e) => setArabic(e.target.value)}
          placeholder="Arabic Translation"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={addWord}
        >
          Add Word
        </button>
      </div>

      <div className="mt-8 w-96">
        <h2 className="text-xl font-semibold mb-4">Saved Words</h2>
        <ul className="bg-white p-4 rounded shadow-lg">
          {words.map((word) => (
            <li
              key={word._id}
              className="flex justify-between py-2 border-b last:border-none"
            >
              <span>{word.english}</span>
              <span>{word.arabic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
