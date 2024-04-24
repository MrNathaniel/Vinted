import { Link } from "react-router-dom";
import logo from "./assets/images/logo.png";

// Je récupère en props le statye token et la fonction handleToken
const TheHeader = ({ token, handleToken }) => {
  // const token = Cookies.gzet("vintezd-token");
  // console.log(token);
  return (
    <header>
      <img src={logo}></img>
      <h1>Je suis le header</h1>
      {/*si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sionon j'affiche les 2 autres bouton*/}
      {token ? (
        <button
          onClick={() => {
            // Je me déconnecte en appelant la fonction handletoken et en lui donnant null en argument
            handleToken(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/SignUp">
            <button>S'inscrire</button>
          </Link>
          <Link to="/Login">
            <button>Se connecter</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default TheHeader;
