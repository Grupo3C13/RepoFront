import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAccount } from "../../Context/accountContext";
import UserMenu from '../UserMenu/UserMenu';
import PanelDeAdmin from "../PanelDeAdmin/PanelDeAdmin";

const Navbar = () => {

    const { usersData} = useAccount()


    return (
        <header className="navbar" id="navbar">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img className="logo"
                            src="src/assets/notas.svg"
                            alt="Logo" />
                    </Link>
                    <Link to="/">
                        <div className="lema">
                            <span >Aseguramos tu Musica</span>
                        </div>
                    </Link>
                </div>
                {usersData ? (
                    <UserMenu />
                ) : (
                    <div className="header-right">
                        
                        <Link to='/auth/register'><button className="btn-create">Crear Cuenta</button></Link>
                        <Link to='/auth/login'> <button className="btn-login">Iniciar sesión</button></Link>
                    </div>
                )}
            </div>
            <PanelDeAdmin className="subResponsive" />
        </header>
    );
};
export default Navbar;