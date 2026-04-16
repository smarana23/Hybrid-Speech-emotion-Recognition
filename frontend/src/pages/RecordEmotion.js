import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmotionContext } from "../context/EmotionContext";
import "./Record.css";
import { useEffect } from "react";
function RecordEmotion() {
  const [isRecording, setIsRecording] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Analyzing...");

  const navigate = useNavigate();

const {
  setEmotion,

  probabilities,

  setProbabilities,

  audioURL,

  setAudioURL,

  audioBlob,
  setAudioBlob
} = useContext(EmotionContext);
useEffect(() => {

  if (!isLoading) return;

  const steps = [
    "Preprocessing audio...",
    "Training neural network...",
    "Analyzing emotion...",
    "Classifying Speech Signals..",
    "Predicting Emotion..."
  ];

  let index = 0;

  const interval = setInterval(() => {
    setLoadingStep(steps[index]);
    index = (index + 1) % steps.length;
  }, 3000);

  return () => clearInterval(interval);

}, [isLoading]);
  const mediaRecorderRef = useRef(null);

  const chunksRef = useRef([]);

  const startRecording = async () => {
    setAudioURL(null);

    setAudioBlob(null);

    setEmotion(null);

setProbabilities(null);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;

    chunksRef.current = [];
    mediaRecorder.ondataavailable = (event) => {

      chunksRef.current.push(event.data);

    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);

      setAudioURL(URL.createObjectURL(blob));
      
      setIsProcessing(false);
    };

    mediaRecorder.start();

    setEmotion(null);

    setProbabilities(null);

    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };
  const blobToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);

    reader.readAsDataURL(blob);
  });

  const analyzeEmotion = async () => {
    if (!audioBlob) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");
    try {
      const response = await fetch(
        "https://hybrid-ser-backend.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      setEmotion(data.emotion);
      const probs = data.probability || data.probabilities;
      setProbabilities(probs);
  
      const base64Audio = await blobToBase64(audioBlob);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Saving history for user:", user?.id);

if (!user || !user.id) {
  alert("User not logged in properly");
  return;
}
await fetch("https://hybrid-ser-backend.onrender.com/api/history/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: user.id,
    emotion: data.emotion,
    audioUrl: base64Audio, // or base64 if needed
  }),
});
      // Create history record

const newRecord = {
  audio: base64Audio,
  emotion: data.emotion,
  probabilities: probs,
  timestamp: new Date().toLocaleString()
};

const existingHistory =
  JSON.parse(localStorage.getItem("emotion_history")) || [];

existingHistory.unshift(newRecord);

localStorage.setItem(
  "emotion_history",
  JSON.stringify(existingHistory.slice(0, 20))
);
    } catch (error) {
      alert("Server error. Please try again.");
    }
    setIsLoading(false);
    console.log(probabilities);
  };
  return (
    <div className="card">
      <h1>🎤 Emotion AI</h1>
      <p>Speak naturally and let AI detect your emotion.</p>
      {!isRecording && !isProcessing && !isLoading && !audioURL && (
       <button
  onClick={startRecording}>
  🎤 Start Recording
</button>
      )}
{isRecording && (
  <div style={{ marginTop: "10px" }}>
    <button disable className = "recording">
      🔴 Recording...
    </button>

    <br />
    <br />

    <button onClick={stopRecording} classname = "stop">
      Stop Recording
    </button>
  </div>
)}
      {audioURL && !isRecording && !isLoading && (
        <div style={{ marginTop: "20px" }}>
          <audio controls src={audioURL}></audio>
          <br />
          <br />
          {!probabilities && (
            <button onClick={analyzeEmotion} className = "analyze">Analyze Emotion</button>
          )}
          <br />
          <br />
          {probabilities && (
            <button onClick={() => navigate("/dashboard")} className = "dashboard">
              View Dashboard
            </button>
          )}
          <br />
          <br />
          <button onClick={startRecording}>Record Again</button>
        </div>
      )}
     {isLoading && (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>{loadingStep}</p>
  </div>
)}
    </div>
  );
}
export default RecordEmotion;
