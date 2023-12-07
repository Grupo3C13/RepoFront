import React, { useState, useContext } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import { useAccount } from "../../Context/accountContext";
import { Link, useNavigate } from "react-router-dom";
import './UserMenu.css';
import Avatar from '../Avatar/Avatar';

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useContext(GlobalContext);
    const { usersData, clearUsersData } = useAccount();
    const navigate = useNavigate();
    const name = usersData && usersData.name ? usersData.name + ' ' + usersData.lastname : "Usuario Desconocido";


    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const onLogout = () => {
        logout();
        clearUsersData();
        navigate('/', {
          replace: true,
        });
    };

    return (
        <div className="user-menu">
            <div className="avatar-container" onClick={toggleMenu}>
            
                <Avatar name={name} />
            </div>
            {showMenu && (
                <div className="custom-dropdown">

                    <Link to="/perfil" className="custom-dropdown-item">Perfil</Link>
                    {/* <Link to="/favoritos" className="custom-dropdown-item">Mis favoritos</Link>
                    <Link to="/reservation" className="custom-dropdown-item">Mis reservas</Link>     */}
                                    
                    <div className="custom-dropdown-item  custom-logout" onClick={onLogout}>Logout</div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
