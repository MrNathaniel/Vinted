import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

// Je récupère en props le state token et la fonction handleToken
const TheHeader = ({ token, handleToken }) => {
  // const token = Cookies.gzet("vintezd-token");
  // console.log(token);
  return (
    <header>
      <img src={logo}></img>

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
            <button className="signup">S'inscrire</button>
          </Link>
          <Link to="/Login">
            <button className="connect">Se connecter</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default TheHeader;
