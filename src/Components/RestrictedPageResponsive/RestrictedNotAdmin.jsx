import React from 'react';

const RestrictedNotAdmin = () => {
    const centerDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
    };

    return (
        <div style={centerDivStyle}>
            <div>SOLO PARA ADMINISTRADORES</div>
        </div>
    );
}

export default RestrictedNotAdmin;
