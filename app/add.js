'use client';

import React, { useState } from 'react';

const Add = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionClick = (option) => {
    console.log(`Adding ${option}`);
    setShowPopup(false);
  };

  return (
    <React.Fragment>
      <div className="flex justify-center">
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handlePopup}
        >
          Add Item
        </button>
      </div>

      {showPopup && <AddOptionsPopup handleClose={handleOptionClick} />}
    </React.Fragment>
  );
};

const AddOptionsPopup = ({ handleClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg relative">
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={() => handleClose(null)} // Pass null or any value to signify closing
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleClose('image')}
          >
            Add Image
          </button>
          <button
            className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleClose('audio')}
          >
            Add Audio
          </button>
          <button
            className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleClose('description')}
          >
            Add Description
          </button>
        </div>
      </div>
    );
  };

export default Add;
