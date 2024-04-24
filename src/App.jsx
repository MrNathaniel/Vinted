import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

//Pages
import SignUp from "./pages/SignUp";

//component
import Header from "./component/TheHeader";

function App() {
  // State dans lequel je stocke le token. Sa valeur de base sera :
  // - Si je trouve un cookie token, ce cookie
  // - Sinon, null
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  return (
    <Router>
      {/*Je peux passer des props à mes composants*/}
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/SignUp" element={<SignUp handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
