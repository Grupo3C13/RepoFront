
import "./Perfil.modules.css";

const Perfil = () => {
  // Obtén los datos y parsea el JSON
  const data = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <div className="contentContainerPerfil">
      <div className="perfil-list">
        <h2>Mi perfil:</h2>
        <ul className="vertical-list">
          <li>
            <strong>Nombre:</strong>{" "}
            <span className="normal-text">{data.name}</span>
          </li>
          <li>
            <strong>Apellido:</strong>{" "}
            <span className="normal-text"> {data.lastname}</span>
          </li>
          <li>
            <strong>Email:</strong>
            <span className="normal-text"> {data.email}</span>
          </li>
          <li>
            <strong>DNI:</strong>{" "}
            <span className="normal-text">{data.dni}</span>
          </li>
          <li>
            {/*
            <strong>Libros Alquilados:</strong> <span className="normal-text">{data.bookRents.lenght = 0 ? data.bookRents.join(", ") : "No tienes libros rentados"}</span>
            */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Perfil;