import { useState, useRef, useCallback } from "react";

const AudioRecorder = ({ onAudioData }) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mimeType = "audio/webm";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);

      // Create a FileReader instance to read the blob as a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        // Log the base64 string
        // console.log("Base64 Audio:",reader.result);
        onAudioData(reader.result);
      };
      reader.readAsDataURL(audioBlob);

      setAudioChunks([]);
    };
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Audio Recorder</h2>
      <main>
        <div className="audio-controls space-y-4" >
          {!permission && (
            <button
              onClick={getMicrophonePermission}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="button"
            >
              Get Microphone
            </button>
          )}
          {permission && recordingStatus === "inactive" && (
            <button 
              onClick={startRecording}
              className="bg-green-500 text-white px-4 py-2 rounded"
              type="button"
            >
              Start Recording
            </button>
          )}
          {recordingStatus === "recording" && (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="button"
            >
              Stop Recording
            </button>
          )}
          {audio && (
            <div className="audio-container mt-4">
              <audio className="mb-2" src={audio} controls></audio>
              <a
                className="bg-blue-500 text-white px-4 py-2 rounded"
                download
                href={audio}
              >
                Download Recording
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AudioRecorder;
