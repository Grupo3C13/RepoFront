import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { TitleBar } from "../components/TitleBar";
import "../routes/CategoryList.modules.css";
import axios from 'axios';

export function CategoryList() {
  const [data, setData] = useState([]);
  const [newFeature, setNewFeature] = useState({ name: '', description: '' });
  const [editingFeature, setEditingFeature] = useState(null);
  const [mensaje, setMensaje] = useState("");

  async function fetchData() {
    const response = await fetch("http://127.0.0.1:8090/categories");
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewFeature({ ...newFeature, [name]: value });
  // };

  // const handleAddFeature = () => {
  //   // Enviar los datos al servidor
  //   axios.post('http://127.0.0.1:8090/categories', newFeature) 
  //     .then((response) => {
  //       setNewFeature({name: '', description: ''})
  //       console.log('Categoría guardada con éxito:', response.data);
  //       setMensaje("Categoría registrada con éxito!")
  //       fetchData(); // Vuelve a cargar las Categorías
  //       // closeModal();
  //     })
  //     .catch((error) => {
  //       // setNewFeature({name: '', description: '', url: ''})
  //       console.error('Error al guardar la Categoría:', error);
  //       setMensaje("Error al guardar la Categoría!")
  //     });
  // };

  const handleEditFeature = () => {
    axios
    .put(`http://127.0.0.1:8090/categories/${editingFeature.id}`, newFeature) 
    .then((response) => {
      setEditingFeature(null);
      setNewFeature({name: '', description: ''})
      console.log('Categoría editada con éxito:', response.data);
      setMensaje("Categoría editada con éxito!")
      
      fetchData(); // Vuelve a cargar las características
    })
    .catch((error) => {
      // Manejo de errores
      console.error('Error al editar la categoría:', error);
      setMensaje("Error al editar la categoría!")
    });
  };

  const handleDeleteFeature = (featureId) => {
    const shouldDelete = window.confirm('¿Estás seguro de que quieres eliminar esta Categoría?');
    if (shouldDelete) {
    axios
      .delete(`http://127.0.0.1:8090/categories/${featureId}`) 
      .then((response) => {
        // Procesar la respuesta y realizar acciones necesarias
        console.log('Categoría eliminada con éxito:', response.data);
        setMensaje("Categoría eliminada con éxito!")
        fetchData(); // Vuelve a cargar las Categorías
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al eliminar la Categoría:', error);
        setMensaje("Error al eliminar la Categoría!")
      });
    }
  };

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
                  <td>
                    <button onClick={() => handleEditFeature(item)}>Editar</button>
                    <button onClick={() => handleDeleteFeature(item.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {mensaje && <p>{mensaje}</p>}
      <div className="mensaje-de-advertencia">
        <p>
          Este panel no está optimizado para pantallas de tamaño pequeño. Por
          favor, utiliza una pantalla de tamaño medio o superior.
        </p>
      </div>
    </div>
  );
}
