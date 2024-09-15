import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [awnser, setAwnser]=useState("");

  async function generateAwnser() {
    setAwnser("Loading...");
    const response = await axios({
      url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY }`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });
    
    setAwnser(response["data"]["candidates"][0]["content"]["parts"][0]["text"])
    
  }

  return (
    <>
      <div>AI Chat Bot</div>
      <textarea rows={10} cols={30} placeholder="Type Your Question Here." value={question} onChange={(e)=> setQuestion(e.target.value)}></textarea>
      <button onClick={generateAwnser}>Generate Awnser</button>
      <pre>{awnser}</pre>
    </>
  );
}

export default App;
