/* eslint-disable no-unused-vars */
import React from 'react';

const Restricted = () => {
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
            <div>Solo disponible para version Escritorio</div>
        </div>
    );
}

export default Restricted;
