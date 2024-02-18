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
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log("Base64 String Image:", reader.result);
        handleClose("image", description);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      console.error("Please select an image file.");
    }
  };

  const handleSubmitAll = () => {
    const formData = new FormData();
    formData.append("text", description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if (audioBase64) {
      formData.append('audio', audioBase64);
    }

  // console.log(formData.get('audio'),formData.get('image'),formData.get('text'));

    fetch("http://127.0.0.1:5000/get-result", {
      method: "POST",
      body: formData,
      headers:{
        'Accept': 'multipart/form-data'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data.barcode);

      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });


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
        <div className="flex flex-col items-center mt-4">
          <form onSubmit={handleSubmit} className="flex items-start space-x-4">
            <span className="cursor-pointer">
              <h1 className="font-bold text-black text-lg" style={{ marginLeft: "-100px"}}>1. Add Image 📷</h1>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </span>
            <label
              htmlFor="imageInput"
              className="flex items-center px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              <span className="mr-2">Choose File</span>
              📂
            </label>
          </form>

          <span className="cursor-pointer flex items-center justify-between w-full mt-4">
            <h1 className="font-bold text-black text-lg">2. Record 🎤 </h1>
            <div className="flex items-center" style={{ marginLeft: "20px"}}>
              <button
                className={`px-4 py-2 ${
                  recordOption === "audio" ? "bg-white "  : "bg-blue-500" //yaha pe
                } text-white rounded hover:bg-blue-700`}
                style={{ marginLeft: "-5px" }}
                onClick={() => {
                  if (recordOption === "audio") {
                    console.log("Recording started");
                  }
                  toggleRecordOption("audio")();
                }}
              >
                {recordOption === "audio"
                  ? ""
                  : "Start Recording"}
              </button>
              {recordOption === "audio" && <AudioRecorder onAudioData={setAudioBase64}/>}
            </div>
          </span>

          <div className="mt-4 w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="font-bold text-black text-lg">
                3. Add Description📃
              </h1>

              <div className="flex-grow">
                <textarea
                  className="block w-full p-2 border border-gray-300 bg-slate-50 text-black resize-none"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ height: "100px" }}
                ></textarea>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                type="submit"
                onClick={handleSubmitAll}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
