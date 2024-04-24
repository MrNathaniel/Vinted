import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Je récupère la fonction handleToken en props
const SignUp = ({ handleToken }) => {
  //states qui gèrent mes inputs
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  //state qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

  //Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  //Fonction quiu sera appelé lors de la validation du formulaire

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Je fais disparaitre un éventuel message d'erreur
      setErrorMessage("");
      //Requête axios :
      // -Premier argument : l'url que j'interroge
      // -deuxième le body que j'envoi
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log("===> la réponse", response.data);
      // Cookies.set("vinted-token", response.data.token, {expires: 15});
      // J'enregistre le token dans mon state et mes cookies
      handleToken(response.data.token);
      // Je navigue vers ma page /
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      // console.log(error.response.status); // Pour voir le message d'erreur transmis par le serveur
      // si je reçois le status 409
      if (error.response.status === 409) {
        // Je met à jour mon state errorMessage
        setErrorMessagez(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }

    return (
      <main>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            checked={newsletter}
            type="checkbox"
            onChange={() => {
              setNewsLetter(!newsletter);
            }}
          />
          <input type="submit" value="s'inscrire" />
          {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </main>
    );
  };
};

export default SignUp;
