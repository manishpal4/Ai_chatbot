import { useState } from "react";
import "./App.css";
import axios from "axios";
import autoprefixer from "autoprefixer";

function App() {
  const [question, setQuestion] = useState("");
  const [awnser, setAwnser] = useState("");

  async function generateAwnser() {
    setAwnser("Loading...");
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
        import.meta.env.VITE_API_KEY
      }`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    setAwnser(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <>
      <div className=" text-5xl text-blue-700 font-sans font-bold mx-auto flex pt-7 justify-center items-center">
        <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2">
          AI
        </span>{" "}
        Chat Bot
      </div>
      <div className="justify-center mx-5 items-center flex">
        <textarea
          className="p-3 w-3/4 my-3 mx-0 resize-none justify-center border-2 rounded-tl-lg rounded-bl-lg border-black"
          rows={1}
          cols={30}
          placeholder="Type Your Question Here."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button className="bg-green-600 my-5 px-4 py-1  border-white rounded-tr-lg rounded-br-lg text-white font-medium justify-center " onClick={generateAwnser}>Generate<br/> Awnser</button>
      </div>
      <div className="justify-center mt-3 flex  w-screen">
      <textarea className=" read-only: w-screen justify-around mx-9 my-0 p-3 border-none bg-gray-100 rounded-lg" rows={12} name="" value={awnser} placeholder="Your Awnser will apear here." id="">{awnser}</textarea>
      </div>
    </>
  );
}

export default App;
