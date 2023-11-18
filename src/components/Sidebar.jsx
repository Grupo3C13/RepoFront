
import { Link } from 'react-router-dom';
import "../components/Sidebar.modules.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/administracion/listaproductos">Lista de Productos</Link>
        </li>
        <li>
          <Link to="/administracion/listarcategorias">Lista de Categorías</Link>
        </li>
        <li>
          <Link to="/administracion/agregarproducto">Agregar Producto</Link>
        </li>
        <li>
          <Link to="/">Agregar Categoría</Link>
        </li>
        <li>
          <Link to="/administracion/listarcaracteristicas">Administrar Características</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
