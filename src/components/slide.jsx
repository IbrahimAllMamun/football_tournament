import React, { useState, useEffect, useRef } from 'react';
import FootballField from './playingPosition'; // Import the field component

import TeamCardForm from '@/components/teamCardForm';
import ACS from '@/components/acs/acs';



const SlideshowWithField = ({players}) => {
  const [index, setIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // For showing/hiding the search bar
  const [isModalVisible, setIsModalVisible] = useState(false); // For controlling modal animation
  const inputRef = useRef(null); // Reference to the input field

  // Keypress handler for Ctrl+Space and arrow keys
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.code === 'Space') {
        setIsSearchVisible((prev) => !prev); // Toggle search bar visibility
        setTimeout(() => setIsModalVisible((prev) => !prev), 50); // Add slight delay for animation effect
      } else if (event.code === 'ArrowRight') {
        nextPlayer(); // Handle right arrow key for next player
      } else if (event.code === 'ArrowLeft') {
        prevPlayer(); // Handle left arrow key for previous player
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Focus on the input field when the search bar appears
  useEffect(() => {
    if (isSearchVisible && isModalVisible && inputRef.current) {
      inputRef.current.focus(); // Automatically focus on the input field
    }
  }, [isSearchVisible, isModalVisible]);

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
    setInputValue(''); // Clear the input field
    setIsModalVisible(false); // Hide modal animation
    setTimeout(() => setIsSearchVisible(false), 300); // Delay to finish fade-out animation
  };

  return (
    <div className="flex flex-col h-screen bg-[url('../public/bg.jpg')] bg-cover bg-bottom">
      {/* Player Number Display */}
      <div className="w-full text-center font-kanit font-outline-1 text-green-500 text-[4rem] p-10 pb-0">
        <h1 className="drop-shadow-[0_0px_10px_rgba(0,0,0,1)]">
          Shahidullah Hall Football Fiesta 2024
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        <div className="flex-none w-[35rem] flex items-center p-4 pl-20">
          <div className="font-fredoka text-white">
            <span className="bg-green-800 text-white border-2 text-5xl font-semibold me-2 px-4 py-1 rounded-full">
              {players[index].playingPosition}
            </span>
            <h2 className="text-5xl font-semibold mb-4 mt-3">
              {players[index].name}
            </h2>
            <p className="text-4xl font-medium my-4">
              {players[index].department}
            </p>
            <p className="text-4xl font-medium my-4">
              {players[index].session}
            </p>
          </div>
        </div>

        {/* Player Image */}
        <div className="flex-[2] flex flex-col items-center justify-center p-4 ">
          <img
            src={players[index].image}
            alt={players[index].name}
            className="w-[80%] border-8 border-white aspect-[4/4] drop-shadow-3xl object-cover rounded-[10000px] mb-4 transition-opacity duration-500 ease-in-out opacity-100"
          />
        </div>

        {/* Right Column */}
        <div className="flex-none w-[35rem] flex items-center justify-center p-4">
          <TeamCardForm />
        </div>
      </div>

      <div className="flex justify-between items-center w-full p-10 pt-0">
        <div className="border-[6px] w-20 h-20 py-4 border-white aspect-[4/4] rounded-[100px] justify-center bg-green-700">
          <h1 className="text-white font-extrabold text-center font-kanit text-4xl">
            {players[index].SL}
          </h1>
        </div>

        <div className="relative">
          <img
            src="/sponsor.jpg"
            alt="sponsor"
            className="absolute w-16 -top-7 -right-7 z-40 border-4 border-white aspect-[4/4] drop-shadow-3xl object-cover rounded-[10000px] mb-4 transition-opacity duration-500 ease-in-out opacity-100"
          />

          <div className="flex flex-col shadow-lg rounded-lg text-white p-3 bg-green-600/80 font-fredoka backdrop-blur-sm border-4 border-white">
            <ACS height={70} />
            <p className="font-fredoka text-white font-medium text-2xl">
              Md Nazmus SHakib
            </p>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50 
          transition-all duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <form
            onSubmit={handleSubmit}
            className={` p-6 rounded shadow-lg transform transition-all duration-300 
            ${isModalVisible ? 'scale-100' : 'scale-90'}`}
          >
            <input
              type="number"
              min="1"
              max={players.length}
              className="p-2 border border-gray-400 rounded text-black w-[500px] h-14"
              placeholder="Enter player number..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update input value
              ref={inputRef} // Set input reference
              disabled={!isModalVisible} // Disable input when the modal is hidden
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default SlideshowWithField;
