import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";
import signUp from "./assets/pages/SignUp";

function App() {
  const signUp = () => {
    const navigate = useNavigate();
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://lereacteur-vinted-api.herokuapp.com/user/signup`
        );
        console.log(response.data);
        setData(response.data);
        setLoading(false);
        Cookies.set("userToken", response.data.token);
        setToken(response.data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <main>
        <div>
          <h2>SignUp page</h2>
          <button onClick={() => navigate("/")}>Go to SignUp</button>
        </div>
      </main>
    </>
  );
}

export default App;
