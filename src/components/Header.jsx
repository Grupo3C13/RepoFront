import Logo from "../images/Nota_Segura.png";
import { Link } from "react-router-dom";
import "../components/Header.modules.css"

export function Header() {
  return (
    <nav>
      <div className="logo-lema">
        <Link to={"/"}>
          <img className="logo" src={Logo} />
        </Link>
        <p>Aseguramos tu música</p>
      </div>
      <div className="botones">
      <Link to='/registro'>
        <button>Crear cuenta</button>
        </Link>
        <Link to= "/login">
        <button>Iniciar sesion</button>
        </Link>
      </div>
    </nav>
  );
}
