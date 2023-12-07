import React from "react";
import "./Profile.css";

const Profile = () => {
  // Obtén los datos y parsea el JSON
  const data = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="contentContainerPerfil">
      <div className="perfil-list">
        <h2>Mis Datos</h2>
        <ul className="vertical-list">
          <li>
            <strong></strong>
            <span className="normal-text"> {data.email}</span>
          </li>
          <li>
            <strong></strong>{" "}
            <span className="normal-text">{data.name}</span>
          </li>
          <li>
            <strong></strong>{" "}
            <span className="normal-text"> {data.lastname}</span>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
