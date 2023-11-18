import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { TitleBar } from "../components/TitleBar";
import "../routes/CategoryList.modules.css";

export function CategoryList() {
  const [data, setData] = useState([]);
  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/categories");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TitleBar titulo="Lista de Categorías" />
      <div className="vista menu">
        <Sidebar />
        <table id="categories">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            {/* <th>Categoria</th> */}
            <th>Acciones</th>
          </tr>
          <tbody>
            {data.map(function (item) {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  {/* <td>{item.category}</td> */}
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}
