"use client";

import React, { useState, useRef } from "react";
import AudioRecorder from "./utils/AudioRecorder.jsx";
const mimeType = "audio/webm";

const Add = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOptionClick = (option, description) => {
    if (option !== null) {
      console.log(`Adding ${option}`);
      console.log(`Description: ${description}`);
    }
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
  const [description, setDescription] = useState("");
  const [recordOption, setRecordOption] = useState("video");

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
      <div className="bg-white p-4 rounded shadow-lg relative flex flex-col items-center">
        <button
          className="absolute top-1 right-2 text-gray-600"
          onClick={() => handleClose(null, description)}
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

        <div className="flex space-x-4 mt-4">
          <button
            className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleClose("image", description)}
          >
            Add Image
          </button>

          <button
            className={`block mb-2 px-4 py-2 ${
              recordOption === "audio"
                ? "bg-green-500"
                : "bg-blue-500"
            } text-white rounded hover:bg-blue-700`}
            onClick={toggleRecordOption("audio")}
          >
            Record
          </button>
          {recordOption === "audio" && <AudioRecorder />}
        </div>

        <div>
          <textarea
            className="block w-full p-2 border border-gray-300 bg-slate-50 text-black resize-none"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            style={{ height: "150px" }}
          ></textarea>
          {/* You can style the text area as needed */}
        </div>
      </div>
    </div>
  );
};

export default Add;
