"use client";

import React, { useState, useRef } from "react";

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
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const audioRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.start();
    } catch (err) {
      console.error("The following error occurred:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/mp4" });

        // Read the Blob as a binary string
        const reader = new FileReader();
        reader.readAsBinaryString(blob);
        reader.onloadend = () => {
          // Convert the binary string to Base64
          const base64Audio = btoa(reader.result);

          // Display the Base64 audio on the screen
          // This could be done by setting a state variable or directly manipulating the DOMf
          if (audioRef.current) {
            audioRef.current.src = `data:audio/mp4;base64,${base64Audio}`;
            audioRef.current.controls = true;
          }

          console.log("Audio Blob converted to Base64:", base64Audio);
        };
        setShowPopup(true);
        // Reset the mediaRecorder and recordedChunks
        setMediaRecorder(null);
        setRecordedChunks([]);
      };
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
          <div className="flex flex-row justify-between">
            <button
              className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={startRecording}
            >
              Start
            </button>
            <button
              className="block mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={stopRecording}
            >
              Stop
            </button>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-center text-black">
                  Recording saved successfully!
                </h2>
                <button
                  className="block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
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
