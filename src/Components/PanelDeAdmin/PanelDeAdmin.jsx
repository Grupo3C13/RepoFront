import './PanelDeAdmin.css';
import React from 'react';
import { Link } from 'react-router-dom';


const PanelDeAdmin = () => {

    const usersDataString = localStorage.getItem('userData');
    const usersData = usersDataString ? JSON.parse(usersDataString) : null;
    const isAdmin = usersData?.role === 'ADMIN';
    const isLoggedIn = !!usersData;

    return (
        <div className="subnavbar">
            {isAdmin ? (
            <Link to="/administrador">Panel de Admin</Link>
            ) : null
            }
        </div>
    );
};

export default PanelDeAdmin;
