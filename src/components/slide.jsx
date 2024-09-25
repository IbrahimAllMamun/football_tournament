import React, { useState } from 'react';
import FootballField from './playingPosition'; // Import the field component
import data from '@/assets/data.json'

const players = data.players

const SlideshowWithField = () => {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const nextPlayer = () => {
    setIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const prevPlayer = () => {
    setIndex((prevIndex) => (prevIndex - 1 + players.length) % players.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    const newIndex = parseInt(inputValue, 10) - 1; // Convert input to index (0-based)
    if (newIndex >= 0 && newIndex < players.length) {
      setIndex(newIndex);
    }
    setInputValue(""); // Clear the input field
  };

  return (
    <div className="h-screen bg-[url('../public/bg.jpg')] bg-cover">
    <div className="flex flex-col h-screen bg-black/60">
      <div className="w-full text-center text-white text-2xl">
        <h1>Shahidullah Hall Football Fiesta 2024</h1>
      </div>
      <div className="flex flex-grow">
        {/* Left Column for Image and Details */}
        <div className="flex-[2] flex flex-col items-center justify-center p-4 ">
          <img 
            src={players[index].image} 
            alt={players[index].name} 
            className="w-[60%] aspect-[5/4]  object-cover rounded-lg mb-4 transition-opacity duration-500 ease-in-out opacity-100" 
          />
          <div className="text-center bg-yellow-600">
            <h2 className="text-xl font-bold">{players[index].name}</h2>
            <p className="text-black">{players[index].department}</p>
            <p className="text-black">{players[index].session}</p>
            <p className="text-black">{players[index].playingPosition}</p>
            <p className="text-black">{players[index].SL}</p>
          </div>
        </div>

        {/* Right Column for FootballField */}
        <div className="flex-none w-[35rem] flex items-center justify-center p-4">
          <FootballField playingPosition={players[index].playingPosition} className="shadow-lg"/>
        </div>
      </div>

      {/* Navbar at the Bottom */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <button 
          className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          onClick={prevPlayer}
        >
          Previous
        </button>
        <form onSubmit={handleSubmit} className="flex items-center w-1/3">
          <input 
            type="number"
            min="1"
            max={players.length}
            className="flex-grow p-2 border border-gray-400 rounded mr-2 text-black"
            placeholder="Enter player number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update input value
          />
          <button 
            type="submit"
            className="bg-green-500 py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
          >
            Search
          </button>
        </form>
        <button 
          className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          onClick={nextPlayer}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default SlideshowWithField;
