import { useEffect, useState } from "react";
import axiosClient from "./api/axiosClient";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axiosClient.get("/");
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setMessage("Error connecting to backend");
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <h1>MERN Hackathon Starter</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;