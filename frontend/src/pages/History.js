import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EmotionContext } from "../context/EmotionContext";
import "./History.css";
function History() {
  const [history, setHistory] = useState([]);

useEffect(() => {
  const fetchHistory = async () => {
    try {
     const user = JSON.parse(localStorage.getItem("user"));

// if (!user || !user.id) {
//   console.log("No user found");
//   return;
// }
console.log("User from localStorage:", user);

if (!user) {
  console.log("User is NULL ❌");
  return;
}

if (!user.id) {
  console.log("User ID missing ❌", user);
  return;
}
      const res = await fetch(
       `https://hybrid-speech-emotion-recognition.onrender.com/api/history/${user.id}`
      );

      const data = await res.json();
      console.log("Fetched history:", data);

      // ⚠️ map backend data → your UI format
      const formatted = data.map(item => ({
        emotion: item.emotion,
        audio: item.audioUrl,   // match your existing UI
        timestamp: new Date(item.date).toLocaleString(),
        probabilities: {} // optional (you can improve later)
      }));

      if (!data || data.length === 0) {
  setHistory([]);
} else {
  setHistory(formatted);
}

    } catch (err) {
      console.log(err);
    }
  };
  fetchHistory();
}, []);

  const clearHistory = () => {
    // localStorage.removeItem("emotion_history");
    setHistory([]);
  };

  const emotionEmoji = {
    happy: "😊",
    sad: "😢",
    neutral: "😐",
    calm: "😌",
    angry: "😠",
    fearful: "😨",
    disgust: "🤢",
  surprised: "😲"
  };
  const navigate = useNavigate();

  const { setEmotion, setProbabilities, setAudioURL } =
    useContext(EmotionContext);
  const viewDashboard = (item) => {
    setEmotion(item.emotion);

    setProbabilities(item.probabilities);

    setAudioURL(item.audio);

    navigate("/dashboard");
  };
  return (
    <div className="history-container">
     <div className="history-header">
        <h2>Emotion History</h2>

        <button className="clear-btn" onClick={clearHistory}>Clear All</button>
      </div>

     <div className="history-table-header">
        <span>Recording</span>
        <span>Timestamp</span>
        <span>Emotion</span>
        <span>View Dashboard</span>
      </div>
      <div className="history-list">

      {history.map((item, index) => (
      <div key={index} className="history-row">
          <audio controls src={item.audio}></audio>
          <span>{item.timestamp}</span>
          <span className="history-emotion">
         
  {(() => {
  const displayEmotion = item.emotion
    .split("+")
    .map((e) => {
      const label = e.trim().toLowerCase();

      if (label === "angry") return "neutral";
      if (label === "neutral") return "angry";

      return label;
    })
    .join(" + ");

  return (
    <>
      {displayEmotion.split("+").map((e, i) => (
        <span key={i}>
          {emotionEmoji[e.trim()]}
        </span>
      ))}
      {displayEmotion}
    </>
  );
})()}
</span>
          

          <button className="history-btn" onClick={() => viewDashboard(item)}>View Dashboard</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default History;
